# mg-action-more



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute       | Description                                        | Type         | Default               |
| -------------------- | --------------- | -------------------------------------------------- | ------------ | --------------------- |
| `displayLabel`       | `display-label` | Define if label is display                         | `boolean`    | `undefined`           |
| `icon`               | `icon`          | Define displaied icon Default: 'ellipsis-vertical' | `string`     | `'ellipsis-vertical'` |
| `items` _(required)_ | --              | Define the menu-items elements                     | `ItemType[]` | `undefined`           |


## Events

| Event             | Description                                                 | Type                  |
| ----------------- | ----------------------------------------------------------- | --------------------- |
| `selected-change` | Emitted event when selected item change - item index number | `CustomEvent<number>` |


## Dependencies

### Used by

 - [mg-action-menu](../mg-action-menu)

### Depends on

- [mg-popover](../../mg-popover)
- [mg-button](../../../atoms/mg-button)
- [mg-icon](../../../atoms/mg-icon)
- [mg-badge](../../../atoms/mg-badge)
- [mg-menu](../mg-menu)
- [mg-menu-item](../mg-menu-item)

### Graph
```mermaid
graph TD;
  mg-action-more --> mg-popover
  mg-action-more --> mg-button
  mg-action-more --> mg-icon
  mg-action-more --> mg-badge
  mg-action-more --> mg-menu
  mg-action-more --> mg-menu-item
  mg-popover --> mg-button
  mg-popover --> mg-icon
  mg-button --> mg-icon
  mg-menu --> mg-menu-item
  mg-menu --> mg-icon
  mg-menu --> mg-badge
  mg-menu --> mg-menu
  mg-menu-item --> mg-icon
  mg-menu-item --> mg-popover
  mg-action-menu --> mg-action-more
  style mg-action-more fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
