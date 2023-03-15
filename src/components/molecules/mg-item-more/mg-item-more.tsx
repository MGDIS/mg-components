import { Component, h, Prop, Element, Host, Watch, State } from '@stencil/core';
import { initLocales } from '../../../locales';
import { OverflowBehavior } from '../../../utils/behaviors.utils';
import { Direction } from '../menu/mg-menu/mg-menu.conf';
import type { IconType, MessageType, SizeType, SlotLabelType } from './mg-item-more.conf';

@Component({
  tag: 'mg-item-more',
  styleUrl: 'mg-item-more.scss',
  shadow: true,
})
export class MgItemMore {
  /************
   * Internal *
   ************/
  private readonly name = 'mg-item-more';
  private messages: MessageType;
  private menuItems: HTMLMgMenuItemElement[];
  private overflowBehavior: OverflowBehavior;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgItemMoreElement;

  /**
   * Define icon
   * Default: {icon: 'ellipsis-vertical'}
   */
  @Prop() icon: IconType = { icon: 'ellipsis-vertical' };
  @Watch('icon')
  validateIcon(newValue: MgItemMore['icon']): void {
    if (typeof newValue !== 'object' || (typeof newValue === 'object' && typeof (newValue as MgItemMore['icon']).icon !== 'string'))
      throw new Error(`<${this.name}> prop "icon" must match MgItemMore['icon'] type.`);
  }

  /**
   * Define slot label element
   * Default: {display: false}
   */
  @Prop() slotlabel: SlotLabelType = { display: false };
  @Watch('slotlabel')
  validateSlotLabel(newValue: MgItemMore['slotlabel']): void {
    if (typeof newValue !== 'object' || (typeof newValue === 'object' && typeof newValue.display !== 'boolean'))
      throw new Error(`<${this.name}> prop "slotlabel" must match MgItemMore['slotlabel'] type.`);
    else if (typeof newValue.label !== 'string') this.slotlabel.label = this.messages.moreLabel;
  }

  /**
   * Define component child menu size.
   */
  @Prop() size: SizeType;
  @Watch('size')
  validateSize(newValue: MgItemMore['size']): void {
    if (newValue && typeof newValue !== 'string') throw new Error(`<${this.name}> prop "size" must match MgItemMore['size'] type.`);
  }

  /**
   * Define component parent menu.
   */
  @State() parentMenu: HTMLMgMenuElement;

  /***********
   * Methods *
   ***********/

  /**
   * render mg-item-more overflow element
   *
   * @returns {HTMLMgItemMoreElement} mg-item-more element
   */
  private renderMgMenuItemOverflowElement = (): HTMLMgItemMoreElement => {
    // create menu items proxy element from item clones
    const moreElementMenuItem = this.element.shadowRoot.querySelector('mg-menu-item');
    this.menuItems.forEach((child: HTMLMgMenuItemElement) => {
      moreElementMenuItem.querySelector('mg-menu').appendChild(child.cloneNode(true));
    });

    const allMenuItem = Array.from(this.parentMenu.querySelectorAll('mg-menu-item:not([data-overflow-more])'));

    Array.from(moreElementMenuItem.querySelectorAll('mg-menu-item:not([data-overflow-more])')).forEach((proxy, index) => {
      // manage click on proxy to mirror it on initial element
      proxy.addEventListener('click', () => {
        (allMenuItem[index].shadowRoot.querySelector('a') || allMenuItem[index].shadowRoot.querySelector('button')).dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // add id suffix to prevent duplicate key. default html id is: '';
      if (proxy.id.trim() !== '') proxy.id = `${proxy.id}-proxy`;

      // manage status change miror in proxy
      allMenuItem[index].addEventListener('status-change', (event: CustomEvent) => {
        proxy.setAttribute('status', event.detail);
      });
    });

    return this.element;
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Disconnect overflow ResizeObserver
   *
   * @returns {void} run overflow resize obeserver disconnexion
   */
  disconnectedCallback(): void {
    this.overflowBehavior.disconnect();
  }

  /**
   * Set variables and validate props
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    // init variables
    this.messages = (initLocales(this.element).messages as { plusMenu: MessageType }).plusMenu;
    this.parentMenu = this.element.closest('mg-menu');
    this.menuItems = Array.from(this.parentMenu.children).filter(item => item.nodeName === 'MG-MENU-ITEM') as HTMLMgMenuItemElement[];

    // validate props
    this.validateIcon(this.icon);
    this.validateSlotLabel(this.slotlabel);
    this.validateSize(this.size);
  }

  /**
   * Add overflow behavior
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    this.overflowBehavior = new OverflowBehavior(this.parentMenu, this.renderMgMenuItemOverflowElement);
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <Host role="menuitem" aria-haspopup="true">
        <mg-menu-item data-overflow-more data-size={this.parentMenu.size}>
          <mg-icon icon={this.icon.icon} slot="image"></mg-icon>
          <span class={{ 'sr-only': !this.slotlabel.display }} slot="label">
            {this.slotlabel.label}
          </span>
          <mg-menu direction={Direction.VERTICAL} label={this.messages.moreLabel} size={this.size}></mg-menu>
        </mg-menu-item>
      </Host>
    );
  }
}
