/// <reference types="node" />
import type { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { CivilMemoryKV } from '..';
export interface CivilMemoryDiskKVOptions {
    rootDir: string;
    fsPromises: {
        mkdir: typeof mkdir;
        readFile: typeof readFile;
        unlink: typeof unlink;
        writeFile: typeof writeFile;
    };
}
export declare function diskKV({ rootDir, fsPromises, }: CivilMemoryDiskKVOptions): CivilMemoryKV;
