# mg-form



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                 | Type      | Default                        |
| ------------ | ------------ | ----------------------------------------------------------------------------------------------------------- | --------- | ------------------------------ |
| `disabled`   | `disabled`   | Define if form is disabled                                                                                  | `boolean` | `false`                        |
| `identifier` | `identifier` | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`  | `createID('mg-input-numeric')` |
| `invalid`    | `invalid`    | Define form invalid state                                                                                   | `boolean` | `undefined`                    |
| `name`       | `name`       | Input name If not set the value equals the identifier                                                       | `string`  | `this.identifier`              |
| `readonly`   | `readonly`   | Define if form is readonly                                                                                  | `boolean` | `false`                        |
| `valid`      | `valid`      | Define form valid state                                                                                     | `boolean` | `undefined`                    |


## Events

| Event        | Description                                                        | Type                   |
| ------------ | ------------------------------------------------------------------ | ---------------------- |
| `form-valid` | Emitted event on form validity check Tells if form is valid or not | `CustomEvent<boolean>` |


## Methods

### `displayError() => Promise<void>`

Public method to display errors

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
