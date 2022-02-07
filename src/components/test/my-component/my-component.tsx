/* @jsx h */
import { h, Component } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  render() {
    return (
      <div class="my-component">
        <slot />
      </div>
    );
  }
}
