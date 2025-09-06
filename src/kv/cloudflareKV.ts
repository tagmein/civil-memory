import type { KVNamespace } from '@cloudflare/workers-types'
import { CivilMemoryKV } from '../types'

export function cloudflareKV({
 binding,
}: {
 binding: KVNamespace
}): CivilMemoryKV {
 return {
  delete(_key) {
   const key = _key.includes('#') ? _key : 'main#' + _key
   return binding.delete(key)
  },
  get(_key) {
   const key = _key.includes('#') ? _key : 'main#' + _key
   return binding.get(key)
  },
  set(_key, value) {
   const key = _key.includes('#') ? _key : 'main#' + _key
   return binding.put(key, value)
  },
 }
}

export type CloudflareKV = typeof cloudflareKV & { name: 'cloudflareKV' }
