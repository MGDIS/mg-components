/**
 * type CheckboxItem
 * use to match checkbox attributes
 */
export type CheckboxItem = {
  id: string;
  title: string;
  value: boolean | null;
  disabled?: boolean;
};

/**
 * type CheckboxValue
 * use to match returned value
 */
export type CheckboxValue = {
  title: string;
  value: boolean | null;
  disabled?: boolean;
};
