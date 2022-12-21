/**
 * List of all possibles inetractives elements
 */
export const interactivesElements = ['mg-button', 'mg-menu-item', 'button'] as const;

/**
 * InteractiveElement type from interactives elements list
 */
export type InteractiveElementType = typeof interactivesElements[number];

/**
 * List of all possibles placements
 */
export const placements = ['left', 'center', 'right'] as const;

/**
 * Placement type from placements list
 */
export type PlacementType = typeof placements[number];
