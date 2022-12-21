import { Component, h, Element, Fragment, Prop, Watch } from '@stencil/core';
import { MenuItemSizeType, sizes } from '../mg-menu-item/mg-menu-item.conf';
import { Direction } from '../mg-menu/mg-menu.conf';
import { initLocales } from '../../../../locales';
import { placements, PlacementType, InteractiveElementType, interactivesElements } from './mg-action-menu.conf';
import { OverflowBehavior, OverflowBehaviorElements } from '../../../../utils/behaviors.utils';

type MessageType = { moreLabel: string; badgeLabel: string };

@Component({
  tag: 'mg-action-menu',
  styleUrl: 'mg-action-menu.scss',
  shadow: true,
})
export class MgActionMenu {
  /************
   * Internal *
   ************/

  // constantes
  private readonly mgActionMenu = 'data-mg-action-menu';
  private readonly mgActionMenuInteractive = 'data-mg-action-menu-interactive';
  private readonly mgActionMenuContainer = 'data-mg-action-menu-container';
  private readonly mgActionMenuIcon = 'data-mg-action-menu-icon';
  private readonly mgActionMenuLabel = 'data-mg-action-menu-label';
  private readonly mgActionMenuBadge = 'data-mg-action-menu-badge';

  // variables
  private messages: MessageType;
  private mgActionMenuELement: HTMLElement;
  private mgActionMenuInteractiveElement: HTMLElement;
  private mgActionMenuContainerElement: HTMLElement;
  private overflowBehavior: OverflowBehavior;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgActionMenuElement;

  /**
   * Define the popover menu item size
   */
  @Prop() itemSize: MenuItemSizeType = sizes[0];

  /**
   * Define the popover menu item size
   */
  @Prop({ reflect: true }) placement: PlacementType = placements[0];
  @Watch('placement')
  validatePlacement(newValue: MgActionMenu['placement']): void {
    if (!placements.includes(newValue)) {
      throw new Error(`<mg-action-menu> prop "interactiveElement" must be one off: ${placements.join(',')}.`);
    }
  }

  /**
   * Define interactive element
   * ex: mg-button, mg-menu-item.
   * default: 'mg-button'
   */
  @Prop() interactiveElement: InteractiveElementType = interactivesElements[0];
  @Watch('interactiveElement')
  validateInteractiveElement(newValue: MgActionMenu['interactiveElement']): void {
    if (!interactivesElements.includes(newValue)) {
      throw new Error(`<mg-action-menu> prop "interactiveElement" must be one off: ${interactivesElements.join(',')}.`);
    }
  }

  /************
   * Methods *
   ************/

  /**
   * Render mg-action-menu button element
   * <container>
   *  <item data-mg-action-base-index="0"/>
   *  <item data-mg-action-menu hidden="true|false">
   *   <mg-icon icon="ellipsis-vertical"></mg-icon>
   *   <mg-menu direction="vertical" label="Additional menu">
   *     <item data-mg-action-menu-proxy-index="0" hidden="true|false" />
   *   </mg-menu>
   *  </item>
   * </container>
   *
   * @returns {HTMLElement}
   */
  private renderMgActionMenuELement = (): HTMLElement => {
    // mg-action-menu element
    this.mgActionMenuELement = this.element.querySelector(`[${this.mgActionMenu}]`);
    if (this.mgActionMenuELement === null) {
      this.mgActionMenuELement = document.createElement(this.interactiveElement === 'mg-menu-item' ? 'mg-menu-item' : 'mg-popover');
      this.mgActionMenuELement.setAttribute(this.mgActionMenu, '');
    }
    this.mgActionMenuELement.setAttribute('hidden', '');

    // mg-action-menu interactive element
    if (this.interactiveElement === 'mg-menu-item') {
      this.mgActionMenuELement.setAttribute('size', this.element.querySelector('mg-menu-item').size);
      this.mgActionMenuInteractiveElement = this.mgActionMenuELement;
    } else {
      this.mgActionMenuInteractiveElement = this.element.querySelector(`[${this.mgActionMenuInteractive}]`);
      if (this.mgActionMenuInteractiveElement === null) {
        this.renderInteractiveElement(this.mgActionMenuELement);
      }
    }

    // mg-action-menu container element
    this.mgActionMenuContainerElement = this.element.querySelector(`[${this.mgActionMenuContainer}]`);
    if (this.mgActionMenuContainerElement === null) {
      this.renderContainerElement(this.mgActionMenuELement);
      this.mgActionMenuContainerElement = this.mgActionMenuELement.querySelector(`[${this.mgActionMenuContainer}]`);
    }

    // mg-icon
    if (this.mgActionMenuInteractiveElement.querySelector(`[${this.mgActionMenuIcon}]`) === null) {
      this.renderMgIcon(this.mgActionMenuInteractiveElement);
    }

    // label
    if (this.mgActionMenuInteractiveElement.querySelector(`[${this.mgActionMenuLabel}]`) === null) {
      this.renderMgLabel(this.mgActionMenuInteractiveElement);
    }

    // mg-menu
    if (this.mgActionMenuContainerElement.querySelector('mg-menu') === null) {
      this.renderMgMenu();
    }

    // mg-badge
    if (this.mgActionMenuInteractiveElement.querySelector(`[${this.mgActionMenuBadge}]`) === null) {
      this.renderMgBadge(this.mgActionMenuInteractiveElement, this.mgActionMenuContainerElement.querySelector('mg-menu'));
    }

    this.element.appendChild(this.mgActionMenuELement);

    return this.mgActionMenuELement;
  };

