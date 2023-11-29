import { kv } from '@vercel/kv'
import { CivilMemoryKV } from '..'

export function vercelKV(): CivilMemoryKV {
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
