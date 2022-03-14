/**
 * List of all possibles types
 */
export const types: string[] = ['decimal', 'integer', 'currency'];

export enum InputError {
  MIN = 'min',
  MAX = 'max',
  MINMAX = 'minMax',
  REQUIRED = 'required',
}
