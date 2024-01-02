import { cloudflareKV } from './kv/cloudflareKV';
import { diskKV } from './kv/diskKV';
import { httpKV } from './kv/httpKV';
import { vercelKV } from './kv/vercelKV';
import { volatileKV } from './kv/volatileKV';
import { cloudflareObjects } from './objects/cloudflareObjects';
import { diskObjects } from './objects/diskObjects';
import { vercelObjects } from './objects/vercelObjects';
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
    get(key: string): Promise<ReadableStream>;
    info(key: string): Promise<CivilMemoryObjectsObjectInfo>;
    put(key: string, value: ReadableStream): Promise<void>;
}
export declare const civilMemoryKV: {
    cloudflare: typeof cloudflareKV;
    disk: typeof diskKV;
    http: typeof httpKV;
    vercel: typeof vercelKV;
    volatile: typeof volatileKV;
};
export declare const civilMemoryObjects: {
    cloudflare: typeof cloudflareObjects;
    disk: typeof diskObjects;
    vercel: typeof vercelObjects;
};
