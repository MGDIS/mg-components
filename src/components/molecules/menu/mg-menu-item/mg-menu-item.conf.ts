/**
 * Available menu-item positions
 */
export enum ElementPosition {
  FIRST = 'first',
  LAST = 'last',
}

/**
 * Available menu item status
 */
export enum Status {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  DISABLED = 'disabled',
  ACTIVE = 'active',
}

/**
 * MgMenuItem type guard
 *
 * @param {HTMLElement} element element to control type
 * @returns {boolean} truthy if element is mg-menu-item
 */
export const isMgMenuItem = (element: HTMLElement): element is HTMLMgMenuItemElement => element.nodeName === 'MG-MENU-ITEM';
