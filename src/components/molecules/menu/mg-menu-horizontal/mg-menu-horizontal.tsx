import { Component, h, Prop, State, Element, Watch } from '@stencil/core';
import { createID, ClassList } from '../../../../utils/components.utils';
import { Status } from '../mg-menu-item/mg-menu-item.conf';
import { MgMenu } from '../mgMenu';
import { DisplayType, Keys } from '../mgMenu.conf';

@Component({
  tag: 'mg-menu-horizontal',
  styleUrl: 'mg-menu-horizontal.scss',
  shadow: true,
})
export class MgMenuHorizontal {
  private readonly name = 'mg-menu-horizontal';
  private readonly display = DisplayType.HORIZONTAL;
  private appsMenuItems: HTMLMgMenuItemElement[];
  // private subMenuItems: HTMLMgMenuItemElement[];

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMenuHorizontalElement;

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
   * Component classes
   */
  @State() classList: ClassList = new ClassList([this.name]);

  @State() activeMenuItem: number;
  @Watch('activeMenuItem')
  validateActiveMenuItem(newValue: number, oldValue: number): void {
    if (newValue !== oldValue) {
      // reset expeanded on previous active menu item asynchronously
      this.appsMenuItems.forEach(element => {
        element.expanded = false;
      });

      // run focus on new active menu item
      this.appsMenuItems[this.activeMenuItem].shadowRoot.querySelector('button').focus();
    }
  }

  /**
   * Method to stupdate active menu item value
   *
   * @param {HTMLMgMenuItemElement} target event target item menu element trigger element
   * @param {'inc'| 'dec'} operator operator for newValue calcul
   * @param {number} nextItem  knwon next item
   * @returns {void}
   */
  private setActiveMenuItem = (target: HTMLMgMenuItemElement, operator: 'inc' | 'dec', nextItem?: number): void => {
    const currentIndex = nextItem || Number(target.getAttribute('data-index'));
    const newValue = operator === 'inc' ? currentIndex + 1 : currentIndex - 1;

    if (newValue === this.appsMenuItems.length) {
      this.activeMenuItem = 0;
    } else if (newValue < 0) {
      this.activeMenuItem = this.appsMenuItems.length - 1;
    } else if ([Status.ACTIVE, Status.VISIBLE].includes(this.appsMenuItems[newValue].status)) {
      // apply next item focus only for [ACTIVE|VISIBLE] status
      this.activeMenuItem = newValue;
    } else {
      // recurrive fallback to set new active menu item
      this.setActiveMenuItem(target, operator, newValue);
    }
  };

  // private gotoSubIndex = (menu, index):number => {
  //   const items = menu.querySelectorAll('mg-menu-item');
  //   if (index === items.length) index = 0;
  //   else if (index < 0) index = items.length - 1;
  //   items[index].focus();
  //   return index;
  // }

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

  private initMenuItems() {
    this.appsMenuItems = Array.from(this.element.querySelectorAll(`#${this.identifier} > mg-menu-item`));

    this.appsMenuItems[0].shadowRoot.querySelector('button').addEventListener('focusin', () => {
      this.activeMenuItem = 0;
    });

    this.appsMenuItems.forEach((item, index) => {
      item.setAttribute('data-index', `${index}`);
      item.mgTabindex = index === 0 ? 0 : -1;

      item.addEventListener('keydown', (event: KeyboardEvent & { target: HTMLMgMenuItemElement }) => {
        let prevdef = false;
        const interactiveTargetElement = event.target.shadowRoot.querySelector('button');

        switch (event.code) {
          case Keys.RIGHT:
            this.setActiveMenuItem(event.target, 'inc');
            prevdef = true;
            break;
          case Keys.LEFT:
            this.setActiveMenuItem(event.target, 'dec');
            prevdef = true;
            break;
          case Keys.DOWN:
            const childMenu = event.target.querySelector(`#${event.target.id} > mg-menu-vertical`);
            if (childMenu !== null && event.target.expanded === false) {
              interactiveTargetElement.click();
              childMenu.querySelector('mg-menu-item').shadowRoot.querySelector('button').focus();
            }
            prevdef = true;
            break;
          case Keys.UP:
            const parentMenuItem = event.target.parentElement.closest('mg-menu-item');
            const index = Number(event.target.getAttribute('data-index'));
            if (parentMenuItem?.expanded === true && index === 0) {
              parentMenuItem.click();
            }
            prevdef = true;
            break;
          case Keys.ESC:
            debugger;
            interactiveTargetElement.blur();
            prevdef = true;
            break;
        }

        if (prevdef) event.preventDefault();
      });
    });
    // this.subMenuItems = Array.from(this.element.querySelectorAll(`#${this.identifier} > mg-menu-item > mg-menu-item`))
  }

  /*************
   * Lifecycle *
   *************/

  componentDidLoad(): void {
    this.initMenuItems();
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <MgMenu identifier={this.identifier} label={this.label} classList={this.classList} display={this.display}>
        <slot></slot>
      </MgMenu>
    );
  }
}
