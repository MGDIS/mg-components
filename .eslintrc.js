module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['plugin:@stencil/recommended', 'plugin:storybook/recommended', 'plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y'],
  rules: {
    '@stencil/strict-mutable': 'off',
  },
};
