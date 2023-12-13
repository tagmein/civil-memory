import type { ReadStream } from 'node:fs'
import { cloudflareKV } from './kv/cloudflareKV'
import { diskKV } from './kv/diskKV'
import { httpKV } from './kv/httpKV'
import { vercelKV } from './kv/vercelKV'
import { volatileKV } from './kv/volatileKV'
import { cloudflareObjects } from './objects/cloudflareObjects'
import { diskObjects } from './objects/diskObjects'
import { vercelObjects } from './objects/vercelObjects'
import { volatileObjects } from './objects/volatileObjects'

export interface CivilMemoryKV {
 get(key: string): Promise<string | null>
 set(key: string, value: string): Promise<void>
 delete(key: string): Promise<void>
}

export interface CivilMemoryObjectsObjectInfo {
 key: string
 size: number
 createdAt: Date
}

export interface CivilMemoryObjects {
 get(key: string): Promise<ReadStream>
 put(key: string, value: ReadStream): Promise<void>
 info(key: string): Promise<CivilMemoryObjectsObjectInfo>
 delete(key: string): Promise<void>
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
 volatile: volatileObjects,
}
