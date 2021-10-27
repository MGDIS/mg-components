export function createID(prefix?: string): string {
  return (typeof prefix === 'string' && prefix !== '' ? `${prefix}-` : '' ) + Math.random().toString(36).substr(2, 10);
}

export function formatDate(date: string): string {
  const dateRegexp = /\d{4}-\d{2}-\d{2}/;
  if(typeof date !== 'string' || date === '' || !dateRegexp.test(date)) {
    return '';
  }
  const d:Date = new Date(date);
  return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
}
