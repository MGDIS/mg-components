import { Component, Element, h, Prop } from '@stencil/core';
import { createID } from '../../../utils/utils';

@Component({
  tag: 'mg-tooltip',
  styleUrl: 'mg-tooltip.scss',
  scoped: true,
})
export class MgTooltip {

  /**
   * Internal
   */
   private classes = ['mg-tooltip'];

  /**
   * Sets an `id` attribute.
   * Needed by the input for accessibility `arai-decribedby`.
   */
  @Prop() identifier?: string = createID('mg-tooltip');

  /**
   * Displayed message in the tooltip
   */
  @Prop() message: string;

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgTooltipElement;

  render() {
    return (
      <div class={this.classes.join(' ')}>
        <slot></slot>
        <div role="tooltip" id={this.identifier} innerHTML={this.message}></div>
      </div>
    );
  }

  componentDidLoad() {

    /**
     * Add accessibility attributes to slotted element
     * TODO ! Component is not really accessible. see issue https://gitlab.mgdis.fr/ux-ui/design-system/-/issues/7
     */

    const slotElement = this.element.firstElementChild;

    // Check if component has an interactive element
    const interactiveElement = slotElement.shadowRoot?.querySelector('a, button, input');

    // Add tabindex on non interactive element
    if(interactiveElement === undefined) {
      slotElement.setAttribute('tabindex', '0');
      slotElement.setAttribute('title', this.message);
    }
    // else {
    //   interactiveElement.setAttribute('aria-describedby', this.identifier)
    // }

  }

}
