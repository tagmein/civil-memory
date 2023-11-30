/// <reference types="node" />
/// <reference types="node" />
import type { mkdir, stat, unlink, writeFile } from 'node:fs/promises';
import { CivilMemoryObjects } from '..';
import type { createReadStream } from 'node:fs';
export interface CivilMemoryDiskObjectsOptions {
    rootDir: string;
    fs: {
        createReadStream: typeof createReadStream;
    };
    fsPromises: {
        mkdir: typeof mkdir;
        stat: typeof stat;
        unlink: typeof unlink;
        writeFile: typeof writeFile;
    };
}
export declare function diskObjects({ rootDir, fs, fsPromises, }: CivilMemoryDiskObjectsOptions): CivilMemoryObjects;
