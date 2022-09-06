/**
 * List of all possibles variants
 */
export const variants: string[] = ['primary', 'secondary', 'danger', 'danger-alt', 'info', 'flat', 'success'];

/**
 * List of all possibles button types
 */
export const buttonTypes = ['button', 'submit', 'reset'] as const;

/**
 * ButtonType type from buttonTypes
 */
export type ButtonType = typeof buttonTypes[number];
