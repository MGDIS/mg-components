# mg-input-select

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description                                                                                                                                    | Type                   | Default                             |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------------------------------- |
| `disabled`           | `disabled`     | Define if input is disabled                                                                                                                    | `boolean`              | `false`                             |
| `helpText`           | `help-text`    | Template to use for characters left sentence                                                                                                   | `string`               | `undefined`                         |
| `identifier`         | `identifier`   | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.                                    | `string`               | `createID('mg-input-select')`       |
| `invalid`            | `invalid`      | Define input invalid state                                                                                                                     | `boolean`              | `undefined`                         |
| `items` _(required)_ | --             | Items are the possible options to select                                                                                                       | `Option[] \| string[]` | `undefined`                         |
| `label` _(required)_ | `label`        | Input label Required                                                                                                                           | `string`               | `undefined`                         |
| `labelColon`         | `label-colon`  | Define if label has colon ":"                                                                                                                  | `boolean`              | `false`                             |
| `labelOnTop`         | `label-on-top` | Define if label is displayed on top                                                                                                            | `boolean`              | `undefined`                         |
| `name`               | `name`         | Input name If not set the value equals the identifier                                                                                          | `string`               | `this.identifier`                   |
| `placeholder`        | `placeholder`  | Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text. | `string`               | `messages.input.select.placeholder` |
| `readonly`           | `readonly`     | Define if input is readonly                                                                                                                    | `boolean`              | `false`                             |
| `required`           | `required`     | Define if input is required                                                                                                                    | `boolean`              | `false`                             |
| `tooltip`            | `tooltip`      | Add a tooltip message next to the input                                                                                                        | `string`               | `undefined`                         |
| `valid`              | `valid`        | Define input valid state                                                                                                                       | `boolean`              | `undefined`                         |
| `value`              | `value`        | Component value                                                                                                                                | `string`               | `undefined`                         |


## Events

| Event         | Description                     | Type                  |
| ------------- | ------------------------------- | --------------------- |
| `valueChange` | Emmited event when value change | `CustomEvent<string>` |


## Dependencies

### Depends on

- [mg-label](../../../atoms/mg-label)
- [mg-tooltip](../../../atoms/mg-tooltip)
- [mg-icon](../../../atoms/mg-icon)
- [mg-character-left](../../../atoms/mg-character-left)

### Graph
```mermaid
graph TD;
  mg-input-select --> mg-label
  mg-input-select --> mg-tooltip
  mg-input-select --> mg-icon
  mg-input-select --> mg-character-left
  style mg-input-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
