/**
 * List of all possibles placements
 */
export const placements = ['left', 'center', 'right'] as const;

/**
 * Placement type from placements list
 */
export type PlacementType = typeof placements[number];
