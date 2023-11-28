import http from 'http'
import { dirname, join } from 'path'
import querystring from 'querystring'

import { civilMemoryKV } from '../dist/index.js'
import { collectRequestBody } from './collectRequestBody.mjs'
import { readFile } from 'fs/promises'

const DEFAULT_PORT = 3333

const TEST_DIR = dirname(import.meta.url.replace('file://', ''))

const STORAGE_DIR = join(TEST_DIR, '.tmp-kv')

async function main() {
 const indexHtml = (await readFile(join(TEST_DIR, 'index.html'))).toString(
  'utf-8'
 )
 const faviconIco = await readFile(join(TEST_DIR, 'favicon.ico'))
 const portEnv = parseInt(process.env.PORT, 10)
 const port =
  Number.isFinite(portEnv) && portEnv >= 1 && portEnv < 65536
   ? portEnv
   : DEFAULT_PORT

 const kv = civilMemoryKV.disk({
  rootDir: STORAGE_DIR,
 })

 const httpServer = http.createServer(async function (request, response) {
  try {
   const [requestPath, requestParamString] = request.url.split('?')
   const requestParams = querystring.parse(requestParamString ?? '')
   console.log(request.method, requestPath, JSON.stringify(requestParams))
   switch (request.method) {
    case 'DELETE':
     if (typeof requestParams.key !== 'string') {
      response.statusCode = 400
      response.end(JSON.stringify({ error: 'request parameter key missing' }))
      return
     }
     response.statusCode = 200
     response.end((await kv.delete(requestParams.key)).toString())
     return
    case 'GET':
     if (request.url === '/') {
      response.statusCode = 200
      response.end(indexHtml)
      return
     }
     if (request.url === '/favicon.ico') {
      response.statusCode = 200
      response.setHeader('Content-Type', 'image/x-icon')
      response.end(faviconIco)
      return
     }
     if (typeof requestParams.key !== 'string') {
      response.statusCode = 400
      response.end(JSON.stringify({ error: 'request parameter key missing' }))
      return
     }
     response.statusCode = 200
     response.end((await kv.get(requestParams.key)) ?? '')
     return
    case 'POST':
     if (typeof requestParams.key !== 'string') {
      response.statusCode = 400
      response.end(JSON.stringify({ error: 'request parameter key missing' }))
      return
     }
     const requestBody = await collectRequestBody(request)
     await kv.set(requestParams.key, requestBody)
     response.statusCode = 200
     const ttl = parseInt(requestParams.expiration_ttl, 10)
     clearTimeout(MEMORY_EXPIRE_KEY.get(requestParams.key))
     async function eraseMemoryKey() {
      await kv.delete(requestParams.key)
     }
     if (!isNaN(ttl)) {
      MEMORY_EXPIRE_KEY.set(requestParams.key, setTimeout(eraseMemoryKey, ttl))
     }
     response.end()
     return
    default:
     response.statusCode = 405
     response.end('invalid method')
     return
   }
  } catch (e) {
   console.error(e)
   response.statusCode = e.statusCode ?? 500
   response.setHeader('Content-Type', 'text/plain; charset=utf-8')
   response.end(e.message)
  }
 })

 httpServer.listen(port, 'localhost', function () {
  console.log(
   `Server listening on http://localhost:${port}
Available operations:

 • Read value at key
      GET ?key=urlEncodedKey

 • Delete value at key
   DELETE ?key=urlEncodedKey

 • Write value at key (expires in 60 seconds)
     POST ?key=urlEncodedKey&expiration_ttl=60 <body>`
  )
 })
}

main().catch(function (e) {
 console.error(e)
})
