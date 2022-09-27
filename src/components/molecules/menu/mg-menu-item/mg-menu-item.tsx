import { Component, h, Prop, State, Host, Watch, Element } from '@stencil/core';
import { createID, ClassList } from '../../../../utils/components.utils';
import { sizes, Status } from './mg-menu-item.conf';
import { BadgeType } from '../../../atoms/mg-badge/mg-badge.conf';

@Component({
  tag: 'mg-menu-item',
  styleUrl: 'mg-menu-item.scss',
  shadow: true,
})
export class MgMenuItem {
  /************
   * Internal *
   ************/

  private readonly name = 'mg-menu-item';

  /**
   * Get DOM element
   */
  private childMenu: HTMLMgMenuVerticalElement;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMenuItemElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID(this.name);

  /**
   *
   */
  @Prop() label!: string;

  /**
   *
   */
  @Prop() href: string;

  /**
   *
   */
  @Prop() badge: BadgeType & { variant?: string };

  /**
   *
   */
  @Prop() icon: string;

  /**
   *
   */
  @Prop({ mutable: true }) expanded = false;
  @Watch('expanded')
  validateexpanded(newValue: boolean): void {
    if (this.childMenu !== undefined) {
      if (newValue) this.childMenu.removeAttribute('hidden');
      else this.childMenu.setAttribute('hidden', '');
    }
  }

  /**
   *
   */
  @Prop({ mutable: true }) mgTabindex: number;

  /**
   *
   */
  @Prop() status: Status = Status.VISIBLE;
  @Watch('status')
  validateActive(newValue: Status): void {
    for (const status in Status) {
      this.navigationButtonClassList.delete(`${this.name}__navigation-button--${status}`);
    }
    this.navigationButtonClassList.add(`${this.name}__navigation-button--${newValue}`);
  }

  /**
   * Define tabs size
   */
  @Prop() size = 'large';
  @Watch('size')
  validateSize(newValue: string): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<${this.name}> prop "size" must be one of : ${sizes.join(', ')}`);
    }
    this.navigationButtonClassList.add(`${this.name}__navigation-button--size-${this.size}`);
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList([`${this.name}`]);

  /**
   * Component classes
   */
  @State() navigationButtonClassList: ClassList = new ClassList([`${this.name}__navigation-button`]);

  /**
   * Component parent tagname
   */
  @State() tagName = 'button';

  /**
   * Component parent tagname
   */
  @State() hasSubmenu = false;
  @State() hasNextMenuItem = false;
  @State() hasPreviousMenuItem = false;

  private getTagName = (): void => {
    this.tagName = this.href !== undefined ? 'a' : 'button';
  };

  private toggleExpanded = (): void => {
    this.expanded = !this.expanded;
  };

  private handleElementCLick = (): void => {
    this.toggleExpanded();
  };

  private initSubmenu = () => {
    this.childMenu = this.element.querySelector('mg-menu-vertical');
    this.hasSubmenu = this.childMenu !== null;
    if (this.hasSubmenu) {
      if (this.element.href !== undefined) {
        throw new Error(`<${this.name}> prop "href" is unauthorizied when element is a parent.`);
      }
      this.childMenu.setAttribute('hidden', '');
      this.childMenu.isChild = true;
    }
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
    this.validateSize(this.size);
    this.validateActive(this.status);
  }

  /**
   * Check if component slots are well configured on init
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    // manage sub-menu
    this.initSubmenu();

    this.hasNextMenuItem = this.element.nextElementSibling?.nodeName === 'MG-MENU-ITEM';
    this.hasPreviousMenuItem = this.element.previousElementSibling?.nodeName === 'MG-MENU-ITEM';

    // manage last menu item
    if (!this.hasNextMenuItem && this.hasPreviousMenuItem) {
      this.classList.add(`${this.name}--last`);
    }
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    const TagName = this.tagName;
    return (
      <Host id={this.identifier} role="menuitem" aria-haspopup={this.hasSubmenu.toString()} class={this.classList.join()}>
        <TagName
          href={this.href}
          class={this.navigationButtonClassList.join()}
          tabindex={this.mgTabindex}
          aria-expanded={this.expanded.toString()}
          aria-current={this.status === Status.ACTIVE && 'page'}
          onClick={this.handleElementCLick}
        >
          {this.icon !== undefined && <mg-icon icon={this.icon}></mg-icon>}
          {this.label}
          {this.badge !== undefined && <mg-badge variant={this.badge.variant || 'info'} value={this.badge.value} label={this.badge.label}></mg-badge>}
          {this.hasSubmenu && <mg-icon icon={`chevron-${this.expanded === true ? 'up' : 'down'}`}></mg-icon>}
        </TagName>
        <slot></slot>
      </Host>
    );
  }
}
