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
  @Prop() isLegend = false;

  /**
   * Component parent tagname
   */
  @State() tagName = 'label';

  private getTagName = (): void => {
    this.tagName = this.isLegend ? 'legend' : 'label';
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Init tag name
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.getTagName();
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    const TagName = this.tagName;
    // \u00A0 represent a &nbsp;
    return (
      <TagName class="mg-input-title" htmlFor={this.isLegend ? undefined : this.identifier}>
        <slot></slot>
        {this.required && (
          <span class="mg-input-title__required">
            &nbsp;<span class="is-asterisk">*</span>
          </span>
        )}
      </TagName>
    );
  }
}
