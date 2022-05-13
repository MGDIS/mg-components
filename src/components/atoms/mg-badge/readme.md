## Design

**RUX-01** : Le badge est placé toujours par-dessus ou à côté de l'élément sur lequel il porte.

**RUX-02** : Le badge affiche un chiffre/nombre ou un caractère de ponctuation.

![](./mg-badge/doc/img/screenshot-2.png)

## Styles

![](./mg-badge/doc/img/styles.png)

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description                                                        | Type               | Default       |
| -------------------- | --------- | ------------------------------------------------------------------ | ------------------ | ------------- |
| `label` _(required)_ | `label`   | Badge label. Include short description. Required for accessibility | `string`           | `undefined`   |
| `outline`            | `outline` | Define if button is using outline style                            | `boolean`          | `undefined`   |
| `value` _(required)_ | `value`   | Badge value                                                        | `number \| string` | `undefined`   |
| `variant`            | `variant` | Define button variant                                              | `string`           | `variants[0]` |


## Dependencies

### Used by

 - [mg-tabs](../../molecules/mg-tabs)

### Graph
```mermaid
graph TD;
  mg-tabs --> mg-badge
  style mg-badge fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
