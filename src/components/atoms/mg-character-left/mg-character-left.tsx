import { Component, h, Prop, Watch } from '@stencil/core';
import { messages } from '../../../locales';

@Component({
  tag: 'mg-character-left',
  styleUrl: 'mg-character-left.scss',
  scoped: true,
})
export class MgCharacterLeft {
  /************
   * Internal *
   ************/

  private mustacheCounter = '{counter}';

  /**************
   * Decorators *
   **************/

  /**
   * Sets an `id` attribute.
   * Needed by the input for accessibility `aria-decribedby`.
   */
  @Prop() identifier: string;

  /**
   * Template to display remaining characters.
   * Must have {counter} inside
   */
  @Prop() template: string = messages.nbCharLeft;
  @Watch('template')
  validateTemplate(newValue: string): void {
    if (typeof newValue !== 'string' || newValue === '' || newValue.indexOf(this.mustacheCounter) === -1) {
      throw new Error(`<mg-character-left> prop "template" must contain "${this.mustacheCounter}".`);
    }
  }

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

  /**
   * Calculate number character left
   *
   * @returns {string} message
   */
  private getMessage = (): string => {
    return this.template.replace(this.mustacheCounter, `<strong>${this.maxlength - this.characters.length}</strong>`);
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateTemplate(this.template);
    this.validateMaxlength(this.maxlength);
  }

  /**
   * Render component
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return <span id={this.identifier} innerHTML={this.getMessage()} aria-live="polite"></span>;
  }
}
