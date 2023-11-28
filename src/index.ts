import { cloudflareKV } from './kv/cloudflareKV'
import { diskKV } from './kv/diskKV'
import { vercelKV } from './kv/vercelKV'
import { volatileKV } from './kv/volatileKV'

export interface CivilMemoryKV {
 get(key: string): Promise<string | null>
 set(key: string, value: string): Promise<void>
 delete(key: string): Promise<boolean>
}

export interface CivilMemoryObjects {
 get(key: string): Promise<string | null>
 set(key: string, value: string): Promise<void>
 delete(key: string): Promise<boolean>
}

export const civilMemoryKV = {
 cloudflare: cloudflareKV,
 disk: diskKV,
 vercel: vercelKV,
 volatile: volatileKV,
}

export const civilMemoryObjects = {}
