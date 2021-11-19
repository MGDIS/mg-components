/**
 * Create random ID
 * @param prefix {string} add prefix to created ID
 * @returns {string} ID
 */
export function createID(prefix?: string): string {
  return (typeof prefix === 'string' && prefix !== '' ? `${prefix}-` : '' ) + Math.random().toString(36).substr(2, 10);
}

/**
 * Change date format
 * @param date {string} date with format yyyy-mm-dd
 * @returns {string} date with format dd/mm/yyyy
 */
export function formatDate(date: string): string {
  const dateRegexp = /\d{4}-\d{2}-\d{2}/;
  if(typeof date !== 'string' || date === '' || !dateRegexp.test(date)) {
    return '';
  }
  const d:Date = new Date(date);
  return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
}

/**
 * Class to manage component classlist
 * Set() are not working when imported in project
 */
export class ClassList {
  classes: string[];

  constructor (classlist:string[] = []) {
    this.classes = classlist;
  }

  /**
   * Add class
   * @param className
   * @returns {void}
   */
  add = (className:string) => {
    if(!this.classes.includes(className)) {
      this.classes.push(className);
    }
  }

  /**
   * Delete class
   * @param className
   * @returns {void}
   */
  delete = (className:string) => {
    const index = this.classes.indexOf(className);
    if(index > -1) {
      this.classes.splice(index, 1);
    }
  }

  /**
   * Join classes seperated by spaces
   * @returns {string}
   */
  join = ():string => {
    return this.classes.join(' ');
  }
}
