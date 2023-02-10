import { Status } from '../components/molecules/menu/mg-menu-item/mg-menu-item.conf';

/**
 * MgMenuItem type guard
 *
 * @param {HTMLElement} element element to control type
 * @returns {boolean} truthy if element is mg-menu-item
 */
const isMgMenuItem = (element: HTMLElement): element is HTMLMgMenuItemElement => element.nodeName === 'MG-MENU-ITEM';

export enum OverflowBehaviorElements {
  MORE = 'data-overflow-more',
  BASE_INDEX = 'data-overflow-base-index',
  PROXY_INDEX = 'data-overflow-proxy-index',
}

export class OverflowBehavior {
  // variables
  private resizeObserver: ResizeObserver;
  private moreELement: HTMLElement;
  private children: Element[];

  constructor(private element: Element, private render: () => HTMLElement) {
    if (this.resizeObserver === undefined) {
      // add resize observer
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          this.run(entry.contentRect.width);
        });
      });
      this.resizeObserver.observe(this.element);
    }
  }

  /**********
   * Public *
   **********/

  /**
   * Disconnect ResizeObserver
   *
   * @returns {void}
   */
  public disconnect = (): void => {
    this.resizeObserver.disconnect();
  };

  /**
   * Update more element status if active child
   *
   * @returns {void}
   */
  public updateActiveStatus = (): void => {
    const hasActiveChild = Array.from(this.moreELement.querySelector('mg-menu').children).some(
      element => element.nodeName === 'MG-MENU-ITEM' && element.getAttribute('status') === Status.ACTIVE && element.getAttribute('hidden') === null,
    );

    this.moreELement.setAttribute('status', hasActiveChild ? Status.ACTIVE : Status.VISIBLE);
  };

  /************
   * Internal *
   ************/

  /**
   * run overflow behavior
   *
   * @param {number} width width of the container
   * @returns {void}
   */
  private run = (width: number): void => {
    if (this.moreELement === undefined) {
      // set moreElement
      this.moreELement = this.render();
      this.moreELement.setAttribute(OverflowBehaviorElements.MORE, '');

      // set children
      this.children = Array.from(this.element.children);
      let moreELementChildren;
      const allowedElements = ['MG-MENU-ITEM', 'MG-BUTTON'];
      if (isMgMenuItem(this.moreELement)) {
        moreELementChildren = Array.from(this.moreELement.querySelector('mg-menu').children).filter(element => allowedElements.includes(element.nodeName));
      }

      this.children.forEach((child, index) => {
        child.setAttribute(OverflowBehaviorElements.BASE_INDEX, `${index}`);
        if (child.getAttribute(OverflowBehaviorElements.MORE) === null) {
          // set moreElement children
          moreELementChildren[index].setAttribute(OverflowBehaviorElements.PROXY_INDEX, `${index}`);
        }
      });
    }

    this.updateDisplayedItems(width);
    if (isMgMenuItem(this.moreELement)) this.updateActiveStatus();
  };

  /**
   * Update displayed items in container from a given available space
   *
   * @param {number} availableWidth available width in container to display child items
   * @returns {void}
   */
  private updateDisplayedItems = (availableWidth: number): void => {
    this.restoreItems();
    const acc = { accWidth: 0, previousItem: null };
    this.children.forEach((child: HTMLMgMenuItemElement) => {
      acc.accWidth += child.offsetWidth;
      const isPreviousItemHidden = acc.previousItem !== null && acc.previousItem.getAttribute('hidden') !== null;
      // if previous item is hidden AND is NOT more element we hidde current
      // OR if item has an overflow we hidde current
      // OR if current item is more element AND have NOT previous hidden items, current more element item is an hidden item
      // ELSE current is a display item
      this.toggleItem(
        child,
        (isPreviousItemHidden && !this.isMoreElement(child)) || this.isOverflowElement(acc.accWidth, child, availableWidth) || (this.isMoreElement(child) && !isPreviousItemHidden),
      );

      // update previous item with current item
      acc.previousItem = child;
    });
  };

  /**
   * Utility method to know if item overflow partialy or totaly in the container
   *
   * @param {number} cumulateWidth previous sibling elements cumulate width + item width
   * @param {HTMLElement} item item HTML element
   * @param {number} availableWidth container available width
   * @returns {boolean} truthy if element is overflow
   */
  private isOverflowElement = (cumulateWidth: number, item: HTMLElement, availableWidth: number): boolean => {
    if (item.previousElementSibling === null || this.isMoreElement(item)) return false;
    else if (!this.isMoreElement(item.nextElementSibling)) return cumulateWidth + this.moreELement.offsetWidth > availableWidth;
    else return cumulateWidth > availableWidth;
  };

  /**
   * Utility method to know if a given element is the 'MORE' element
   *
   * @param {Element} element element to match with 'MORE' element
   * @returns {boolean} truthy if element is the 'MORE' element
   */
  private isMoreElement = (element: Element): boolean => element.getAttribute(OverflowBehaviorElements.MORE) !== null;

  /**
   * Toggle display item element
   *
   * @param {HTMLElement} item item to control
   * @param {boolean} isHidden is item hidden
   * @returns {void}
   */
  private toggleItem = (item: HTMLElement, isHidden: boolean): void => {
    const mgActionMenuindex = Number(item.getAttribute(OverflowBehaviorElements.BASE_INDEX));
    if (this.isMoreElement(item)) this.toggleElement(this.moreELement, isHidden);
    else if (mgActionMenuindex >= 0) {
      this.toggleElement(item, isHidden);
      this.toggleElement(this.moreELement.querySelector(`[${OverflowBehaviorElements.PROXY_INDEX}="${mgActionMenuindex}"]`), !isHidden);
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
   * Remove hidden attributes on all items
   *
   * @returns {void}
   */
  private restoreItems = (): void => {
    this.children.forEach(item => item.removeAttribute('hidden'));
  };
}