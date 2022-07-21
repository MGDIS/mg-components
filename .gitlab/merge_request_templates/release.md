<!-- This template is a great use for release checklist.-->

### Permanent

- [ ] add previous version chromatic artifact to .storybook/main.ts.
```js
{
  ...,
  refs: {
    ...
    'versions': {
      ...,
      'v3.2.0': 'https://626149b307606d003ada26b4-kvttxoumtg.chromatic.com',
    },
  }
}
```

- [ ] package.json exports shortcut have been added.
```json
{
  ...,
  "exports": {
    ...,
    "./mg-button": "./dist/components/mg-button.js",
  }
}
```
- [ ] all stories documentation/spec have been updated.
- [ ] update changelog at src/stories/3-changelog.stories.mdx.

### Current version

<!-- fill checklist for the WIP release -->

- [ ] demo task for this release.