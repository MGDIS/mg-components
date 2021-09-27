# mg-input-text



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute     | Description                                                                                                   | Type      | Default                     |
| -------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- | --------- | --------------------------- |
| `disabled`           | `disabled`    | Define if input is desabled                                                                                   | `boolean` | `undefined`                 |
| `label` _(required)_ | `label`       | Input label Required                                                                                          | `string`  | `undefined`                 |
| `maxlength`          | `maxlength`   | Input max length                                                                                              | `number`  | `400`                       |
| `name`               | `name`        | Input name If not set the value equals the reference                                                          | `string`  | `this.reference`            |
| `placeholder`        | `placeholder` | Input placeholder                                                                                             | `string`  | `undefined`                 |
| `reference`          | `reference`   | Input reference used for the input ID (id is a reserved prop in Stencil.js) If not set, an ID will be created | `string`  | `createID('mg-input-text')` |
| `required`           | `required`    | Define if input is required Also add an asterisk at the end of the label                                      | `boolean` | `undefined`                 |
| `value`              | `value`       |                                                                                                               | `string`  | `undefined`                 |


## Events

| Event     | Description | Type                  |
| --------- | ----------- | --------------------- |
| `changed` |             | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
