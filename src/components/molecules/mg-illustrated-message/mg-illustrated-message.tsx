import { Component, Element, h, Prop } from '@stencil/core';
import { isHn } from '../../../utils/components.utils';

@Component({
  tag: 'mg-illustrated-message',
  styleUrl: 'mg-illustrated-message.scss',
  shadow: true,
})
export class MgIllustratedMessage {
  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgIllustratedMessageElement;

  /**
   * Define illustration size
   */
  @Prop() size: 'regular' | 'small' = 'regular';

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    if (!isHn(this.element.querySelector('[slot="title"]'))) {
      throw new Error(`<mg-illustrated-message> Slotted title must be a heading.`);
    }
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <div class="mg-illustrated-message">
        <div
          class={{
            'mg-illustrated-message__illustration': true,
            'mg-illustrated-message__illustration--small': this.size === 'small',
          }}
        >
          <slot name="illustration"></slot>
        </div>
        <div class="mg-illustrated-message__title">
          <slot name="title"></slot>
        </div>
        <div class="mg-illustrated-message__details">
          <slot name="details"></slot>
        </div>
      </div>
    );
  }
}
