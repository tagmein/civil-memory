# Civil Memory

Short and long-term memory for your web applications.

## About

Civil Memory is a key-value store for storing smaller snippets of data and a blob/object store that supports large file storage. It can connect to a variety of backing data stores and provides a unified interface across platforms. Civil Memory is written in [TypeScript](https://www.typescriptlang.org/) and runs on [Node](https://nodejs.org/).

## Install

```sh
npm install --save @tagmein/civil-memory
```

## Build from source

- `npm run build` to build once
- `npm run build:watch` to watch TypeScript source files for changes and rebuild

## Supported backing stores

1. **`volatile`** &mdash; stores items in the Node process memory with a limit of 64Kib for key-value values and a limit of 5MiB for objects. No information is written to disk and as such it is permanently lost when the server process exits.

2. **`disk`** &mdash; stores data in a file and folder structure with no size limits except for the limits of the available hard disk space on your computer.

3. **`cloudflare`** &mdash; [Cloudflare Workers KV](https://developers.cloudflare.com/kv) with a limit of 25MiB for key-value values and [Cloudflare R2](https://developers.cloudflare.com/r2) with a limit of 315MiB for objects. Note that this mode is only usable within a Cloudflare worker as Cloudflare Workers KV cannot be accessed externally.

4. **`vercel`** &mdash; [Vercel KV](https://vercel.com/storage/kv) with a limit of 100MiB for key-value values and [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) with a limit of 500 MiB for objects.

5. **_`more`_** &mdash; to request a new backing store, open a pull request, even if there is no code, and it will be considered.

## KV Usage

```TypeScript
import { civilMemoryKV } from '@tagmein/civil-memory'

// create a kv client - pick one

const kv = civilMemoryKV.volatile()

const kv = civilMemoryKV.disk({
 rootDir: '/path/to/storage/directory'
})

// see https://developers.cloudflare.com/kv/learning/kv-bindings/
const kv = civilMemoryKV.cloudflare({
 binding: env.MY_BINDING_NAME
})

// see https://vercel.com/docs/storage/vercel-kv/quickstart
const kv = civilMemoryKV.vercel({
 url: process.env.MY_KV_REST_API_URL,
 token: process.env.MY_KV_REST_API_TOKEN,
})

// use the kv client to ...

// ... read a value
const temperature = await kv.get('temperature')
console.log({ temperature })

// ... write a value
await kv.set('temperature', '40.5')

// ... remove a value
await kv.delete('temperature')
```

## Objects Usage

```TypeScript
import { civilMemoryObjects } from '@tagmein/civil-memory'

// create an objects client - pick one

const objects = civilMemoryObjects.volatile()

const objects = civilMemoryObjects.disk({
 rootDir: '/path/to/storage/directory'
})

// see https://developers.cloudflare.com/kv/learning/kv-bindings/
const objects = civilMemoryObjects.cloudflare({
 binding: env.MY_BINDING_NAME
})

// see https://vercel.com/docs/storage/vercel-kv/quickstart
const objects = civilMemoryObjects.vercel({
 url: process.env.MY_KV_REST_API_URL,
 token: process.env.MY_KV_REST_API_TOKEN,
})

// use the kv client to ...

// ... read a value
const temperature = await kv.get('temperature')
console.log({ temperature })

// ... write a value
await kv.set('temperature', '40.5')

// ... remove a value
await kv.delete('temperature')
```
