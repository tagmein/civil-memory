"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudflareKV = cloudflareKV;
function cloudflareKV({ binding, }) {
    return {
        delete(key) {
            return binding.delete(key);
        },
        get(key) {
            return binding.get(key);
        },
        set(key, value) {
            return binding.put(key, value);
        },
    };
}
