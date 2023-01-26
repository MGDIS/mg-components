/**
 * Create random ID
 *
 * @param {string} prefix  add prefix to created ID
 * @param {number} length ID length
 * @returns {string} ID
 */
export const createID = (prefix = '', length = 10): string => {
  let ID = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = chars.length;
  for (let i = 0; i < length; i++) {
    ID += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return (prefix !== '' ? `${prefix}-` : '') + ID;
};

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
export const allItemsAreString = (items: string[]): boolean => {
  return items && items.every(item => typeof item === 'string');
};

/**
 * Check if element is a heading
 *
 * @param {Element} element slotted element
 * @param {string[]} tagNames allowed tag names list
 * @returns {boolean} element is a heading
 */
export const isTagName = (element: Element, tagNames: string[]): boolean => {
  return tagNames.includes(element?.tagName.toLowerCase());
};

/**
 * Focusable elements query selector
 */
export const focusableElements = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]), [identifier]';

/**
 *
 * @param {Window} localWindow the window we are lookink for other windows
 * @returns {Window[]} The list of windows found
 */
export const getWindows = (localWindow: Window): Window[] => {
  const parentWindows = getParentWindows(localWindow);
  const childWindows = getChildWindows(localWindow);
  return [localWindow, ...parentWindows, ...childWindows];
};

/**
 * Get parent windows
 *
 * @param {Window} localWindow the window we are lookink for parents
 * @param {Window[]} windows The list of allready found windows
 * @returns {Window[]} The list of windows found
 */
export const getParentWindows = (localWindow: Window, windows: Window[] = []): Window[] => {
  // Check if is in iframe
  if (localWindow.self !== localWindow.top) {
    // Check if we have permission to access parent
    try {
      const parentWindow: Window = localWindow.parent;
      windows.push(parentWindow);
      return getParentWindows(parentWindow, windows);
    } catch (err) {
      console.error('Different hosts between iframes:', err);
      return windows;
    }
  }
  return windows;
};

/**
 * Get child windows
 *
 * @param {Window} localWindow the window we are lookink for children
 * @param {Window[]} windows The list of allready found windows
 * @returns {Window[]} The list of windows found
 */
const getChildWindows = (localWindow: Window, windows: Window[] = []): Window[] => {
  if (localWindow.frames.length > 0)
    for (let i = 0; i < localWindow.frames.length; i++) {
      const childWindow: Window = localWindow.frames[i];
      windows.push(childWindow);
      return getChildWindows(childWindow, windows);
    }
  return windows;
};
