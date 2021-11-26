/**
 * Create random ID
 * @param prefix {string} add prefix to created ID
 * @returns {string} ID
 */
export function createID(prefix?: string): string {
  return (typeof prefix === 'string' && prefix !== '' ? `${prefix}-` : '' ) + Math.random().toString(36).substr(2, 10);
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
