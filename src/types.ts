export interface CivilMemoryKV {
 delete(key: string): Promise<void>
 get(key: string): Promise<string | null>
 set(key: string, value: string): Promise<void>
}

export interface CivilMemoryObjectsObjectInfo {
 createdAt: Date
 key: string
 size: number
}

export interface CivilMemoryObjects {
 delete(key: string): Promise<void>
 get(key: string): Promise<null | ReadableStream<Uint8Array>>
 info(key: string): Promise<CivilMemoryObjectsObjectInfo>
 put(key: string, value: ReadableStream<Uint8Array>): Promise<void>
 // signedUrlGet(key: string, expiresIn: number): Promise<string>
 // signedUrlPut(key: string, expiresIn: number): Promise<string>
}
