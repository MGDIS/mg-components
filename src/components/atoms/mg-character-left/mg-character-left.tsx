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
   * Needed by the input for accessibility `arai-decribedby`.
   */
  @Prop() identifier: string;

  /**
   * Template to display remaining characters.
   * Must have {counter} inside
   */
  @Prop() template: string = messages.nbCharLeft;
  @Watch('template')
  validateTemplate(newValue: string) {
    if (typeof newValue !== 'string' || newValue === '' || newValue.indexOf(this.mustacheCounter) === -1) {
      throw new Error(`<mg-character-left> prop "template" must contain "${this.mustacheCounter}".`);
    }
  }

  /**
   * Sets the characters to count
   */
  @Prop() characters: string = '';

  /**
   * Add maximum length
   */
  @Prop() maxlength!: number;
  @Watch('maxlength')
  validateMaxlength(newValue: number) {
    if (typeof newValue !== 'number') {
      throw new Error('<mg-character-left> prop "maxlength" is required.');
    }
  }

  /**
   * Calculate number character left
   * @returns {string}
   */
  private getMessage = (): string => {
    return this.template.replace(this.mustacheCounter, `<strong>${this.maxlength - this.characters.length}</strong>`);
  };

  /*************
   * Lifecycle *
   *************/

  componentWillLoad() {
    this.validateTemplate(this.template);
    this.validateMaxlength(this.maxlength);
  }

  render() {
    return <span id={this.identifier} innerHTML={this.getMessage()} aria-live="polite"></span>;
  }
}
