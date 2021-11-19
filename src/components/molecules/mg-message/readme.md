# mg-message



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                 | Type      | Default                  |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------- | --------- | ------------------------ |
| `closeButton` | `close-button` | Define if message has a cross button RG 01: https://jira.mgdis.fr/browse/PDA9-140                           | `boolean` | `false`                  |
| `hide`        | `hide`         | Define if message is hidden                                                                                 | `boolean` | `false`                  |
| `identifier`  | `identifier`   | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`  | `createID('mg-message')` |
| `variant`     | `variant`      | Message variant                                                                                             | `string`  | `variants[0]`            |


## Dependencies

### Depends on

- [mg-icon](../../atoms/mg-icon)
- [mg-button](../../atoms/mg-button)

### Graph
```mermaid
graph TD;
  mg-message --> mg-icon
  mg-message --> mg-button
  style mg-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*