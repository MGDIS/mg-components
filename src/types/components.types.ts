
/**
 * type Option
 * use to match radio, select>option attributes
 */
export type Option = {
  title: string,
  value: string,
  disabled?: boolean,
  group?: string
};

/**
 * type CheckboxOption
 * use to match checkbox attributes
 */
 export type CheckboxOption = {
  title: string,
  value: string | string,
  checked?: boolean,
  disabled?: boolean,
  indeterminate?: boolean
};

/**
 * type OptGroup
 * use to match select>optgroup attributes
 */
export type OptGroup = {
  group: string,
  options: Option[]
};

/**
 * type CheckboxValue
 * use to match returned value
 */
export type CheckboxValue = {
  title: string,
  value: string | boolean
}
