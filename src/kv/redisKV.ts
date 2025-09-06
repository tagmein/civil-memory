import { createClient, RedisClientType } from 'redis'

import { CivilMemoryKV } from '../types'

export function redisKV({ url }: { url: string }): CivilMemoryKV {
 let kv: RedisClientType
 return {
  async delete(_key) {
   if (!kv) {
    kv = (await createClient({ url }).connect()) as RedisClientType
   }
   const key = _key.includes('#') ? _key : 'main#' + _key
   await kv.getDel(key)
  },
  async get(_key) {
   if (!kv) {
    kv = (await createClient({ url }).connect()) as RedisClientType
   }
   const key = _key.includes('#') ? _key : 'main#' + _key
   const value = await kv.get(key)
   if (value === null) {
    return null
   }
   return value.toString()
  },
  async set(_key, value) {
   if (!kv) {
    kv = (await createClient({ url }).connect()) as RedisClientType
   }
   const key = _key.includes('#') ? _key : 'main#' + _key
   await kv.set(key, value)
  },
 }
}

export type RedisKV = typeof redisKV & { name: 'redisKV' }
