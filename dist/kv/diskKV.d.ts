import { CivilMemoryKV } from '..';
export interface CivilMemoryDiskKVOptions {
    rootDir: string;
}
export declare function diskKV({ rootDir }: CivilMemoryDiskKVOptions): CivilMemoryKV;
