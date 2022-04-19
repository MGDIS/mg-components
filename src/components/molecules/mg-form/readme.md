This molecule refers to the [PDA9-818](https://jira.mgdis.fr/browse/PDA9-818).

## Example

**Code example does not reflect all the code.**

Here we have a `form-valid` event listener on the `mg-form` to define if the "submit" button should be enable or not.  
The "Display errors" button use the `mg-form` `displayError()` method.

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
