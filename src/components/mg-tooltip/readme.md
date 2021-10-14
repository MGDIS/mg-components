# mg-tooltip



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                    | Type     | Default                  |
| ------------ | ------------ | ------------------------------------------------------------------------------ | -------- | ------------------------ |
| `identifier` | `identifier` | Sets an `id` element. Needed by the input for accessibility `arai-decribedby`. | `string` | `createID('mg-tooltip')` |
| `message`    | `message`    | Displayed message in the tooltip                                               | `string` | `undefined`              |


## Dependencies

### Used by

 - [mg-input-date](../molecules/inputs/mg-input-date)
 - [mg-input-text](../mg-input-text)

### Graph
```mermaid
graph TD;
  mg-input-date --> mg-tooltip
  mg-input-text --> mg-tooltip
  style mg-tooltip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
