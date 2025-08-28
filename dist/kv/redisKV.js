"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisKV = redisKV;
const redis_1 = require("redis");
function redisKV({ url }) {
    let kv;
    return {
        async delete(key) {
            if (!kv) {
                kv = (await (0, redis_1.createClient)({ url }).connect());
            }
            await kv.getDel(key);
        },
        async get(key) {
            if (!kv) {
                kv = (await (0, redis_1.createClient)({ url }).connect());
            }
            const value = await kv.get(key);
            if (value === null) {
                return null;
            }
            return value.toString();
        },
        async set(key, value) {
            if (!kv) {
                kv = (await (0, redis_1.createClient)({ url }).connect());
            }
            await kv.set(key, value);
        },
    };
}
