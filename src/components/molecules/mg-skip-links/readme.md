## Behavior

On the first tab, a banner with the link(s) is displayed by pushing the content down.

The number of links will be added according to the content of the page.

## Specs

### Sizing

The minimum height of the banner is 55px.

### Spacing

Items have an internal margin of 12px and are spaced 6px apart.

### Styling

- The links are in [@color-dark](./?path=/docs/style-colors--page).
- The background of the banner is in [@color-light](./?path=/docs/style-colors--page).

#### On hover

The background of the item takes the color [@color-dark](./?path=/docs/style-colors--page) at 10% opacity.

#### Focus taking

Native browser behavior is retained.

## Code example

You need to press <kbd>Tab</kbd> in the code example to see the component.

## Integration

The `mg-skip-links` must be integrated at the very top of your page to be the first focusable element.

## Implementation with a "#" based router

`mg-skip-links` uses native anchor behavior, but if your site/app uses a "#" link-based router, like AngularJS does, you'll need to use the "go-to-anchor" component event. This event returns its detail property to the target anchor, then you can apply the scrollTo anchor behavior:
- if the anchor is in the same window, with native javascript:

```js
const goToAnchor = (anchor) => {
    const top = document.querySelector(anchor).offsetTop;
    window.scrollTo(0, top);
}

Array.from(document.querySelector('mg-skip-links').shadowRoot.querySelectorAll('a')).forEach(anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();
    })
})​
```

- in case the anchor is in another window, with the [iframeRisizer's moveToAnchor method](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/methods.md#movetoanchoranchor)

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type         | Default     |
| -------- | --------- | ----------- | ------------ | ----------- |
| `links`  | --        | Skip links  | `SkipLink[]` | `undefined` |


## Events

| Event          | Description                       | Type                  |
| -------------- | --------------------------------- | --------------------- |
| `go-to-anchor` | Emited event when link is clicked | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
