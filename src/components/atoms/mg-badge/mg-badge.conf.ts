/**
 * List of all possibles variants
 */
export const variants = ['info', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

/**
 * Variant type from variants
 */
export type BadgeVariantType = (typeof variants)[number];
