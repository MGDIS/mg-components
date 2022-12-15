import { Component, h, Element, Fragment, Prop, Watch } from '@stencil/core';
import { MenuItemSizeType, sizes } from '../../components/molecules/menu/mg-menu-item/mg-menu-item.conf';
import { Direction } from '../../components/molecules/menu/mg-menu/mg-menu.conf';
import { initLocales } from '../../locales';
import { placements, PlacementType, InteractiveElementType, interactivesElements } from './mg-action-menu.conf';

type UpdateDisplayedItemsReducerType = { accWidth: number; hiddenItems: HTMLMgMenuItemElement[]; visibleItems: HTMLMgMenuItemElement[] };
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
  private readonly mgActionMenuContainer = 'data-mg-action-menu-container';
  private readonly mgActionMenuIcon = 'data-mg-action-menu-icon';
  private readonly mgActionMenuLabel = 'data-mg-action-menu-label';
  private readonly mgActionMenuBadge = 'data-mg-action-menu-badge';
  private readonly mgActionMenuBaseIndex = 'data-mg-action-menu-base-index';
  private readonly mgActionMenuProxyIndex = 'data-mg-action-menu-proxy-index';

  // variables
  private messages: MessageType;
  private resizeObserver: ResizeObserver;
  private container: HTMLElement;
  private mgActionMenuELement: HTMLElement;
  private mgActionMenuInteractiveElement: HTMLElement;

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
   * @returns {void}
   */
  private renderMgActionMenuELement(): void {
    // mg-action-menu element
    this.mgActionMenuELement = this.element.querySelector(`[${this.mgActionMenu}]`);
    if (this.mgActionMenuELement === null) {
      this.mgActionMenuELement = document.createElement('mg-popover');
      this.mgActionMenuELement.setAttribute(this.mgActionMenu, '');
    }
    this.mgActionMenuELement.setAttribute('hidden', '');

    // mg-action-menu interactive element
    this.mgActionMenuInteractiveElement = this.element.querySelector('[data-mg-action-menu-interactive]');
    if (this.mgActionMenuInteractiveElement === null) {
      this.renderInteractiveElement(this.mgActionMenuELement);
    }

    // mg-action-menu container element
    let mgActionMenuContainerElement = this.element.querySelector(`[${this.mgActionMenuContainer}]`);
    if (mgActionMenuContainerElement === null) {
      this.renderContainerElement(this.mgActionMenuELement);
      mgActionMenuContainerElement = this.mgActionMenuELement.querySelector(`[${this.mgActionMenuContainer}]`);
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
    if (mgActionMenuContainerElement.querySelector('mg-menu') === null) {
      this.renderMgMenu(mgActionMenuContainerElement);
    }

    // mg-badge
    if (this.mgActionMenuInteractiveElement.querySelector(`[${this.mgActionMenuBadge}]`) === null) {
      this.renderMgBadge(this.mgActionMenuInteractiveElement, mgActionMenuContainerElement.querySelector('mg-menu'));
    }

    this.container.appendChild(this.mgActionMenuELement);
  }

  private isInMenuItem = () => this.interactiveElement === 'mg-menu-item';

  private renderInteractiveElement(mgActionMenuELement: Element) {
    this.mgActionMenuInteractiveElement = document.createElement(this.interactiveElement);
    if (this.interactiveElement === 'mg-button') {
      this.mgActionMenuInteractiveElement.setAttribute('variant', 'secondary');
    }
    mgActionMenuELement.appendChild(this.mgActionMenuInteractiveElement);
  }

  private renderContainerElement(mgActionMenuELement: Element) {
    const mgActionMenuContainerElement = document.createElement('div');
    mgActionMenuContainerElement.setAttribute(this.mgActionMenuContainer, '');
    mgActionMenuContainerElement.setAttribute('slot', 'content');
    mgActionMenuELement.appendChild(mgActionMenuContainerElement);
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

    if (this.isInMenuItem()) mgIcon.setAttribute('slot', 'illustration');

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

  private renderMgMenu(mgActionMenuContainerElement: Element) {
    const plusMenu = document.createElement('mg-menu');
    plusMenu.setAttribute('direction', Direction.VERTICAL);
    plusMenu.setAttribute('label', this.messages.moreLabel);
    Array.from(this.container.children).forEach((element, index) => {
      if (!this.isMgActionMenuElement(element)) {
        element.setAttribute(this.mgActionMenuBaseIndex, `${index}`);
        this.renderMgMenuItem(plusMenu, element.textContent, index);
      }
    });

    mgActionMenuContainerElement.appendChild(plusMenu);
  }

  private renderMgMenuItem = (mgActionMenuContainerElement: Element, label: string, index: number): void => {
    const menuItem = document.createElement('mg-menu-item');
    menuItem.setAttribute('size', this.itemSize);
    menuItem.setAttribute('hidden', '');
    menuItem.setAttribute(this.mgActionMenuProxyIndex, `${index}`);

    const itemLabel = document.createElement('span');
    itemLabel.setAttribute('slot', 'label');
    itemLabel.textContent = label;
    menuItem.appendChild(itemLabel);
    mgActionMenuContainerElement.appendChild(menuItem);

    menuItem.addEventListener('click', event => {
      event.preventDefault();
      this.element.querySelector(`[${this.mgActionMenuBaseIndex}="${index}"]`).dispatchEvent(new CustomEvent('click', { bubbles: true }));
    });
  };

  /**
   * run mg-action-menu behavior
   *
   * @param {number} width
   */
  private run = (width: number): void => {
    if (!this.mgActionMenuELement) this.renderMgActionMenuELement();
    this.updateDisplayedItems(width);

    // toggle mg-badge
    // const mgActionMenuBadge = this.element.querySelector(`[${this.mgActionMenuBadge}]`);
    // this.toggleElement(mgActionMenuBadge, this.mgActionMenuELement.querySelector(`[${this.mgActionMenuProxyIndex}]:not([hidden]) mg-badge`) === null);
  };

  /**
   * Toggle display item element
   *
   * @param {HTMLElement} item item to control
   * @param {boolean} isHidden is item hidden
   * @returns {void}
   */
  private toggleItem = (item: HTMLElement, isHidden: boolean): void => {
    const mgActionMenuindex = Number(item.getAttribute(this.mgActionMenuBaseIndex));
    if (this.isMgActionMenuElement(item)) this.toggleElement(this.mgActionMenuELement, isHidden);
    if (mgActionMenuindex) {
      this.toggleElement(item, isHidden);
      this.toggleElement(this.mgActionMenuELement.querySelector(`[${this.mgActionMenuProxyIndex}="${mgActionMenuindex}"]`), !isHidden);
    }
  };

  /**
   * Toggle element's hidde attribute
   *
   * @param {Element} element element to toggle
   * @param {boolean} isHidden element is hidden
   * @returns {void}
   */
  private toggleElement = (element: Element, isHidden: boolean): void => {
    if (isHidden) element.setAttribute('hidden', '');
    else element.removeAttribute('hidden');
  };

  /**
   * Utility method to know if a given element is the mg-action-menu element
   *
   * @param {Element} element element to match with mg-action-menu
   * @returns {boolean}
   */
  private isMgActionMenuElement = (element: Element): boolean => element.getAttribute('data-mg-action-menu') !== null;

  /**
   * Utility method to know if item overflow partialy or totaly in the container
   *
   * @param {number} cumulateWidth previous sibling elements cumulate width + item width
   * @param {HTMLElement} item item HTML element
   * @param {number} availableWidth container available width
   * @returns {boolean}
   */
  private isOverflowElement = (cumulateWidth: number, item: HTMLElement, availableWidth: number): boolean => {
    if (item.previousElementSibling === null) return false;
    else if (this.isMgActionMenuElement(item)) return false;
    else if (item.previousElementSibling !== null && item.nextElementSibling !== null && !this.isMgActionMenuElement(item.nextElementSibling))
      return cumulateWidth + this.mgActionMenuInteractiveElement.offsetWidth > availableWidth;
    else return cumulateWidth > availableWidth;
  };

  /**
   * Update displayed items in container from a given available space
   *
   * @param {number} availableWidth available width in container to display child items
   * @returns {void}
   */
  private updateDisplayedItems = (availableWidth: number): void => {
    const items = Array.from(this.container.children);
    items.forEach(item => item.removeAttribute('hidden'));
    const { hiddenItems, visibleItems }: UpdateDisplayedItemsReducerType = items.reduce(
      (acc, curr: HTMLMgMenuItemElement) => {
        acc.accWidth += curr.offsetWidth;
        // if item has an overflow wee hidde it
        if (this.isOverflowElement(acc.accWidth, curr, availableWidth)) {
          acc.hiddenItems = [...acc.hiddenItems, curr];
        } else if (this.isMgActionMenuElement(curr) && acc.hiddenItems.length < 1) {
          // if current item is mg-action-menu and have NOT hidden items, mg-action-menu is an hidden item
          acc.hiddenItems = [...acc.hiddenItems, curr];
        } else acc.visibleItems = [...acc.visibleItems, curr];
        return acc;
      },
      { accWidth: 0, hiddenItems: [], visibleItems: [] },
    );

    hiddenItems.forEach(item => {
      this.toggleItem(item, true);
    });
    visibleItems.forEach(item => {
      this.toggleItem(item, false);
    });
  };

  private initMgActionMenu = (): void => {
    this.container = Array.from(this.element.children).find(element => element.nodeName.toLocaleLowerCase().includes('button'))
      ? this.element
      : (this.element.firstElementChild as HTMLElement);

    if (!this.resizeObserver) {
      // add resize observer
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          this.run(entry.contentRect.width);
        });
      });
      this.resizeObserver.observe(this.element);
    }
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
   * Check if component slots configuration
   *
   * @returns {ReturnType<typeof setTimeout>} timeout
   */
  componentDidLoad(): ReturnType<typeof setTimeout> {
    // update props and states after componentDidLoad hook
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      // init mg-action-menu
      this.initMgActionMenu();
    }, 0);
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
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
