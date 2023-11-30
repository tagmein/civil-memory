import type { KVNamespace } from '@cloudflare/workers-types'
import { CivilMemoryKV } from '..'

export function cloudflareKV({
 binding,
}: {
 binding: KVNamespace
}): CivilMemoryKV {
 return {
  async delete(key) {
   await binding.delete(key)
  },
  async get(key) {
   return binding.get(key)
  },
  async set(key, value) {
   binding.put(key, value)
  },
 }
}
