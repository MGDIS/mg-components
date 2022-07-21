## Design

![](./mg-character-left/doc/img/mg-character-left.png)

<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute    | Description                                                                      | Type     | Default     |
| ------------------------ | ------------ | -------------------------------------------------------------------------------- | -------- | ----------- |
| `characters`             | `characters` | Sets the characters to count                                                     | `string` | `''`        |
| `identifier`             | `identifier` | Sets an `id` attribute. Needed by the input for accessibility `aria-decribedby`. | `string` | `undefined` |
| `maxlength` _(required)_ | `maxlength`  | Add maximum length                                                               | `number` | `undefined` |


## Dependencies

### Used by

 - [mg-input-text](../../molecules/inputs/mg-input-text)
 - [mg-input-textarea](../../molecules/inputs/mg-input-textarea)

### Graph
```mermaid
graph TD;
  mg-input-text --> mg-character-left
  mg-input-textarea --> mg-character-left
  style mg-character-left fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
