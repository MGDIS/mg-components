/**
 * type SelectOption
 * use to match select>option attributes
 */
export type SelectOption = {
  title: string;
  value: string;
  disabled?: boolean;
  group?: string;
};

/**
 * type RadioOption
 * use to match radio attributes
 */
export type RadioOption = {
  title: string;
  value: any;
  disabled?: boolean;
};

/**
 * type OptGroup
 * use to match select>optgroup attributes
 */
export type OptGroup = {
  group: string;
  options: SelectOption[];
};

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

/**
 * type ToggleValue
 * use to match toggle input attributes
 */
export type ToggleValue = {
  title: string;
  value: any;
};
