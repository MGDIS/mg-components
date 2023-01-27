import { Config } from '@stencil/core';
import { config as defaultConfig } from './stencil.config';

export const config: Config = {
  ...defaultConfig,
  tsconfig: 'tsconfig.prod.json',
};
