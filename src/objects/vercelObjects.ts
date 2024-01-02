import { CivilMemoryObjects } from '..'

export async function vercelObjects({
 token,
 url,
}: {
 token: string
 url: string
}): Promise<CivilMemoryObjects> {
 const objects = await import('@vercel/blob')
 return {
  async delete(key) {
   await objects.del(`${url}/${key}`, { token })
  },

  async get(key) {
   const response = await fetch(`${url}/${key}`)
   return response.body
  },

  async info(key) {
   const info = await objects.head(`${url}/${key}`, {
    token,
   })
   return {
    createdAt: info.uploadedAt,
    key: info.pathname,
    size: info.size,
   }
  },

  async put(key, value) {
   await objects.put(`${url}/${key}`, value, {
    access: 'public',
    token,
   })
  },
 }
}
