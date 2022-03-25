/**
 * Create random ID
 *
 * @param {string} prefix  add prefix to created ID
 * @param {number} length ID length
 * @returns {string} ID
 */
export function createID(prefix = '', length = 10): string {
  let ID = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = chars.length;
  for (let i = 0; i < length; i++) {
    ID += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return (prefix !== '' ? `${prefix}-` : '') + ID;
}

/**
 * Class to manage component classlist
 * Set() are not working when imported in project
 */
export class ClassList {
  classes: string[];

  constructor(classlist: string[] = []) {
    this.classes = classlist;
  }

  /**
   * Add class
   *
   * @param {string} className class name to add
   * @returns {void}
   */
  add = (className: string): void => {
    if (!this.has(className)) {
      this.classes.push(className);
    }
  };

  /**
   * Delete class
   *
   * @param {string} className class name to delete
   * @returns {void}
   */
  delete = (className: string): void => {
    const index = this.classes.indexOf(className);
    if (index > -1) {
      this.classes.splice(index, 1);
    }
  };

  /**
   * Check if class exist in list
   *
   * @param {string} className class name to check
   * @returns {boolean} class name is in the list
   */
  has = (className: string): boolean => {
    return this.classes.includes(className);
  };

  /**
   * Join classes seperated by spaces
   *
   * @returns {string} joined values
   */
  join = (): string => {
    return this.classes.join(' ');
  };
}

/**
 * Check if all items are string
 *
 * @param {string[]} items items to check
 * @returns {boolean} all items are string
 */
export function allItemsAreString(items: string[]): boolean {
  return items && items.every(item => typeof item === 'string');
}
