import { CivilMemoryObjects } from '..';
export interface CivilMemoryDiskObjectsOptions {
    rootDir: string;
}
export declare function diskObjects({ rootDir, }: CivilMemoryDiskObjectsOptions): CivilMemoryObjects;
