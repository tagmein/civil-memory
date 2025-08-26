"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisKV = redisKV;
const redis_1 = require("redis");
async function redisKV({ url, }) {
    const kv = await (0, redis_1.createClient)({ url }).connect();
    return {
        async delete(key) {
            await kv.getDel(key);
        },
        async get(key) {
            const value = await kv.get(key);
            if (value === null) {
                return null;
            }
            return value.toString();
        },
        async set(key, value) {
            await kv.set(key, value);
        },
    };
}
