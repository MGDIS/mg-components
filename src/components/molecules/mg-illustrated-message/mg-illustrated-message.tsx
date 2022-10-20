import { Component, Element, h, Prop } from '@stencil/core';
import { isTagName } from '../../../utils/components.utils';

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

  /**
   * Define component orientation
   */
  @Prop() direction: 'vertical' | 'horizontal' = 'vertical';

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const imageTags = ['img', 'svg'];

    if (!isTagName(this.element.querySelector('[slot="title"]'), headingTags)) {
      throw new Error(`<mg-illustrated-message> Slotted title must be a heading: ${headingTags.join(', ')}`);
    } else if (!isTagName(this.element.querySelector('[slot="illustration"]'), imageTags)) {
      throw new Error(`<mg-illustrated-message> Slotted illustration must be an image: ${imageTags.join(', ')}`);
    }
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <div
        class={{
          'mg-illustrated-message': true,
          'mg-illustrated-message--horizontal': this.direction === 'horizontal',
        }}
      >
        <div
          class={{
            'mg-illustrated-message__illustration': true,
            'mg-illustrated-message__illustration--small': this.size === 'small',
          }}
        >
          <slot name="illustration"></slot>
        </div>
        <div class="mg-illustrated-message__slots">
          <div class="mg-illustrated-message__title">
            <slot name="title"></slot>
          </div>
          <div class="mg-illustrated-message__details">
            <slot name="details"></slot>
          </div>
        </div>
      </div>
    );
  }
}
