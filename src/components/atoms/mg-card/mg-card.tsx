import { Component, h } from '@stencil/core';

@Component({
  tag: 'mg-card',
  styleUrl: 'mg-card.scss',
  shadow: true,
})
export class MgCard {
  /*************
   * Lifecycle *
   *************/

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <div class="mg-card">
        <slot></slot>
      </div>
    );
  }
}
