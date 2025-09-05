import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import http from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import querystring from 'node:querystring'
import { platform } from 'node:os'

import { diskKV } from '../../dist/kv/diskKV.js'
import { httpKV } from '../../dist/kv/httpKV.js'
import { volatileKV } from '../../dist/kv/volatileKV.js'
import { collectRequestBody } from './collectRequestBody.mjs'

const ModeOptionsDiskBasePathParamName = 'modeOptions.disk.basePath'

const modeDisk = diskKV.name?.replace('KV', '')
const modeHttp = httpKV.name?.replace('KV', '')
const modeVolatile = volatileKV.name?.replace('KV', '')

const DEFAULT_PORT = 3333

// Cross-platform path handling for import.meta.url
const getTestDir = () => {
 const isWindows = platform() === 'win32'

 if (isWindows) {
  // On Windows, use fileURLToPath to properly convert file:// URLs
  return dirname(fileURLToPath(import.meta.url))
 } else {
  // On Unix-like systems (Linux, macOS), simple string replacement works
  return dirname(import.meta.url.replace('file://', ''))
 }
}

const TEST_DIR = getTestDir()

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

 const volatileStore = volatileKV()

 function getKVByMode(mode, params) {
  switch (mode) {
   case 'disk':
    return diskKV({
     rootDir:
      ModeOptionsDiskBasePathParamName in params
       ? params[ModeOptionsDiskBasePathParamName]
       : STORAGE_DIR,
     fsPromises: { mkdir, readFile, unlink, writeFile },
     path: { join },
    })
   case 'http':
    const httpUrl = params.url
    if (typeof httpUrl !== 'string') {
     const err = new Error(`parameter url must be specified for 'http' mode`)
     err.statusCode = 400
     throw err
    }
    return httpKV({ baseUrl: httpUrl })
   case 'volatile':
    return volatileStore
   default:
    const err = new Error(
     'parameter mode must be one of: cloudflare, disk, http, vercel, volatile'
    )
    err.statusCode = 400
    throw err
  }
 }

 function setCorsHeaders(request, response) {
  const requestOrigin = request.headers.origin
  const allowedOrigin =
   requestOrigin && requestOrigin.startsWith('http://localhost')
    ? requestOrigin
    : 'http://localhost:9090'

  response.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  response.setHeader(
   'Access-Control-Allow-Methods',
   'GET, POST, DELETE, OPTIONS'
  )
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
 }

 const httpServer = http.createServer(async function (request, response) {
  try {
   setCorsHeaders(request, response)

   if (request.method === 'OPTIONS') {
    response.statusCode = 204
    response.end()
    return
   }

   const [requestPath, requestParamString] = request.url.split('?')
   const requestParams = querystring.parse(requestParamString ?? '')
   console.log(request.method, requestPath, JSON.stringify(requestParams))
   switch (request.method) {
    case 'DELETE': {
     const kv = getKVByMode(requestParams.mode, requestParams)
     if (typeof requestParams.key !== 'string') {
      response.statusCode = 400
      response.end(JSON.stringify({ error: 'request parameter key missing' }))
      return
     }
     await kv.delete(requestParams.key)
     response.statusCode = 200
     response.end()
     return
    }
    case 'GET': {
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
     const kv = getKVByMode(requestParams.mode, requestParams)
     if (typeof requestParams.key !== 'string') {
      response.statusCode = 400
      response.end(JSON.stringify({ error: 'request parameter key missing' }))
      return
     }
     response.statusCode = 200
     response.end((await kv.get(requestParams.key)) ?? '')
     return
    }
    case 'POST': {
     const kv = getKVByMode(requestParams.mode, requestParams)
     if (typeof requestParams.key !== 'string') {
      response.statusCode = 400
      response.end(JSON.stringify({ error: 'request parameter key missing' }))
      return
     }
     const requestBody = await collectRequestBody(request)
     await kv.set(requestParams.key, requestBody)
     response.statusCode = 200
     response.end()
     return
    }
    default: {
     response.statusCode = 405
     response.end('invalid method')
     return
    }
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
   `Server running (and test suite ready) at http://localhost:${port}

Example URL parameters:

 • ?mode=disk&${ModeOptionsDiskBasePathParamName}=./my-kv-store // disk-based key-value store in ./my-kv-store
 • ?mode=volatile // volatile in-memory key-value store
 • ?mode=http&url=http://localhost:3636 // forwards requests to another Civil Memory compatible kv server

Valid values for the mode URL parameter:
 • ?mode=${modeDisk}
 • ?mode=${modeHttp}
 • ?mode=${modeVolatile}

All API operations:

 • Read value at key
   GET ?mode=${modeDisk}&${ModeOptionsDiskBasePathParamName}=./my-kv-store&key=urlEncodedKey

   The GET request will return the value of the key, which is sent as the response body.

 • Delete value at key
   DELETE ?mode=${modeDisk}&${ModeOptionsDiskBasePathParamName}=./my-kv-store&key=urlEncodedKey

   The DELETE request will delete the value of the key.

 • Write value at key
   POST ?mode=${modeDisk}&${ModeOptionsDiskBasePathParamName}=./my-kv-store&key=urlEncodedKey [ POST body ]
   
   Where [ POST body ] is the value to be stored at the key, which is sent as the body of the POST request.`
  )
 })
}

main().catch(async function (e) {
 console.error(e)
 const errorFilePath = join(STORAGE_DIR, '.civil-memory-kv-error.txt')
 await writeFile(errorFilePath, e.stack)
 console.log(`Error details written to ${errorFilePath}`)
 process.exitCode = 1
})
