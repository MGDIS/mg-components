# Release

## TODO

### New epic started

- [ ] Create new entry in changelog
- [ ] Update dependancies + audit
- [ ] Resolve code smell from sonar
- [ ] Add chromatic artifact previous version in .`storybook/main.ts`

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

### Epic ended

- [ ] Check and update changelog
  - [ ] Add CORE epic tasks
  - [ ] Check Jira's statuses
  - [ ] Add milestone issues (https://gitlab.mgdis.fr/core/core-ui/mg-components/-/milestones) **that are bugs**
  - [ ] Close milestone
  - [ ] Set release date
  - [ ] Update version
- [ ] Check version in `package.json`
- [ ] Check chromatic artifact version in `.storybook/main.ts`

# Merged

- [ ] Create release and version tag with changelog (https://gitlab.mgdis.fr/core/core-ui/mg-components/-/releases)
- [ ] Check it creates a [Teams notification](https://teams.microsoft.com/l/channel/19%3ag9SUEosMhP0faTVDP7DC0Xc9QRIMd0C3HtLCxkcH5rM1%40thread.tacv2/G%25C3%25A9n%25C3%25A9ral?groupId=53e50bb2-ac73-4e24-b611-e4a444297516&tenantId=72b6c7d7-bb28-4d80-9b47-7fc29105ff89)
- [ ] Create release on GitHub (https://github.com/MGDIS/mg-components/releases)
