/**
 * List of all possibles variants
 */
export const variants = ['info', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

/**
 * Variant type from variants
 */
type VariantType = typeof variants[number];

/**
 * Component type
 */
export type BadgeType = {
  value: string | number;
  label: string;
  variant?: VariantType;
  outline?: boolean;
};
