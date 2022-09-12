export const filterArgs = (args, defaultValues?) => {
  const filteredArgs: typeof args = {};
  for (const k in args) {
    if (!k.startsWith('slot')) {
      const arg = args[k];
      // Change camelCase k to kebab-case
      const key = k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      // Change value to boolean true value, will be replace during render
      if (typeof arg === 'boolean' && arg === true) {
        filteredArgs[key] = 'mg__storybook__boolean-true';
      }
      // Do not add args if is default value
      else if (!defaultValues || !Object.keys(defaultValues).includes(k) || defaultValues[k] !== arg) {
        filteredArgs[key] = arg;
      }
    }
  }
  // Add comment when args contain object, will be replace during render
  const argsObjects = Object.entries(args).filter(arg => typeof arg[1] === 'object');
  if (argsObjects.length > 0) {
    filteredArgs['mg__storybook__comment'] = `/!\\ Object props are not rendered in the code example: ${argsObjects.map(([a]) => a).join(', ')}.`;
  }

  return filteredArgs;
};
