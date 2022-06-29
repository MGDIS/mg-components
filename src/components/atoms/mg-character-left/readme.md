## Design

### Message order

When messages are displayed under the field the order is as follows:

1. number of characters remaining
2. input help
3. error

### Indication of the number of characters remaining

When the focus is on the input field, a message is displayed underneath. The message is: "`<nbCar>` characters available", `<nbCar>` being a counter that updates dynamically according to the input.
When the focus is no longer on the input field, the message disappears.

Translated with www.DeepL.com/Translator (free version)

![](./mg-character-left/doc/img/nombre-caracteres-restants.png)

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
