import { Component, Element, h, Prop, Watch } from '@stencil/core';
import { initLocales } from '../../../locales';

@Component({
  tag: 'mg-character-left',
  styleUrl: 'mg-character-left.scss',
  scoped: true,
})
export class MgCharacterLeft {
  /************
   * Internal *
   ************/

  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgCharacterLeftElement;

  /**
   * Sets an `id` attribute.
   * Needed by the input for accessibility `aria-decribedby`.
   */
  @Prop() identifier: string;

  /**
   * Sets the characters to count
   */
  @Prop() characters = '';

  /**
   * Add maximum length
   */
  @Prop() maxlength!: number;
  @Watch('maxlength')
  validateMaxlength(newValue: number): void {
    if (typeof newValue !== 'number') {
      throw new Error('<mg-character-left> prop "maxlength" is required.');
    }
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateMaxlength(this.maxlength);
    this.messages = initLocales(this.element).messages;
  }

  /**
   * Render component
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <span id={this.identifier} aria-live="polite">
        <span aria-hidden="true">
          {this.maxlength - this.characters.length}/{this.maxlength}
        </span>
        <span class="sr-only">{this.messages.nbCharLeft.replace('{counter}', this.maxlength - this.characters.length)}</span>
      </span>
    );
  }
}
