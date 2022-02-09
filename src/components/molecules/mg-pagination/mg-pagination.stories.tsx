import { h } from '@stencil/core';

export default {
  component: 'mg-pagination',
  title: 'Molecules/mg-pagination',
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const totalPages = args.totalPages;
  delete args.totalPages;
  const currentPage = args.currentPage;
  delete args.currentPage;
  // return element
  return <mg-pagination {...args} total-pages={totalPages} current-page={currentPage}></mg-pagination>;
};

export const MgPagination = Template.bind({});

MgPagination.args = {
  totalPages: 1,
  currentPage: 1,
};
