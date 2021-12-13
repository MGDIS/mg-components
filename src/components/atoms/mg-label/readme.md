# mg-label



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute    | Description                                                       | Type      | Default     |
| ------------------------- | ------------ | ----------------------------------------------------------------- | --------- | ----------- |
| `colon`                   | `colon`      | Add a colon punctuation after label text                          | `boolean` | `undefined` |
| `identifier` _(required)_ | `identifier` | Label input id                                                    | `string`  | `undefined` |
| `isLegend`                | `is-legend`  | Switch from label to fieldset sementic                            | `boolean` | `false`     |
| `required`                | `required`   | If input is required an asterisk is added at the end of the label | `boolean` | `undefined` |


## Dependencies

### Used by

 - [mg-input-checkbox](../../molecules/inputs/mg-input-checkbox)
 - [mg-input-date](../../molecules/inputs/mg-input-date)
 - [mg-input-numeric](../../molecules/inputs/mg-input-numeric)
 - [mg-input-radio](../../molecules/inputs/mg-input-radio)
 - [mg-input-select](../../molecules/inputs/mg-input-select)
 - [mg-input-text](../../molecules/inputs/mg-input-text)
 - [mg-input-textarea](../../molecules/inputs/mg-input-textarea)

### Graph
```mermaid
graph TD;
  mg-input-checkbox --> mg-label
  mg-input-date --> mg-label
  mg-input-numeric --> mg-label
  mg-input-radio --> mg-label
  mg-input-select --> mg-label
  mg-input-text --> mg-label
  mg-input-textarea --> mg-label
  style mg-label fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
