import { Component, Host, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'mg-character-left',
  styleUrl: 'mg-character-left.scss',
  scoped: true,
})
export class MgCharacterLeft {

  /**
   * Internal
   */
  private mustacheCounter = '{counter}';

  /**
   * Sets an `id` element.
   * Needed by the input for accessibility `arai-decribedby`.
   */
  @Prop() reference: string;

   /**
   * Template to display remaining characters.
   * Must have {counter} inside
   */
  @Prop() template: string = '{counter} caractères disponibles.';
  @Watch('template')
  validateTemplate(newValue: string) {
    if (typeof newValue !== 'string' || newValue === '' || newValue.indexOf(this.mustacheCounter) === -1) {
      throw new Error(`<mg-character-left> prop "template" must contain "${this.mustacheCounter}"`);
    };
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
      throw new Error('<mg-character-left> prop "maxlength" is required')
    };
  }

  /**
   * Calculate number character left
   * @returns {string}
   */
  private getMessage = () => {
    return this.template.replace(this.mustacheCounter, `<strong>${this.maxlength - this.characters.length}</strong>`)
  }

  /**
   * Check if props are well configured on init
   */
  componentWillLoad() {
    this.validateTemplate(this.template);
    this.validateMaxlength(this.maxlength);
  }

  /**
   * Render
   */
  render() {
    return (
      <Host>
        <p id={this.reference} innerHTML={this.getMessage()}></p>
      </Host>
    );
  }

}
