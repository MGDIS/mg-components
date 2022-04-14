This molecule refers to the [PDA9-769](https://jira.mgdis.fr/browse/PDA9-769)

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description                                                                                                                                    | Type                     | Default                         |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------- |
| `disabled`           | `disabled`     | Define if input is disabled                                                                                                                    | `boolean`                | `false`                         |
| `helpText`           | `help-text`    | Add a help text under the input, usually expected data format and example                                                                      | `string`                 | `undefined`                     |
| `identifier`         | `identifier`   | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.                                    | `string`                 | `createID('mg-input-password')` |
| `invalid`            | `invalid`      | Define input invalid state                                                                                                                     | `boolean`                | `undefined`                     |
| `label` _(required)_ | `label`        | Input label Required                                                                                                                           | `string`                 | `undefined`                     |
| `labelHide`          | `label-hide`   | Define if label is visible                                                                                                                     | `boolean`                | `false`                         |
| `labelOnTop`         | `label-on-top` | Define if label is displayed on top                                                                                                            | `boolean`                | `undefined`                     |
| `name`               | `name`         | Input name If not set the value equals the identifier                                                                                          | `string`                 | `this.identifier`               |
| `placeholder`        | `placeholder`  | Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text. | `string`                 | `undefined`                     |
| `readonly`           | `readonly`     | Define if input is readonly                                                                                                                    | `boolean`                | `false`                         |
| `required`           | `required`     | Define if input is required                                                                                                                    | `boolean`                | `false`                         |
| `tooltip`            | `tooltip`      | Add a tooltip message next to the input                                                                                                        | `string`                 | `undefined`                     |
| `valid`              | `valid`        | Define input valid state                                                                                                                       | `boolean`                | `undefined`                     |
| `value`              | `value`        | Component value                                                                                                                                | `string`                 | `undefined`                     |
| `width`              | `width`        | Define input width                                                                                                                             | `"full" \| 16 \| 2 \| 4` | `'full'`                        |


## Events

| Event          | Description                         | Type                   |
| -------------- | ----------------------------------- | ---------------------- |
| `input-valid`  | Emited event when checking validity | `CustomEvent<boolean>` |
| `value-change` | Emited event when value change      | `CustomEvent<string>`  |


## Methods

### `displayError() => Promise<void>`

Public method to display errors

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [mg-tooltip](../../../atoms/mg-tooltip)
- [mg-icon](../../../atoms/mg-icon)
- [mg-input-title](../../../atoms/mg-input-title)
- [mg-character-left](../../../atoms/mg-character-left)

### Graph
```mermaid
graph TD;
  mg-input-password --> mg-tooltip
  mg-input-password --> mg-icon
  mg-input-password --> mg-input-title
  mg-input-password --> mg-character-left
  style mg-input-password fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
