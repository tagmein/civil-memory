import type { CloudflareKV } from './kv/cloudflareKV';
import type { DiskKV } from './kv/diskKV';
import type { HttpKV } from './kv/httpKV';
import type { RedisKV } from './kv/redisKV';
import type { VolatileKV } from './kv/volatileKV';
import type { CloudflareObjects } from './objects/cloudflareObjects';
import type { DiskObjects } from './objects/diskObjects';
import type { VercelObjects } from './objects/vercelObjects';
export interface CivilMemoryKV {
    delete(key: string): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
}
export interface CivilMemoryObjectsObjectInfo {
    createdAt: Date;
    key: string;
    size: number;
}
export interface CivilMemoryObjects {
    delete(key: string): Promise<void>;
    get(key: string): Promise<null | ReadableStream<Uint8Array>>;
    info(key: string): Promise<CivilMemoryObjectsObjectInfo>;
    put(key: string, value: ReadableStream<Uint8Array>): Promise<void>;
}
export declare const civilMemoryKV: {
    readonly cloudflare: Promise<CloudflareKV>;
    readonly disk: Promise<DiskKV>;
    readonly http: Promise<HttpKV>;
    readonly redis: Promise<RedisKV>;
    readonly volatile: Promise<VolatileKV>;
};
export declare const civilMemoryObjects: {
    readonly cloudflare: Promise<CloudflareObjects>;
    readonly disk: Promise<DiskObjects>;
    readonly vercel: Promise<VercelObjects>;
};
