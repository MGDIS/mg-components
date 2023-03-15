import { MgMenu } from '../mg-menu/mg-menu';

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
 * Direction type
 */
export type DirectionType = MgMenu['direction'];
