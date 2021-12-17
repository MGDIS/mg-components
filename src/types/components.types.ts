
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
 * type OptGroup
 * use to match select>optgroup attributes
 */
export type OptGroup = {
  group: string,
  options: Option[]
};
