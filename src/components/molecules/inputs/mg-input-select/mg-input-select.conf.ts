/**
 * type SelectOption
 * use to match select>option attributes
 */
export type SelectOption = {
  title: string;
  value: any;
  disabled?: boolean;
  group?: string;
};

/**
 * type OptGroup
 * use to match select>optgroup attributes
 */
export type OptGroup = {
  group: string;
  options: SelectOption[];
};
