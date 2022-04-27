module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@pxtrn/storybook-addon-docs-stencil', '@storybook/addon-a11y'],
  staticDirs: ['../www/build', '../static'],
  refs: {
    "chromatic-published-Storybook": {
      'package-name': { disable: true },
      // The title of your Storybook
      title: "MG Components",
      // The url provided by Chromatic when it was published
      url: "https://master--626149b307606d003ada26b4.chromatic.com",
      versions: {
        "v3.2.0": "https://626149b307606d003ada26b4-kvttxoumtg.chromatic.com"
      }
    },
  },
};
