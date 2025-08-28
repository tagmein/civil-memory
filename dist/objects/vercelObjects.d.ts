import { CivilMemoryObjects } from '..';
export declare function vercelObjects({ token, url, }: {
    token: string;
    url: string;
}): Promise<CivilMemoryObjects>;
export type VercelObjects = typeof vercelObjects & {
    name: 'vercelObjects';
};
