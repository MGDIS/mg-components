# mg-tooltip



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                    | Type     | Default                  |
| ------------ | ------------ | ------------------------------------------------------------------------------ | -------- | ------------------------ |
| `identifier` | `identifier` | Sets an `id` element. Needed by the input for accessibility `arai-decribedby`. | `string` | `createID('mg-tooltip')` |
| `message`    | `message`    | Displayed message in the tooltip                                               | `string` | `undefined`              |


## Dependencies

### Used by

 - [mg-input-checkbox](../../molecules/inputs/mg-input-checkbox)
 - [mg-input-date](../../molecules/inputs/mg-input-date)
 - [mg-input-select](../../molecules/inputs/mg-input-select)
 - [mg-input-text](../../molecules/inputs/mg-input-text)
 - [mg-input-textarea](../../molecules/inputs/mg-input-textarea)

### Graph
```mermaid
graph TD;
  mg-input-checkbox --> mg-tooltip
  mg-input-date --> mg-tooltip
  mg-input-select --> mg-tooltip
  mg-input-text --> mg-tooltip
  mg-input-textarea --> mg-tooltip
  style mg-tooltip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
