import { CivilMemoryKV } from '..'

export function httpKV({ baseUrl }: { baseUrl: string }): CivilMemoryKV {
 return {
  async get(key) {
   const url = new URL(baseUrl)
   url.searchParams.set('key', key)

   const finalUrl = url.toString()
   const resp = await fetch(finalUrl)

   if (!resp.ok) {
    throw new Error(`GET ${finalUrl}: HTTP ${resp.status}: ${resp.statusText}`)
   }

   return resp.text()
  },

  async set(key, value) {
   const url = new URL(baseUrl)
   url.searchParams.set('key', key)

   const finalUrl = url.toString()
   const method = 'POST'
   const resp = await fetch(finalUrl, {
    method,
    body: value,
   })

   if (!resp.ok) {
    throw new Error(
     `${method} ${finalUrl}: HTTP ${resp.status}: ${resp.statusText}`
    )
   }
  },

  async delete(key) {
   const url = new URL(baseUrl)
   url.searchParams.set('key', key)

   const finalUrl = url.toString()
   const method = 'DELETE'
   const resp = await fetch(finalUrl, { method })

   if (!resp.ok) {
    throw new Error(
     `${method} ${finalUrl}: HTTP ${resp.status}: ${resp.statusText}`
    )
   }
  },
 }
}
