/**
 * MgItemMore type guard
 *
 * @param {HTMLElement} element element to control type
 * @returns {boolean} truthy if element is mg-item-more
 */
const isMgItemMore = (element: HTMLElement): element is HTMLMgItemMoreElement => element.nodeName === 'MG-ITEM-MORE';

export enum OverflowBehaviorElements {
  BASE_INDEX = 'data-overflow-base-index',
  PROXY_INDEX = 'data-overflow-proxy-index',
}

export class OverflowBehavior {
  // variables
  private _resizeObserver: ResizeObserver;
  private _moreElement: HTMLElement;
  private _baseChildren: Element[];
  private _proxyChildren: Element[];

  constructor(private element: Element, private render: () => HTMLElement) {
    if (this._resizeObserver === undefined) {
      // add resize observer
      this._resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          this.run(entry.contentRect.width);
        });
      });
      this._resizeObserver.observe(this.element);
    }
    this.run();
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
    this._resizeObserver.disconnect();
  };

  /************
   * Internal *
   ************/

  /**
   * run overflow behavior
   *
   * @param {number} width width of the container. Optional.
   * @returns {void}
   */
  private run = (width?: number): void => {
    if (this._moreElement === undefined) {
      // set moreElement
      this._moreElement = this.render();

      // set children
      this._baseChildren = this.getInteractiveItems(this.element);
      if (isMgItemMore(this._moreElement)) {
        this._proxyChildren = this.getInteractiveItems(this._moreElement.shadowRoot.querySelector('mg-menu'));
      }

      // update children
      this._baseChildren.forEach((child, index) => {
        child.setAttribute(OverflowBehaviorElements.BASE_INDEX, `${index}`);
        // set moreElement children
        this._proxyChildren[index].setAttribute(OverflowBehaviorElements.PROXY_INDEX, `${index}`);
      });
    }

    if (width !== undefined) this.updateDisplayedItems(width);
  };

  /**
   * Get interactive children filtred by authorized nodeName ['MG-MENU-ITEM', 'MG-BUTTON']
   *
   * @param {Element} element element to parse
   * @returns {Element[]} children
   */
  private getInteractiveItems = (element: Element) =>
    (element.children?.length > 0 ? Array.from(element.children) : []).filter(element => ['MG-MENU-ITEM', 'MG-BUTTON'].includes(element.nodeName));

  /**
   * Update displayed items in container from a given available space
   *
   * @param {number} availableWidth available width in container to display child items
   * @returns {void}
   */
  private updateDisplayedItems = (availableWidth: number): void => {
    this.restoreItems();
    const acc = { accWidth: 0, previousItem: null };
    [...this._baseChildren, this._moreElement].forEach((child: HTMLMgMenuItemElement | HTMLMgItemMoreElement) => {
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
    else if (!this.isMoreElement(item.nextElementSibling)) return cumulateWidth + this._moreElement.offsetWidth > availableWidth;
    else return cumulateWidth > availableWidth;
  };

  /**
   * Utility method to know if a given element is the 'MORE' element
   *
   * @param {Element} element element to match with 'MORE' element
   * @returns {boolean} truthy if element is the 'MORE' element
   */
  private isMoreElement = (element: Element): boolean => element.nodeName === 'MG-ITEM-MORE';

  /**
   * Toggle display item element
   *
   * @param {HTMLElement} item item to control
   * @param {boolean} isHidden is item hidden
   * @returns {void}
   */
  private toggleItem = (item: HTMLElement, isHidden: boolean): void => {
    const mgActionMenuindex = Number(item.getAttribute(OverflowBehaviorElements.BASE_INDEX));
    if (this.isMoreElement(item)) this.toggleElement(this._moreElement, isHidden);
    else if (mgActionMenuindex >= 0) {
      this.toggleElement(item, isHidden);
      this.toggleElement(this._proxyChildren[mgActionMenuindex], !isHidden);
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
    [...this._baseChildren, this._moreElement].forEach(item => item.removeAttribute('hidden'));
  };
}
