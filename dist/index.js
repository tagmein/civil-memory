"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.civilMemoryObjects = exports.civilMemoryKV = void 0;
function timeout(description, callback, duration = 1000) {
    return new Promise(async function (resolve) {
        const throwTimeout = setTimeout(function () {
            throw new Error(`Timeout after ${duration}ms: ${description}`);
        });
        await callback(resolve);
        clearTimeout(throwTimeout);
    });
}
exports.civilMemoryKV = {
    get cloudflare() {
        return timeout('import kv/cloudflareKV', async function (resolve) {
            const { cloudflareKV } = await import('./kv/cloudflareKV.js');
            resolve(cloudflareKV);
        });
    },
    get disk() {
        return timeout('import kv/diskKV', async function (resolve) {
            const { diskKV } = await import('./kv/diskKV.js');
            resolve(diskKV);
        });
    },
    get http() {
        return timeout('import kv/httpKV', async function (resolve) {
            const { httpKV } = await import('./kv/httpKV.js');
            resolve(httpKV);
        });
    },
    get redis() {
        return timeout('import kv/redisKV', async function (resolve) {
            const { redisKV } = await import('./kv/redisKV.js');
            resolve(redisKV);
        });
    },
    get volatile() {
        return timeout('import kv/volatileKV', async function (resolve) {
            const { volatileKV } = await import('./kv/volatileKV.js');
            resolve(volatileKV);
        });
    },
};
exports.civilMemoryObjects = {
    get cloudflare() {
        return timeout('import objects/cloudflareObjects', async function (resolve) {
            const { cloudflareObjects } = await import('./objects/cloudflareObjects.js');
            resolve(cloudflareObjects);
        });
    },
    get disk() {
        return timeout('import objects/diskObjects', async function (resolve) {
            const { diskObjects } = await import('./objects/diskObjects.js');
            resolve(diskObjects);
        });
    },
    get vercel() {
        return timeout('import objects/vercelObjects', async function (resolve) {
            const { vercelObjects } = await import('./objects/vercelObjects.js');
            resolve(vercelObjects);
        });
    },
};
