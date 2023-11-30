import type { mkdir, stat, unlink, writeFile } from 'node:fs/promises'
import type { join } from 'node:path'

import { CivilMemoryObjects } from '..'
import type { createReadStream, ReadStream } from 'node:fs'

export interface CivilMemoryDiskObjectsOptions {
 rootDir: string
 fs: {
  createReadStream: typeof createReadStream
 }
 fsPromises: {
  mkdir: typeof mkdir
  stat: typeof stat
  unlink: typeof unlink
  writeFile: typeof writeFile
 }
 path: { join: typeof join }
}

export function diskObjects({
 rootDir,
 fs,
 fsPromises,
 path,
}: CivilMemoryDiskObjectsOptions): CivilMemoryObjects {
 let isInitialized = false
 async function diskPath(namespace: string, key: string) {
  const namespaceDirPath = path.join(rootDir, encodeURIComponent(namespace))
  await fsPromises.mkdir(namespaceDirPath, {
   recursive: true,
   // todo cache our knowledge that the directory
   // exists for performance enhancement here
  })
  isInitialized = true
  return path.join(
   rootDir,
   encodeURIComponent(namespace),
   encodeURIComponent(key)
  )
 }

 return {
  async delete(key: string) {
   const namespace = key.split('#')[0]
   try {
    await fsPromises.unlink(await diskPath(namespace, key))
   } catch (e) {}
  },
  async get(key: string) {
   const namespace = key.split('#')[0]
   try {
    return fs.createReadStream(await diskPath(namespace, key))
   } catch (e) {
    return null
   }
  },
  async info(key: string) {
   const namespace = key.split('#')[0]
   const fileStats = await fsPromises.stat(await diskPath(namespace, key))
   return {
    createdAt: fileStats.birthtime,
    key,
    size: fileStats.size,
   }
  },
  async put(key: string, value: ReadStream) {
   const namespace = key.split('#')[0]
   await fsPromises.writeFile(await diskPath(namespace, key), value, 'utf8')
  },
 }
}
