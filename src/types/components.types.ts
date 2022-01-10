
/**
 * type SelectOption
 * use to match select>option attributes
 */
export type SelectOption = {
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
  id: string,
  title: string,
  value: string | string,
  checked?: boolean,
  disabled?: boolean,
  indeterminate?: boolean
}

/*
* type RadioOption
* use to match radio attributes
*/
export type RadioOption = {
  title: string,
  value: any,
  disabled?: boolean,
};

/**
 * type OptGroup
 * use to match select>optgroup attributes
 */
export type OptGroup = {
  group: string,
  options: SelectOption[]
};

/**
 * type CheckboxValue
 * use to match returned value
 */
export type CheckboxValue = {
  title: string,
  value: string | boolean
}
