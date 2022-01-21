import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'mg-input-title',
  styleUrl: 'mg-input-title.scss',
  scoped: true,
})
export class MgInputTitle {
  /**
   * Label input id
   */
  @Prop() identifier!: string;

  /**
   * If input is required an asterisk is added at the end of the label
   */
  @Prop() required: boolean;

  /**
   * Switch from label to fieldset sementic
   */
  @Prop() isLegend: boolean = false;

  /**
   * Component parent tagname
   */
  @State() tagName: string = 'label';

  private getTagName() {
    this.tagName = this.isLegend ? 'legend' : 'label';
  }

  /*************
   * Lifecycle *
   *************/

  componentWillLoad() {
    // Init tag name
    this.getTagName();
  }

  // \u00A0 represent a &nbsp;
  render() {
    const TagName = this.tagName;

    return (
      <TagName class="mg-input-title" htmlFor={this.identifier}>
        <slot></slot>
        {this.required && [`\u00A0`, <span class="is-asterisk">*</span>]}
      </TagName>
    );
  }
}
