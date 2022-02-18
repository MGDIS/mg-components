This atom refers to the [PDA9-745](https://jira.mgdis.fr/browse/PDA9-745)

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                                                 | Type                        | Default                      |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------- |
| `disabled`           | `disabled`            | Define if input is disabled                                                                                 | `boolean`                   | `false`                      |
| `helpText`           | `help-text`           | Add a help text under the input, usually expected data format and example                                   | `string`                    | `undefined`                  |
| `identifier`         | `identifier`          | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`                    | `createID('mg-input-radio')` |
| `inputVerticalList`  | `input-vertical-list` | Define if inputs are display verticaly                                                                      | `boolean`                   | `false`                      |
| `invalid`            | `invalid`             | Force invalid component                                                                                     | `boolean`                   | `undefined`                  |
| `items` _(required)_ | --                    | Items are the possible options to select Required                                                           | `RadioOption[] \| string[]` | `undefined`                  |
| `label` _(required)_ | `label`               | Input label Required                                                                                        | `string`                    | `undefined`                  |
| `labelHide`          | `label-hide`          | Define if label is visible                                                                                  | `boolean`                   | `false`                      |
| `labelOnTop`         | `label-on-top`        | Define if label is displayed on top                                                                         | `boolean`                   | `false`                      |
| `name`               | `name`                | Input name If not set the value equals the identifier                                                       | `string`                    | `this.identifier`            |
| `readonly`           | `readonly`            | Define if input is readonly                                                                                 | `boolean`                   | `false`                      |
| `required`           | `required`            | Define if input is required                                                                                 | `boolean`                   | `false`                      |
| `tooltip`            | `tooltip`             | Add a tooltip message next to the input                                                                     | `string`                    | `undefined`                  |
| `valid`              | `valid`               | Force valid component                                                                                       | `boolean`                   | `undefined`                  |
| `value`              | `value`               | Component value                                                                                             | `any`                       | `undefined`                  |


## Events

| Event          | Description                     | Type               |
| -------------- | ------------------------------- | ------------------ |
| `value-change` | Emitted event when value change | `CustomEvent<any>` |


## Dependencies

### Depends on

- [mg-tooltip](../../../atoms/mg-tooltip)
- [mg-icon](../../../atoms/mg-icon)
- [mg-input-title](../../../atoms/mg-input-title)
- [mg-character-left](../../../atoms/mg-character-left)

### Graph
```mermaid
graph TD;
  mg-input-radio --> mg-tooltip
  mg-input-radio --> mg-icon
  mg-input-radio --> mg-input-title
  mg-input-radio --> mg-character-left
  style mg-input-radio fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
