## Usage

- Always used in a group with minimum 2 options
- Only one selected option is possible from all the options in the group
- The label option is clickable and selects the option
- The group can be initialized without any default value

### Theming

The style of the active radio button is that of the browser.

## Specs

![](./mg-input-radio/doc/img/mg-input-radio-specs.png)

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                                                 | Type                        | Default                      |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------- |
| `disabled`           | `disabled`            | Define if input is disabled                                                                                 | `boolean`                   | `false`                      |
| `helpText`           | `help-text`           | Add a help text under the input, usually expected data format and example                                   | `string`                    | `undefined`                  |
| `identifier`         | `identifier`          | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`                    | `createID('mg-input-radio')` |
| `inputVerticalList`  | `input-vertical-list` | Define if inputs are display verticaly                                                                      | `boolean`                   | `false`                      |
| `invalid`            | `invalid`             | Define input invalid state                                                                                  | `boolean`                   | `undefined`                  |
| `items` _(required)_ | --                    | Items are the possible options to select Required                                                           | `RadioOption[] \| string[]` | `undefined`                  |
| `label` _(required)_ | `label`               | Input label                                                                                                 | `string`                    | `undefined`                  |
| `labelHide`          | `label-hide`          | Define if label is visible                                                                                  | `boolean`                   | `false`                      |
| `labelOnTop`         | `label-on-top`        | Define if label is displayed on top                                                                         | `boolean`                   | `false`                      |
| `name`               | `name`                | Input name If not set the value equals the identifier                                                       | `string`                    | `this.identifier`            |
| `readonly`           | `readonly`            | Define if input is readonly                                                                                 | `boolean`                   | `false`                      |
| `required`           | `required`            | Define if input is required                                                                                 | `boolean`                   | `false`                      |
| `tooltip`            | `tooltip`             | Add a tooltip message next to the input                                                                     | `string`                    | `undefined`                  |
| `valid`              | `valid`               | Define input valid state                                                                                    | `boolean`                   | `undefined`                  |
| `value`              | `value`               | Component value                                                                                             | `any`                       | `undefined`                  |


## Events

| Event          | Description                         | Type                   |
| -------------- | ----------------------------------- | ---------------------- |
| `input-valid`  | Emited event when checking validity | `CustomEvent<boolean>` |
| `value-change` | Emitted event when value change     | `CustomEvent<any>`     |


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

### Graph
```mermaid
graph TD;
  mg-input-radio --> mg-tooltip
  mg-input-radio --> mg-icon
  mg-input-radio --> mg-input-title
  style mg-input-radio fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
