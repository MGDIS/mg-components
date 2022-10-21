import { Component, h, Prop, State } from '@stencil/core';
import { ClassList } from '../../../utils/components.utils';

@Component({
  tag: 'mg-divider',
  styleUrl: 'mg-divider.scss',
  shadow: true,
})
export class MgDivider {
  /**************
   * Decorators *
   **************/

  /**
   * Define component size
   */
  @Prop() size: 'regular' | 'full' = 'regular';

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-badge']);

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <div
        class={{
          'mg-divider': true,
          'mg-divider--full': this.size === 'full',
        }}
      ></div>
    );
  }
}
