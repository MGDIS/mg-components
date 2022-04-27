/**
 * create chromatic url from git branch or version tag commit hash
 * @param {string} target git branch or version tag commit hash
 * @returns {string}
 */
const getChromaticPermalink = (target) =>  `https://${target}--626149b307606d003ada26b4.chromatic.com`;

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
      url: `https://master--${chromaticProjectId}.chromatic.com`,
      versions: {
        "v3.2.0": getChromaticPermalink("6dc4ead")
      }
    },
  },
};
