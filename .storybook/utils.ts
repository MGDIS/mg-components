export const filterArgs = (args, defaultValues?) => {
  const filteredArgs: typeof args = {};
  for (const k in args) {
    if (!k.startsWith('slot')) {
      const arg = args[k];
      // Change camelCase k to kebab-case
      const key = k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      // Change value to boolean true value, will be replace during render
      if (typeof arg === 'boolean' && arg === true) {
        filteredArgs[key] = 'mg__storybook__filter';
      }
      // Do not add args if
      else if (!defaultValues || !Object.keys(defaultValues).includes(k) || defaultValues[k] !== arg) {
        filteredArgs[key] = arg;
      }
    }
  }
  return filteredArgs;
};
