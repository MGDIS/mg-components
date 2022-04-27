## Design

### Indication du nombre de caractères restants

- lorsque le focus est sur le champ de saisie, un message s'affiche en dessous
- le message est : "<nbCar> caractères disponibles", <nbCar> étant un compteur qui se met à jour dynamiquement en fonction de la saisie
- lorsque le focus n'est plus sur le champ de saisie, le message disparaît

### Valeur

- par défaut limitée 4000 caractères de type alpha numérique.

### Dimensions

- la hauteur du composant est par défaut de 3 lignes de texte (cette valeur est configurable)
- le champ est retaillable en cliquant en bas à droite de la zone de saisie

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description                                                                                                                                    | Type                     | Default                         |
| ----------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------- |
| `characterLeftTemplate` | `character-left-template` | Template to use for characters left sentence                                                                                                   | `string`                 | `undefined`                     |
| `disabled`              | `disabled`                | Define if input is disabled                                                                                                                    | `boolean`                | `false`                         |
| `displayCharacterLeft`  | `display-character-left`  | Define if component should display character left                                                                                              | `boolean`                | `true`                          |
| `helpText`              | `help-text`               | Add a help text under the input, usually expected data format and example                                                                      | `string`                 | `undefined`                     |
| `identifier`            | `identifier`              | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.                                    | `string`                 | `createID('mg-input-textarea')` |
| `invalid`               | `invalid`                 | Define input invalid state                                                                                                                     | `boolean`                | `undefined`                     |
| `label` _(required)_    | `label`                   | Input label                                                                                                                                    | `string`                 | `undefined`                     |
| `labelHide`             | `label-hide`              | Define if label is visible                                                                                                                     | `boolean`                | `false`                         |
| `labelOnTop`            | `label-on-top`            | Define if label is displayed on top                                                                                                            | `boolean`                | `undefined`                     |
| `maxlength`             | `maxlength`               | Input max length                                                                                                                               | `number`                 | `4000`                          |
| `name`                  | `name`                    | Input name If not set the value equals the identifier                                                                                          | `string`                 | `this.identifier`               |
| `pattern`               | `pattern`                 | Define input pattern to validate                                                                                                               | `string`                 | `undefined`                     |
| `patternErrorMessage`   | `pattern-error-message`   | Define input pattern error message                                                                                                             | `string`                 | `undefined`                     |
| `placeholder`           | `placeholder`             | Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text. | `string`                 | `undefined`                     |
| `readonly`              | `readonly`                | Define if input is readonly                                                                                                                    | `boolean`                | `false`                         |
| `required`              | `required`                | Define if input is required                                                                                                                    | `boolean`                | `false`                         |
| `rows`                  | `rows`                    | Define input pattern error message                                                                                                             | `number`                 | `3`                             |
| `tooltip`               | `tooltip`                 | Add a tooltip message next to the input                                                                                                        | `string`                 | `undefined`                     |
| `valid`                 | `valid`                   | Define input valid state                                                                                                                       | `boolean`                | `undefined`                     |
| `value`                 | `value`                   | Component value                                                                                                                                | `string`                 | `undefined`                     |
| `width`                 | `width`                   | Define input width                                                                                                                             | `"full" \| 16 \| 2 \| 4` | `'full'`                        |


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
  mg-input-textarea --> mg-tooltip
  mg-input-textarea --> mg-icon
  mg-input-textarea --> mg-input-title
  mg-input-textarea --> mg-character-left
  style mg-input-textarea fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
