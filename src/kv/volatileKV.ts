import { CivilMemoryKV } from '../types'

export function volatileKV(): CivilMemoryKV {
 const data = new Map()

 return {
  async delete(key: string) {
   const [namespace, keyName] = key.includes('#') ? key.split('#') : ['', key]
   const namespaceMap = data.get(namespace)
   namespaceMap?.delete?.(keyName)
  },

  async get(key: string) {
   const [namespace, keyName] = key.includes('#') ? key.split('#') : ['', key]
   const namespaceMap = data.get(namespace)
   if (!namespaceMap) return null

   return namespaceMap.get(keyName)
  },

  async set(key: string, value: string) {
   const [namespace, keyName] = key.includes('#') ? key.split('#') : ['', key]

   let namespaceMap = data.get(namespace)

   if (!namespaceMap) {
    namespaceMap = new Map()
    data.set(namespace, namespaceMap)
   }

   namespaceMap.set(keyName, value)
  },
 }
}

export type VolatileKV = typeof volatileKV & { name: 'volatileKV' }
