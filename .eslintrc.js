module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['plugin:@stencil/recommended'],
  rules: {
    '@stencil/strict-mutable': 'off',
  },
};
