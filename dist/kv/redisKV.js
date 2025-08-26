"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisKV = redisKV;
const redis_1 = require("redis");
async function redisKV({ url, }) {
    const kv = await (0, redis_1.createClient)({ url }).connect();
    return {
        async delete(key) {
            await kv.getdel(key);
        },
        async get(key) {
            return (await kv.get(key)).toString();
        },
        async set(key, value) {
            await kv.set(key, value);
        },
    };
}