  private isInMenuItem = () => this.interactiveElement === 'mg-menu-item';

  private renderInteractiveElement(mgActionMenuELement: Element) {
    this.mgActionMenuInteractiveElement = document.createElement(this.interactiveElement);
    if (this.interactiveElement === 'mg-button') {
      this.mgActionMenuInteractiveElement.setAttribute('variant', 'secondary');
    }
    mgActionMenuELement.appendChild(this.mgActionMenuInteractiveElement);
  }

  private renderContainerElement(mgActionMenuELement: Element) {
    this.mgActionMenuContainerElement = document.createElement(this.interactiveElement === 'mg-menu-item' ? 'mg-menu' : 'div');
    if (this.interactiveElement === 'mg-menu-item') {
      this.mgActionMenuContainerElement.setAttribute('label', this.messages.moreLabel);
      this.mgActionMenuContainerElement.setAttribute('direction', 'vertical');
    } else {
      this.mgActionMenuContainerElement.setAttribute('slot', 'content');
    }
    this.mgActionMenuContainerElement.setAttribute(this.mgActionMenuContainer, '');
    mgActionMenuELement.appendChild(this.mgActionMenuContainerElement);
  }

  private renderMgBadge(mgActionMenuInteractiveElement: Element, plusMenu: Element) {
    const mgBadge = document.createElement('mg-badge');
    mgBadge.setAttribute(this.mgActionMenuBadge, '');
    mgBadge.setAttribute('label', this.messages.badgeLabel);
    mgBadge.setAttribute('value', '!');
    mgBadge.setAttribute('hidden', '');

    if (this.isInMenuItem()) mgBadge.setAttribute('slot', 'information');

    if (mgActionMenuInteractiveElement) mgActionMenuInteractiveElement.appendChild(mgBadge);
    else this.mgActionMenuELement.insertBefore(mgBadge, plusMenu);
  }

  private renderMgIcon(mgActionMenuInteractiveElement: Element) {
    const mgIcon = document.createElement('mg-icon');
    mgIcon.setAttribute(this.mgActionMenuIcon, '');
    mgIcon.setAttribute('icon', 'ellipsis-vertical');

    if (this.isInMenuItem()) mgIcon.setAttribute('slot', 'image');

    mgActionMenuInteractiveElement.appendChild(mgIcon);
  }

  private renderMgLabel(mgActionMenuInteractiveElement: Element) {
    const label = document.createElement('span');
    label.setAttribute(this.mgActionMenuLabel, '');
    label.classList.add('sr-only');
    label.textContent = this.messages.moreLabel;

    if (this.isInMenuItem()) label.setAttribute('slot', 'label');

    mgActionMenuInteractiveElement.appendChild(label);
  }

  private renderMgMenu() {
    const plusMenu = document.createElement('mg-menu');
    plusMenu.setAttribute('direction', Direction.VERTICAL);
    plusMenu.setAttribute('label', this.messages.moreLabel);
    Array.from(this.element.children).forEach((element, index) => {
      if (element.getAttribute(this.mgActionMenu) === null) {
        element.setAttribute(OverflowBehaviorElements.BASE_INDEX, `${index}`);
        this.renderMgMenuItem(element.textContent, index, plusMenu);
      }
    });

    this.mgActionMenuContainerElement.appendChild(plusMenu);
  }

  private renderMgMenuItem = (label: string, index: number, plusMenu: Element): void => {
    const menuItem = document.createElement('mg-menu-item');
    menuItem.setAttribute('size', this.itemSize);
    menuItem.setAttribute('hidden', '');
    menuItem.setAttribute(OverflowBehaviorElements.PROXY_INDEX, `${index}`);

    const itemLabel = document.createElement('span');
    itemLabel.setAttribute('slot', 'label');
    itemLabel.textContent = label;
    menuItem.appendChild(itemLabel);
    (this.interactiveElement === 'mg-menu-item' ? this.mgActionMenuContainerElement : plusMenu).appendChild(menuItem);

    menuItem.addEventListener('click', event => {
      event.preventDefault();
      this.element.querySelector(`[${OverflowBehaviorElements.PROXY_INDEX}="${index}"]`).dispatchEvent(new CustomEvent('click', { bubbles: true }));
    });
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Validate props
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.messages = initLocales(this.element).messages.plusMenu;
    this.validateInteractiveElement(this.interactiveElement);
    this.validatePlacement(this.placement);
  }

  /**
   * init mg-action-menu
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    this.overflowBehavior = new OverflowBehavior(this.element, this.renderMgActionMenuELement);
    this.overflowBehavior.init();
  }

  disconnectedCallback() {
    this.overflowBehavior.disconnect();
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <Fragment>
        <slot></slot>
      </Fragment>
    );
  }
}
