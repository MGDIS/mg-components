## Usage

An amount field is a numeric field.  
By default it is limited to 16 characters (including comma).

It is not possible to enter characters other than numbers, "," or ".".

Rounding is to two digits after the decimal point.  
It is not possible to enter more than two digits after the decimal point.

It is possible to specify a unit after the field for integers and decimals. For currencies, the symbol is positioned in the input field.

## Specs

### Positioning

By default, the value is right aligned.

![](./mg-input-numeric/doc/img/mg-input-numeric-positioning-default.png)

You can change the CSS variable `--mg-inputs-text-align` to left align.

![](./mg-input-numeric/doc/img/mg-input-numeric-positioning-custom.png)

## Slot

The spacing between the field and the slot content is not managed by the component, it must be defined in slot implementation.

### Unit positioning

![](./mg-input-numeric/doc/img/mg-input-numeric-unit.png)

Unit term must be placed into the field slot using a "space" character before the unit term.

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute        | Description                                                                                                                                    | Type                     | Default           |
| ------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------------- |
| `currency`                | `currency`       | Define currency                                                                                                                                | `string`                 | `'USD'`           |
| `decimalLength`           | `decimal-length` | Override decimal length decimal is the number after the decimal point                                                                          | `number`                 | `2`               |
| `disabled`                | `disabled`       | Define if input is disabled                                                                                                                    | `boolean`                | `false`           |
| `helpText`                | `help-text`      | Add a help text under the input, usually expected data format and example                                                                      | `string`                 | `undefined`       |
| `identifier` _(required)_ | `identifier`     | Identifier is used for the element ID (id is a reserved prop in Stencil.js)                                                                    | `string`                 | `undefined`       |
| `integerLength`           | `integer-length` | Override integer length integer is the number before the decimal point                                                                         | `number`                 | `13`              |
| `invalid`                 | `invalid`        | Define input pattern error message                                                                                                             | `boolean`                | `undefined`       |
| `label` _(required)_      | `label`          | Input label                                                                                                                                    | `string`                 | `undefined`       |
| `labelHide`               | `label-hide`     | Define if label is visible                                                                                                                     | `boolean`                | `false`           |
| `labelOnTop`              | `label-on-top`   | Define if label is displayed on top                                                                                                            | `boolean`                | `undefined`       |
| `max`                     | `max`            | Maximum value                                                                                                                                  | `number`                 | `undefined`       |
| `mgWidth`                 | `mg-width`       | Define input width                                                                                                                             | `"full" \| 16 \| 2 \| 4` | `undefined`       |
| `min`                     | `min`            | Minimum value                                                                                                                                  | `number`                 | `undefined`       |
| `name`                    | `name`           | Input name If not set the value equals the identifier                                                                                          | `string`                 | `this.identifier` |
| `placeholder`             | `placeholder`    | Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text. | `string`                 | `undefined`       |
| `readonly`                | `readonly`       | Define if input is readonly                                                                                                                    | `boolean`                | `false`           |
| `required`                | `required`       | Define if input is required                                                                                                                    | `boolean`                | `false`           |
| `tooltip`                 | `tooltip`        | Add a tooltip message next to the input                                                                                                        | `string`                 | `undefined`       |
| `type`                    | `type`           | Define numeric type                                                                                                                            | `string`                 | `types[0]`        |
| `valid`                   | `valid`          | Define input pattern to validate                                                                                                               | `boolean`                | `undefined`       |
| `value`                   | `value`          | Component value                                                                                                                                | `string`                 | `undefined`       |


## Events

| Event          | Description                         | Type                   |
| -------------- | ----------------------------------- | ---------------------- |
| `input-valid`  | Emited event when checking validity | `CustomEvent<boolean>` |
| `value-change` | Emited event when value change      | `CustomEvent<number>`  |


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
  mg-input-numeric --> mg-tooltip
  mg-input-numeric --> mg-icon
  mg-input-numeric --> mg-input-title
  style mg-input-numeric fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
