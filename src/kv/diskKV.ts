import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'

import { CivilMemoryKV } from '..'
import { join } from 'node:path'

export interface CivilMemoryDiskKVOptions {
 rootDir: string
}

export function diskKV({ rootDir }: CivilMemoryDiskKVOptions): CivilMemoryKV {
 let isInitialized = false
 async function diskPath(namespace: string, key: string) {
  const namespaceDirPath = join(rootDir, encodeURIComponent(namespace))
  await mkdir(namespaceDirPath, {
   recursive: true,
   // todo cache our knowledge that the directory
   // exists for performance enhancement here
  })
  isInitialized = true
  return join(rootDir, encodeURIComponent(namespace), encodeURIComponent(key))
 }

 return {
  async delete(key: string) {
   const namespace = key.split('#')[0]
   try {
    await unlink(await diskPath(namespace, key))
   } catch (e) {}
  },
  async get(key: string) {
   const namespace = key.split('#')[0]
   try {
    return (await readFile(await diskPath(namespace, key))).toString('utf8')
   } catch (e) {
    return null
   }
  },
  async set(key: string, value: string) {
   const namespace = key.split('#')[0]
   await writeFile(await diskPath(namespace, key), value, 'utf8')
  },
 }
}
