This atom refers to [PDA9-64](https://jira.mgdis.fr/browse/PDA9-64), [PDA9-723](https://jira.mgdis.fr/browse/PDA9-723).

<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute    | Description                                                                      | Type     | Default               |
| ------------------------ | ------------ | -------------------------------------------------------------------------------- | -------- | --------------------- |
| `characters`             | `characters` | Sets the characters to count                                                     | `string` | `''`                  |
| `identifier`             | `identifier` | Sets an `id` attribute. Needed by the input for accessibility `aria-decribedby`. | `string` | `undefined`           |
| `maxlength` _(required)_ | `maxlength`  | Add maximum length                                                               | `number` | `undefined`           |
| `template`               | `template`   | Template to display remaining characters. Must have {counter} inside             | `string` | `messages.nbCharLeft` |


## Dependencies

### Used by

 - [mg-input-checkbox](../../molecules/inputs/mg-input-checkbox)
 - [mg-input-date](../../molecules/inputs/mg-input-date)
 - [mg-input-numeric](../../molecules/inputs/mg-input-numeric)
 - [mg-input-password](../../molecules/inputs/mg-input-password)
 - [mg-input-radio](../../molecules/inputs/mg-input-radio)
 - [mg-input-select](../../molecules/inputs/mg-input-select)
 - [mg-input-text](../../molecules/inputs/mg-input-text)
 - [mg-input-textarea](../../molecules/inputs/mg-input-textarea)
 - [mg-input-toggle](../../molecules/inputs/mg-input-toggle)

### Graph
```mermaid
graph TD;
  mg-input-checkbox --> mg-character-left
  mg-input-date --> mg-character-left
  mg-input-numeric --> mg-character-left
  mg-input-password --> mg-character-left
  mg-input-radio --> mg-character-left
  mg-input-select --> mg-character-left
  mg-input-text --> mg-character-left
  mg-input-textarea --> mg-character-left
  mg-input-toggle --> mg-character-left
  style mg-character-left fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
