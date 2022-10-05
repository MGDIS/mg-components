/**
 * Menu display type
 */
export enum DisplayType {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

/**
 * Component type
 */
export type MenuType = {
  label: string;
  identifier?: string;
  display?: DisplayType;
};
