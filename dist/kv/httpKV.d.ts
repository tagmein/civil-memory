import { CivilMemoryKV } from '..';
export declare function httpKV({ baseUrl }: {
    baseUrl: string;
}): CivilMemoryKV;
export type HttpKV = typeof httpKV & {
    name: 'httpKV';
};
