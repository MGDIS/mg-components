/**
 * Create random ID
 * @param prefix {string} add prefix to created ID
 * @returns {string} ID
 */
export function createID(prefix: string = '', length: number = 10): string {
  let ID = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const charsLength = chars.length;
  for ( var i = 0; i < length; i++ ) {
    ID += chars.charAt(Math.floor(Math.random() * charsLength));
 }
 return (prefix !== '' ? `${prefix}-` : '' ) + ID;
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
    if(!this.has(className)) {
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
   * Check if class exist in list
   * @param className
   * @returns {boolean}
   */
  has = (className:string) => {
    return this.classes.includes(className);
  }

  /**
   * Join classes seperated by spaces
   * @returns {string}
   */
  join = ():string => {
    return this.classes.join(' ');
  }
}
