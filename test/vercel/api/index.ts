import type { VercelRequest, VercelResponse } from '@vercel/node'
import { civilMemoryKV } from '@tagmein/civil-memory'

const TEST_REQUEST_KEYS = ['mykey', 'mynamespace#mykey']
const TEST_REQUEST_BODY = JSON.stringify({ example: 'myvalue' })

export default async function (
 request: VercelRequest,
 response: VercelResponse
) {
 const { REDIS_URL } = process.env

 if (typeof REDIS_URL !== 'string') {
  throw new Error('REDIS_URL environment variable is missing')
 }

 const kv = await civilMemoryKV.redis({
  url: REDIS_URL,
 })

 const { key, mode } = request.query

 if (mode !== 'redis') {
  return response.status(400).end(`mode parameter must be 'redis'`)
 }

 if (typeof key !== 'string') {
  return response.status(400).end(`key parameter must be a single string`)
 }

 if (!TEST_REQUEST_KEYS.includes(key)) {
  return response
   .status(400)
   .end(`request body must be one of ${JSON.stringify(TEST_REQUEST_KEYS)}`)
 }

 if (request.method === 'GET') {
  const value = await kv.get(key)
  return response.status(200).send(value)
 }

 if (request.method === 'DELETE') {
  await kv.delete(key)
  return response.status(200).end()
 }

 if (request.method === 'POST') {
  const value = request.body
  if (value !== TEST_REQUEST_BODY) {
   return response
    .status(400)
    .end(`request body must be ${JSON.stringify(TEST_REQUEST_BODY)}`)
  }
  await kv.set(key, value)
  return response.status(200).end()
 }

 return response.status(405).end()
}
