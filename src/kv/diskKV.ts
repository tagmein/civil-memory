import type { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { dirname, type join } from 'node:path'

import { CivilMemoryKV } from '../types'

export interface CivilMemoryDiskKVOptions {
 rootDir: string
 fsPromises: {
  mkdir: typeof mkdir
  readFile: typeof readFile
  unlink: typeof unlink
  writeFile: typeof writeFile
 }
 path: { join: typeof join }
}

export function diskKV({
 rootDir,
 fsPromises,
 path,
}: CivilMemoryDiskKVOptions): CivilMemoryKV {
 let isInitialized = false
 async function diskPath(namespace: string, key: string) {
  const filePath = [
   encodeURIComponent(namespace.split('/').map(encodeURIComponent).join('/')),
   ...key.split('/').map(encodeURIComponent),
  ]
  const dirPath = [...filePath]
  const fileName = dirPath.pop()
  if (dirPath.length > 0) {
   try {
    await fsPromises.mkdir(path.join(rootDir, ...dirPath), {
     recursive: true,
     // todo cache our knowledge that the directory
     // exists for performance enhancement here
    })
   }
   catch (e) {
    // do nothing, our directory already exists
    if (!e.message.startsWith('EEXIST:')) {
     console.warn(e)
    }
   }
  }
  isInitialized = true
  return path.join(rootDir, ...dirPath, fileName)
 }

 return {
  async delete(_key: string) {
   const splitKey = _key.split('#')
   const namespace = splitKey.shift()
   const key = splitKey.join('#') || 'index'
   try {
    await fsPromises.unlink(await diskPath(namespace, key))
   } catch (e) {
    console.error(e)
   }
  },
  async get(_key: string) {
   const splitKey = _key.split('#')
   const namespace = splitKey.shift()
   const key = splitKey.join('#') || 'index'
   // console.dir({ splitKey, namespace, key })
   try {
    return (await fsPromises.readFile(await diskPath(namespace, key))).toString(
     'utf8'
    )
   } catch (e) {
    return null
   }
  },
  async set(_key: string, value: string) {
   const splitKey = _key.split('#')
   const namespace = splitKey.shift()
   const key = splitKey.join('#') || 'index'
   await fsPromises.writeFile(await diskPath(namespace, key), value, 'utf8')
  },
 }
}

export type DiskKV = typeof diskKV & { name: 'diskKV' }
