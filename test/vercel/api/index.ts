import type { VercelRequest, VercelResponse } from '@vercel/node'
import { civilMemoryKV } from '@tagmein/civil-memory'

export default async function (
 request: VercelRequest,
 response: VercelResponse
) {
 const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env
 if (typeof KV_REST_API_TOKEN !== 'string') {
  throw new Error('KV_REST_API_TOKEN environment variable is missing')
 }
 if (typeof KV_REST_API_URL !== 'string') {
  throw new Error('KV_REST_API_URL environment variable is missing')
 }
 const kv = civilMemoryKV.vercel({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
 })
 const { key, mode } = request.query
 if (mode !== 'vercel') {
  return response.status(400).end(`mode parameter must be 'vercel'`)
 }
 if (typeof key !== 'string') {
  return response.status(400).end(`key parameter must be a single string`)
 }
 if (request.method === 'GET') {
  const value = await kv.get(key)
  return response.status(200).send(value)
 } else if (request.method === 'DELETE') {
  await kv.delete(key)
  return response.status(200).end()
 } else if (request.method === 'POST') {
  const value = request.body
  await kv.set(key, value)
  return response.status(200).end()
 } else {
  return response.status(405).end()
 }
}
