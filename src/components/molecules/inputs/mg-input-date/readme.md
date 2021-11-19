# mg-input-date

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description                                                                                                 | Type      | Default                     |
| -------------------- | -------------- | ----------------------------------------------------------------------------------------------------------- | --------- | --------------------------- |
| `disabled`           | `disabled`     | Define if input is disabled                                                                                 | `boolean` | `false`                     |
| `helpText`           | `help-text`    | Template to use for characters left sentence                                                                | `string`  | `undefined`                 |
| `identifier`         | `identifier`   | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`  | `createID('mg-input-date')` |
| `invalid`            | `invalid`      | Define input pattern error message                                                                          | `boolean` | `undefined`                 |
| `label` _(required)_ | `label`        | Input label Required                                                                                        | `string`  | `undefined`                 |
| `labelColon`         | `label-colon`  | Define if label has colon ":"                                                                               | `boolean` | `false`                     |
| `labelOnTop`         | `label-on-top` | Define if label is displayed on top                                                                         | `boolean` | `undefined`                 |
| `name`               | `name`         | Input name If not set the value equals the identifier                                                       | `string`  | `this.identifier`           |
| `readonly`           | `readonly`     | Define if input is readonly                                                                                 | `boolean` | `false`                     |
| `required`           | `required`     | Define if input is required                                                                                 | `boolean` | `false`                     |
| `tooltip`            | `tooltip`      | Add a tooltip message next to the input                                                                     | `string`  | `undefined`                 |
| `valid`              | `valid`        | Define input pattern to validate                                                                            | `boolean` | `undefined`                 |
| `value`              | `value`        | Component value                                                                                             | `string`  | `undefined`                 |


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
- [mg-help-text](../../../atoms/mg-help-text)

### Graph
```mermaid
graph TD;
  mg-input-date --> mg-label
  mg-input-date --> mg-tooltip
  mg-input-date --> mg-icon
  mg-input-date --> mg-character-left
  mg-input-date --> mg-help-text
  style mg-input-date fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
