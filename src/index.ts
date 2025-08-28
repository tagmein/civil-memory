import type { CloudflareKV } from './kv/cloudflareKV'
import type { DiskKV } from './kv/diskKV'
import type { HttpKV } from './kv/httpKV'
import type { RedisKV } from './kv/redisKV'
import type { VolatileKV } from './kv/volatileKV'
import type { CloudflareObjects } from './objects/cloudflareObjects'
import type { DiskObjects } from './objects/diskObjects'
import type { VercelObjects } from './objects/vercelObjects'

export interface CivilMemoryKV {
 delete(key: string): Promise<void>
 get(key: string): Promise<string | null>
 set(key: string, value: string): Promise<void>
}

export interface CivilMemoryObjectsObjectInfo {
 createdAt: Date
 key: string
 size: number
}

export interface CivilMemoryObjects {
 delete(key: string): Promise<void>
 get(key: string): Promise<null | ReadableStream<Uint8Array>>
 info(key: string): Promise<CivilMemoryObjectsObjectInfo>
 put(key: string, value: ReadableStream<Uint8Array>): Promise<void>
 // signedUrlGet(key: string, expiresIn: number): Promise<string>
 // signedUrlPut(key: string, expiresIn: number): Promise<string>
}

function timeout<T>(
 description: string,
 callback: (resolve: (value: T) => void) => Promise<void>,
 duration: number = 1000
): Promise<T> {
 return new Promise(async function (resolve) {
  const throwTimeout = setTimeout(function () {
   throw new Error(`Timeout after ${duration}ms: ${description}`)
  })
  await callback(resolve)
  clearTimeout(throwTimeout)
 })
}

export const civilMemoryKV = {
 get cloudflare(): Promise<CloudflareKV> {
  return timeout('import kv/cloudflareKV', async function (resolve) {
   const { cloudflareKV } = await import('./kv/cloudflareKV.js')
   resolve(cloudflareKV as CloudflareKV)
  })
 },
 get disk(): Promise<DiskKV> {
  return timeout('import kv/diskKV', async function (resolve) {
   const { diskKV } = await import('./kv/diskKV.js')
   resolve(diskKV as DiskKV)
  })
 },
 get http(): Promise<HttpKV> {
  return timeout('import kv/httpKV', async function (resolve) {
   const { httpKV } = await import('./kv/httpKV.js')
   resolve(httpKV as HttpKV)
  })
 },
 get redis(): Promise<RedisKV> {
  return timeout('import kv/redisKV', async function (resolve) {
   const { redisKV } = await import('./kv/redisKV.js')
   resolve(redisKV as RedisKV)
  })
 },
 get volatile(): Promise<VolatileKV> {
  return timeout('import kv/volatileKV', async function (resolve) {
   const { volatileKV } = await import('./kv/volatileKV.js')
   resolve(volatileKV as VolatileKV)
  })
 },
}

export const civilMemoryObjects = {
 get cloudflare(): Promise<CloudflareObjects> {
  return timeout('import objects/cloudflareObjects', async function (resolve) {
   const { cloudflareObjects } = await import('./objects/cloudflareObjects.js')
   resolve(cloudflareObjects as CloudflareObjects)
  })
 },
 get disk(): Promise<DiskObjects> {
  return timeout('import objects/diskObjects', async function (resolve) {
   const { diskObjects } = await import('./objects/diskObjects.js')
   resolve(diskObjects as DiskObjects)
  })
 },
 get vercel(): Promise<VercelObjects> {
  return timeout('import objects/vercelObjects', async function (resolve) {
   const { vercelObjects } = await import('./objects/vercelObjects.js')
   resolve(vercelObjects as VercelObjects)
  })
 },
}
