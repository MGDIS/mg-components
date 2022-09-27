import { Component, h, Prop, State, Element } from '@stencil/core';
import { createID, ClassList } from '../../../../utils/components.utils';
import { MgMenu } from '../mgMenu';
import { DisplayType } from '../mgMenu.conf';

@Component({
  tag: 'mg-menu-vertical',
  styleUrl: 'mg-menu-vertical.scss',
  shadow: true,
})
export class MgMenuVertical {
  private readonly display = DisplayType.VERTICAL;
  private readonly name = 'mg-menu-vertical';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMenuVerticalElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID(this.name);

  /**
   * Nav label. Include short nav description.
   * Required for accessibility
   */
  @Prop() label!: string;

  /**
   *
   */
  @Prop({ mutable: true }) isChild: boolean;

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList([this.name]);

  // private handleKeyboard = (event: KeyboardEvent & { target: HTMLElement }): void => {
  //   switch (event.code) {
  //     case "Escape":
  //       // this.element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
  //       break;
  //     default:
  //       console.log(event)
  //       break;
  //   }
  // }

  /*************
   * Lifecycle *
   *************/

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <MgMenu identifier={this.identifier} isChild={this.isChild} label={this.label} classList={this.classList} display={this.display}>
        <slot></slot>
      </MgMenu>
    );
  }
}
