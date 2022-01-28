This atom refers to the [PDA9-181](https://jira.mgdis.fr/browse/PDA9-181).

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description                                                                                                                                    | Type      | Default                        |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------ |
| `disabled`           | `disabled`     | Define if input is disabled                                                                                                                    | `boolean` | `false`                        |
| `helpText`           | `help-text`    | Template to use for characters left sentence                                                                                                   | `string`  | `undefined`                    |
| `identifier`         | `identifier`   | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.                                    | `string`  | `createID('mg-input-numeric')` |
| `invalid`            | `invalid`      | Define input pattern error message                                                                                                             | `boolean` | `undefined`                    |
| `label` _(required)_ | `label`        | Input label Required                                                                                                                           | `string`  | `undefined`                    |
| `labelHide`          | `label-hide`   | Define if label is visible                                                                                                                     | `boolean` | `false`                        |
| `labelOnTop`         | `label-on-top` | Define if label is displayed on top                                                                                                            | `boolean` | `undefined`                    |
| `max`                | `max`          | Maximum value                                                                                                                                  | `number`  | `undefined`                    |
| `min`                | `min`          | Minimum value                                                                                                                                  | `number`  | `undefined`                    |
| `name`               | `name`         | Input name If not set the value equals the identifier                                                                                          | `string`  | `this.identifier`              |
| `placeholder`        | `placeholder`  | Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text. | `string`  | `undefined`                    |
| `readonly`           | `readonly`     | Define if input is readonly                                                                                                                    | `boolean` | `false`                        |
| `required`           | `required`     | Define if input is required                                                                                                                    | `boolean` | `false`                        |
| `tooltip`            | `tooltip`      | Add a tooltip message next to the input                                                                                                        | `string`  | `undefined`                    |
| `type`               | `type`         | Define numeric type                                                                                                                            | `string`  | `types[0]`                     |
| `valid`              | `valid`        | Define input pattern to validate                                                                                                               | `boolean` | `undefined`                    |
| `value`              | `value`        | Component value                                                                                                                                | `string`  | `undefined`                    |


## Events

| Event          | Description                     | Type                  |
| -------------- | ------------------------------- | --------------------- |
| `value-change` | Emmited event when value change | `CustomEvent<number>` |


## Dependencies

### Depends on

- [mg-tooltip](../../../atoms/mg-tooltip)
- [mg-icon](../../../atoms/mg-icon)
- [mg-input-title](../../../atoms/mg-input-title)
- [mg-character-left](../../../atoms/mg-character-left)

### Graph
```mermaid
graph TD;
  mg-input-numeric --> mg-tooltip
  mg-input-numeric --> mg-icon
  mg-input-numeric --> mg-input-title
  mg-input-numeric --> mg-character-left
  style mg-input-numeric fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
