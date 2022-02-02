This molecule refers to the [PDA9-604](https://jira.mgdis.fr/browse/PDA9-604).

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute    | Description                                                                                                 | Type                    | Default               |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------- |
| `identifier`        | `identifier` | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`                | `createID('mg-tabs')` |
| `tabs` _(required)_ | --           | Tabs items Required                                                                                         | `TabItem[] \| string[]` | `undefined`           |


## Dependencies

### Depends on

- [mg-icon](../../atoms/mg-icon)
- [mg-tag](../../atoms/mg-tag)

### Graph
```mermaid
graph TD;
  mg-tabs --> mg-icon
  mg-tabs --> mg-tag
  style mg-tabs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
