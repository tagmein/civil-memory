import { CivilMemoryKV } from '..';
export declare function redisKV({ url }: {
    url: string;
}): CivilMemoryKV;
export type RedisKV = typeof redisKV & {
    name: 'redisKV';
};
