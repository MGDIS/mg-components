/**
 * List of all possibles variants
 */
export const variants = ['primary', 'secondary', 'danger', 'danger-alt', 'info', 'flat', 'success', 'link'] as const;

/**
 * VariantType type from button variants
 */
export type VariantType = typeof variants[number];

/**
 * List of all possibles button types
 */
export const buttonTypes = ['button', 'submit', 'reset'] as const;

/**
 * ButtonType type from buttonTypes
 */
export type ButtonType = typeof buttonTypes[number];
