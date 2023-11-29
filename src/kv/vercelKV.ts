import { createClient } from '@vercel/kv'
import { CivilMemoryKV } from '..'

export function vercelKV({
 token,
 url,
}: {
 token: string
 url: string
}): CivilMemoryKV {
 const kv = createClient({
  token,
  url,
 })
 return {
  async delete(key) {
   await kv.getdel(key)
  },
  async get(key) {
   return kv.get(key)
  },
  async set(key, value) {
   kv.set(key, value)
  },
 }
}
