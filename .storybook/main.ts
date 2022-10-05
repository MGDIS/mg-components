const fs = require('fs');

type Path = string;

/**
 * List folders from a given path
 * @param {Path} path path we will parse to get childs
 * @param {Path[]} folders previsous folders list
 * @returns {Path[]} updated folders list
 */
const listFoldersFrom = (path: Path, folders: Path[] = []): Path[] => {
  // get path child
  const pathChild = fs.readdirSync(path);

  pathChild
    .map(dirent => `${path}/${dirent}`)
    // exclude files from results
    .filter(dirent => fs.statSync(dirent).isDirectory())
    .forEach(dirent => {
      folders.push(dirent);
      // recursively parse folders
      folders = listFoldersFrom(dirent, folders);
    });

  return folders;
};

/**
 * Create a new path from given path and offset
 * @param {Path} path set the origin folder
 * @param {number} offset set the folder offset
 * @returns {Path} get the working folder
 */
const getPathFromOffset = (path: Path, offset: number): Path => {
  // pathElements start after ./src, then we get a array of elements from the path
  const pathElements = path.replace('./src', '').split('/');
  if (pathElements.length >= offset) {
    // we return a string with only the given offset
    return pathElements.slice(pathElements.length - offset, pathElements.length).join('/');
  } else {
    return path;
  }
};

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@pxtrn/storybook-addon-docs-stencil', '@storybook/addon-a11y'],
  core: {
    disableTelemetry: true,
  },
  staticDirs: () => {
    // to keep doc images in components folders we need to dynamically set static dir path, as storybook can't get a wilcard path like **/img/** for assets
    // as webpack do a "cp" command to dublicate 'from' folder, we need a uniq 'to' folder name
    const imgFolders = listFoldersFrom('./src')
      .filter(path => path.endsWith('/img'))
      .map(path => ({ from: `.${path}`, to: `/${getPathFromOffset(path, 3)}` }));
    return ['../www/build', ...imgFolders];
  },
  refs: {
    'chromatic-published-Storybook': {
      'package-name': { disable: true },
      // The title of your Storybook
      'title': 'MG Components',
      // The url provided by Chromatic when it was published
      'url': 'https://master--626149b307606d003ada26b4.chromatic.com',
      'versions': {
        'v3.2.0': 'https://626149b307606d003ada26b4-kvttxoumtg.chromatic.com',
        'v3.3.0': 'https://626149b307606d003ada26b4-vvlmkghgfa.chromatic.com',
        'v4.0.0': 'https://626149b307606d003ada26b4-ghzolkevxw.chromatic.com',
        'v4.0.1': 'https://626149b307606d003ada26b4-quqsveahqo.chromatic.com',
        'v4.1.0': 'https://626149b307606d003ada26b4-wupvrtxgvq.chromatic.com',
        'v4.1.1': 'https://626149b307606d003ada26b4-zzczrlgoyf.chromatic.com',
      },
    },
  },
};
