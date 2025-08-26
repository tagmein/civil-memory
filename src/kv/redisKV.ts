import { createClient } from 'redis'

import { CivilMemoryKV } from '..'

export async function redisKV({
 url,
}: {
 url: string
}): Promise<CivilMemoryKV> {
 const kv = await createClient({ url }).connect()
 return {
  async delete(key) {
   await kv.getDel(key)
  },
  async get(key) {
   return (await kv.get(key)).toString()
  },
  async set(key, value) {
   await kv.set(key, value)
  },
 }
}
