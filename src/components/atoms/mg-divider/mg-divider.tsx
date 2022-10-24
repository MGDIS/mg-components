import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mg-divider',
  styleUrl: 'mg-divider.scss',
  shadow: true,
})
export class MgDivider {
  /**************
   * Decorators *
   **************/

  /**
   * Define component size
   */
  @Prop() size: 'regular' | 'full' = 'regular';

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <div
        class={{
          'mg-divider': true,
          'mg-divider--full': this.size === 'full',
        }}
      ></div>
    );
  }
}
