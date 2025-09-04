"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.volatileKV = volatileKV;
function volatileKV() {
    const data = new Map();
    return {
        async delete(key) {
            const [namespace, keyName] = key.includes('#') ? key.split('#') : ['', key];
            const namespaceMap = data.get(namespace);
            namespaceMap?.delete?.(keyName);
        },
        async get(key) {
            const [namespace, keyName] = key.includes('#') ? key.split('#') : ['', key];
            const namespaceMap = data.get(namespace);
            if (!namespaceMap)
                return null;
            return namespaceMap.get(keyName);
        },
        async set(key, value) {
            const [namespace, keyName] = key.includes('#') ? key.split('#') : ['', key];
            let namespaceMap = data.get(namespace);
            if (!namespaceMap) {
                namespaceMap = new Map();
                data.set(namespace, namespaceMap);
            }
            namespaceMap.set(keyName, value);
        },
    };
}
