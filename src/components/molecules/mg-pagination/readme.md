## Design

### Composantes

![](./img/components/mg-pagination/pagination-components.png)

### Nombre d'éléments affichés

![](./img/components/mg-pagination/pagination-nbelem.png)

### Compteur d'éléments

![](./img/components/mg-pagination/pagination-counter.png)

### Navigation des pages

![](./img/components/mg-pagination/page-navig.png)

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                 | Type     | Default                     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------- | -------- | --------------------------- |
| `currentPage` | `current-page` | Component current page                                                                                      | `number` | `1`                         |
| `identifier`  | `identifier`   | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string` | `createID('mg-pagination')` |
| `label`       | `label`        | Panignation label. Is a short description. Customize default value can be usefull to improve accessibility  | `string` | `'pagination'`              |
| `totalPages`  | `total-pages`  | Component total pages                                                                                       | `number` | `1`                         |


## Events

| Event                 | Description                            | Type                  |
| --------------------- | -------------------------------------- | --------------------- |
| `current-page-change` | Emmited event when current page change | `CustomEvent<number>` |


## Dependencies

### Depends on

- [mg-button](../../atoms/mg-button)
- [mg-icon](../../atoms/mg-icon)
- [mg-input-select](../inputs/mg-input-select)

### Graph
```mermaid
graph TD;
  mg-pagination --> mg-button
  mg-pagination --> mg-icon
  mg-pagination --> mg-input-select
  mg-button --> mg-icon
  mg-input-select --> mg-tooltip
  mg-input-select --> mg-icon
  mg-input-select --> mg-input-title
  mg-input-select --> mg-character-left
  style mg-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
