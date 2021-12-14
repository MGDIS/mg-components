import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'mg-label',
  styleUrl: 'mg-label.scss',
  scoped: true,
})
export class MgLabel {

  /**
   * Label input id
   */
  @Prop() identifier!: string;

  /**
   * If input is required an asterisk is added at the end of the label
   */
  @Prop() required: boolean;

  /**
   * Add a colon punctuation after label text
   */
  @Prop() colon: boolean;

  /**
   * Switch from label to fieldset sementic
   */
  @Prop() isLegend: boolean = false;

  /**
   * Component parent tagname
   */
  @State() tagName: string = 'label';

  private getTagName () {
    this.tagName = this.isLegend ? 'legend' : 'label';
  }

    /*************
  * Lifecycle *
  *************/

  componentWillLoad() {
    // Check items format
    this.getTagName();
  }

  // \u00A0 represent a &nbsp;
  render() {
    const TagName = this.tagName;

    return (
      <TagName class="mg-label" htmlFor={this.identifier}>
        <slot></slot>
        { this.required && [`\u00A0`, <span class="is-asterisk">*</span>] }
        { this.colon && `\u00A0:` }
      </TagName>
    );
  }

}
