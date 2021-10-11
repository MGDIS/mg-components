import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mg-label',
  styleUrl: 'mg-label.scss',
  scoped: true,
})
export class MgLabel {

  /**
   * Internal
   */
  private classes = ['mg-label'];

  /**
   * Label input reference
   * To match for/id
   */
  @Prop() reference: string;

  /**
   * If input is required an asterisk is added at the end of the label
   */
  @Prop() required: boolean;

  /**
   * Add a colon punctuation after label text
   */
   @Prop() colon: boolean;

  /**
   * Render
   */
  render() {
    return (
      <label class={this.classes.join(' ')} htmlFor={this.reference}>
        <slot></slot>
        { this.required && <span aria-hidden="true">&nbsp;*</span> }
        { this.colon && `\u00A0:` /* represent a &nbsp; */ }
      </label>
    );
  }

}
