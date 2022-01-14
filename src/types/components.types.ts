
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
 * type ToggleValue
 * use to match toggle input attributes
 */
export type ToggleValue = {
  title: string,
  value: any
}
