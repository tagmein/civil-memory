import type { KVNamespace, PagesFunction } from '@cloudflare/workers-types';
interface Env {
    DATA_KV: KVNamespace;
}
export declare const onRequestGet: PagesFunction<Env>;
export declare const onRequestDelete: PagesFunction<Env>;
export declare const onRequestPost: PagesFunction<Env>;
export {};
