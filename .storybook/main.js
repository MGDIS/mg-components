const chromaticProjectId = '626149b307606d003ada26b4';

/**
 * create chromatic url from git branch or version tag commit hash
 * @param {string} target git branch or version tag commit hash
 * @returns {string}
 */
const createChromaticUrl = (target) =>  `https://${target}--${chromaticProjectId}.chromatic.com`;

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@pxtrn/storybook-addon-docs-stencil', '@storybook/addon-a11y'],
  refs: {
    "chromatic-published-Storybook": {
      'package-name': { disable: true },
      // The title of your Storybook
      title: "MG Components",
      // The url provided by Chromatic when it was published
      url: `https://master--${chromaticProjectId}.chromatic.com`,
      versions: {
        "v3.2.0": createChromaticUrl("33fd5101166a57613f0af13d00aa560d4b731b38")
      }
    },
  },
};
