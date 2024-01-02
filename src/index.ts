import { cloudflareKV } from './kv/cloudflareKV'
import { diskKV } from './kv/diskKV'
import { httpKV } from './kv/httpKV'
import { vercelKV } from './kv/vercelKV'
import { volatileKV } from './kv/volatileKV'
import { cloudflareObjects } from './objects/cloudflareObjects'
import { diskObjects } from './objects/diskObjects'
import { vercelObjects } from './objects/vercelObjects'

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

export const civilMemoryKV = {
 cloudflare: cloudflareKV,
 disk: diskKV,
 http: httpKV,
 vercel: vercelKV,
 volatile: volatileKV,
}

export const civilMemoryObjects = {
 cloudflare: cloudflareObjects,
 disk: diskObjects,
 vercel: vercelObjects,
}
