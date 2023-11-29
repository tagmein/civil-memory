import { mkdir, readFile, stat, unlink, writeFile } from 'fs/promises'

import { CivilMemoryObjects } from '..'
import { join } from 'path'
import { createReadStream, ReadStream } from 'fs'

export interface CivilMemoryDiskObjectsOptions {
 rootDir: string
}

export function diskObjects({
 rootDir,
}: CivilMemoryDiskObjectsOptions): CivilMemoryObjects {
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
    return createReadStream(await diskPath(namespace, key))
   } catch (e) {
    return null
   }
  },
  async info(key: string) {
   const namespace = key.split('#')[0]
   const fileStats = await stat(await diskPath(namespace, key))
   return {
    createdAt: fileStats.birthtime,
    key,
    size: fileStats.size,
   }
  },
  async put(key: string, value: ReadStream) {
   const namespace = key.split('#')[0]
   await writeFile(await diskPath(namespace, key), value, 'utf8')
  },
 }
}
