"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vercelObjects = vercelObjects;
async function vercelObjects({ token, url, }) {
    const objects = await import('@vercel/blob');
    return {
        async delete(key) {
            try {
                await objects.del(key, { token });
            }
            catch (e) {
                console.warn(e);
            }
        },
        async get(key) {
            const response = await fetch(`${url}/${key}`);
            if (!response.ok) {
                return null;
            }
            return response.body;
        },
        async info(key) {
            const info = await objects.head(key, {
                token,
            });
            return {
                createdAt: info.uploadedAt,
                key: info.pathname,
                size: info.size,
            };
        },
        async put(key, value) {
            await objects.put(key, value, {
                access: 'public',
                token,
            });
        },
    };
}
