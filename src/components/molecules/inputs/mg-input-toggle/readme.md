# mg-input-toggle



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                                                 | Type                        | Default                       |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------- |
| `disabled`           | `disabled`            | Define if input is disabled                                                                                 | `boolean`                   | `false`                       |
| `helpText`           | `help-text`           | Template to use for characters left sentence                                                                | `string`                    | `undefined`                   |
| `identifier`         | `identifier`          | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`                    | `createID('mg-input-toggle')` |
| `invalid`            | `invalid`             | Force invalid component                                                                                     | `boolean`                   | `undefined`                   |
| `items` _(required)_ | --                    | Items are the possible options to select Required                                                           | `ToggleValue[] \| string[]` | `undefined`                   |
| `label` _(required)_ | `label`               | Input label Required                                                                                        | `string`                    | `undefined`                   |
| `labelHide`          | `label-hide`          | Define if label is visible                                                                                  | `boolean`                   | `false`                       |
| `labelOnTop`         | `label-on-top`        | Define if label is displayed on top                                                                         | `boolean`                   | `undefined`                   |
| `name`               | `name`                | Input name If not set the value equals the identifier                                                       | `string`                    | `this.identifier`             |
| `readonly`           | `readonly`            | Define if input is readonly                                                                                 | `boolean`                   | `false`                       |
| `required`           | `required`            | Define if input is required                                                                                 | `boolean`                   | `false`                       |
| `tooltip`            | `tooltip`             | Add a tooltip message next to the input                                                                     | `string`                    | `undefined`                   |
| `valid`              | `valid`               | Force valid component                                                                                       | `boolean`                   | `undefined`                   |
| `value`              | `value`               | Component value                                                                                             | `any`                       | `undefined`                   |
| `valuesSideBySide`   | `values-side-by-side` | Define if values are displaed side by side                                                                  | `boolean`                   | `false`                       |


## Events

| Event         | Description                     | Type               |
| ------------- | ------------------------------- | ------------------ |
| `valueChange` | Emmited event when value change | `CustomEvent<any>` |


## Dependencies

### Depends on

- [mg-tooltip](../../../atoms/mg-tooltip)
- [mg-icon](../../../atoms/mg-icon)
- [mg-input-title](../../../atoms/mg-input-title)
- [mg-character-left](../../../atoms/mg-character-left)

### Graph
```mermaid
graph TD;
  mg-input-toggle --> mg-tooltip
  mg-input-toggle --> mg-icon
  mg-input-toggle --> mg-input-title
  mg-input-toggle --> mg-character-left
  style mg-input-toggle fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
