module.exports = {
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: ["plugin:@stencil/recommended", "plugin:storybook/recommended"],
  rules: {
    '@stencil/strict-mutable': 'off'
  }
};