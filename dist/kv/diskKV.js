"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diskKV = diskKV;
function diskKV({ rootDir, fsPromises, path, }) {
    let isInitialized = false;
    async function diskPath(namespace, key) {
        const namespaceDirPath = path.join(rootDir, encodeURIComponent(namespace));
        await fsPromises.mkdir(namespaceDirPath, {
            recursive: true,
            // todo cache our knowledge that the directory
            // exists for performance enhancement here
        });
        isInitialized = true;
        return path.join(rootDir, encodeURIComponent(namespace), encodeURIComponent(key));
    }
    return {
        async delete(key) {
            const namespace = key.split('#')[0];
            try {
                await fsPromises.unlink(await diskPath(namespace, key));
            }
            catch (e) { }
        },
        async get(key) {
            const namespace = key.split('#')[0];
            try {
                return (await fsPromises.readFile(await diskPath(namespace, key))).toString('utf8');
            }
            catch (e) {
                return null;
            }
        },
        async set(key, value) {
            const namespace = key.split('#')[0];
            await fsPromises.writeFile(await diskPath(namespace, key), value, 'utf8');
        },
    };
}
