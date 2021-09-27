import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)


export function createID(prefix?: string): string {
  return (prefix !== undefined ? `${prefix}-` : '' ) + nanoid();
}
