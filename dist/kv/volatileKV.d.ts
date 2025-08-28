import { CivilMemoryKV } from '..';
export declare function volatileKV(): CivilMemoryKV;
export type VolatileKV = typeof volatileKV & {
    name: 'volatileKV';
};
