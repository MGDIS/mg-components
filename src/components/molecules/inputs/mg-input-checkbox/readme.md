# mg-input-checkbox

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute       | Description                                                                                                 | Type      | Default                         |
| -------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- | --------- | ------------------------------- |
| `disabled`           | `disabled`      | Define if input is disabled                                                                                 | `boolean` | `false`                         |
| `helpText`           | `help-text`     | Template to use for characters left sentence                                                                | `string`  | `undefined`                     |
| `identifier`         | `identifier`    | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`  | `createID('mg-input-checkbox')` |
| `indeterminate`      | `indeterminate` | Manage indeterminate state                                                                                  | `boolean` | `false`                         |
| `invalid`            | `invalid`       | Force invalid component                                                                                     | `boolean` | `undefined`                     |
| `label` _(required)_ | `label`         | Input label Required                                                                                        | `string`  | `undefined`                     |
| `labelColon`         | `label-colon`   | Define if label has colon ":"                                                                               | `boolean` | `false`                         |
| `labelOnTop`         | `label-on-top`  | Define if label is displayed on top                                                                         | `boolean` | `undefined`                     |
| `name`               | `name`          | Input name If not set the value equals the identifier                                                       | `string`  | `this.identifier`               |
| `readonly`           | `readonly`      | Define if input is readonly                                                                                 | `boolean` | `false`                         |
| `required`           | `required`      | Define if input is required                                                                                 | `boolean` | `false`                         |
| `tooltip`            | `tooltip`       | Add a tooltip message next to the input                                                                     | `string`  | `undefined`                     |
| `valid`              | `valid`         | Force valid component                                                                                       | `boolean` | `undefined`                     |
| `value`              | `value`         | Component value If not set, checkbox will be indeterminate by default                                       | `boolean` | `undefined`                     |


## Events

| Event         | Description                     | Type                   |
| ------------- | ------------------------------- | ---------------------- |
| `valueChange` | Emitted event when value change | `CustomEvent<boolean>` |


## Dependencies

### Depends on

- [mg-label](../../../atoms/mg-label)
- [mg-tooltip](../../../atoms/mg-tooltip)
- [mg-icon](../../../atoms/mg-icon)
- [mg-character-left](../../../atoms/mg-character-left)
- [mg-help-text](../../../atoms/mg-help-text)

### Graph
```mermaid
graph TD;
  mg-input-checkbox --> mg-label
  mg-input-checkbox --> mg-tooltip
  mg-input-checkbox --> mg-icon
  mg-input-checkbox --> mg-character-left
  mg-input-checkbox --> mg-help-text
  style mg-input-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*