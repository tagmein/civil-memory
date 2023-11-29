import type { VercelRequest, VercelResponse } from '@vercel/node'
import { civilMemoryKV } from '../../../dist'

export default async function (
 request: VercelRequest,
 response: VercelResponse
) {
 const kv = civilMemoryKV.vercel()
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
