import { CivilMemoryKV } from '..';
export declare function redisKV({ url, }: {
    url: string;
}): Promise<CivilMemoryKV>;
