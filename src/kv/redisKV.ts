import { createClient, RedisClientType } from 'redis'

import { CivilMemoryKV } from '..'

export function redisKV({ url }: { url: string }): CivilMemoryKV {
 let kv: RedisClientType
 return {
  async delete(key) {
   if (!kv) {
    kv = (await createClient({ url }).connect()) as RedisClientType
   }
   await kv.getDel(key)
  },
  async get(key) {
   if (!kv) {
    kv = (await createClient({ url }).connect()) as RedisClientType
   }
   const value = await kv.get(key)
   if (value === null) {
    return null
   }
   return value.toString()
  },
  async set(key, value) {
   if (!kv) {
    kv = (await createClient({ url }).connect()) as RedisClientType
   }
   await kv.set(key, value)
  },
 }
}

export type RedisKV = typeof redisKV & { name: 'redisKV' }
