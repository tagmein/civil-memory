import type { VercelRequest, VercelResponse } from '@vercel/node'
import { civilMemoryObjects } from '@tagmein/civil-memory'

export default async function (req: VercelRequest, res: VercelResponse) {
 const { BLOB_URL, BLOB_READ_WRITE_TOKEN } = process.env

 if (!BLOB_URL) {
  throw Error('Missing ENV BLOB_URL')
 }

 if (!BLOB_READ_WRITE_TOKEN) {
  throw Error('Missing ENV BLOB_READ_WRITE_TOKEN')
 }

 const objects = await civilMemoryObjects.vercel({
  url: BLOB_URL,
  token: BLOB_READ_WRITE_TOKEN,
 })

 const { key, mode } = req.query

 if (mode !== 'vercel') {
  return res.status(400).end(`mode must be 'vercel'`)
 }

 if (typeof key !== 'string') {
  return res.status(400).end(`key must be a string`)
 }

 if (req.method === 'GET') {
  const stream = await objects.get(key)
  return stream.pipe(res)
 }

 if (req.method === 'PUT') {
  await objects.put(key, req.body)
  return res.status(200).end()
 }

 return res.status(405).end()
}
