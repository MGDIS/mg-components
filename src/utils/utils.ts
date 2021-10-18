import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)


export function createID(prefix?: string): string {
  return (typeof prefix === 'string' && prefix !== '' ? `${prefix}-` : '' ) + nanoid();
}

export function formatDate(date: string): string {
  const dateRegexp = /\d{4}-\d{2}-\d{2}/;
  if(typeof date !== 'string' || date === '' || !dateRegexp.test(date)) {
    return '';
  }
  const d:Date = new Date(date);
  return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
}
