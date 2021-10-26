import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import brandImage from './logo.png';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'MGDIS Design System',
    brandImage,
  }),
  panelPosition: 'right',
});
