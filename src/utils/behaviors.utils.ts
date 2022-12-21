type UpdateDisplayedItemsReducerType = { accWidth: number; hiddenItems: HTMLMgMenuItemElement[]; visibleItems: HTMLMgMenuItemElement[] };

export enum OverflowBehaviorElements {
  MORE = 'data-overflow-more',
  BASE_INDEX = 'data-overflow-base-index',
  PROXY_INDEX = 'data-overflow-proxy-index',
}

export class OverflowBehavior {
  // variables
  private resizeObserver: ResizeObserver;
  private moreELement: HTMLElement;

  constructor(private element: Element, private render: () => HTMLElement) {}

  /**********
   * Public *
   **********/

  init = (): void => {
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

  disconnect = (): void => {
    this.resizeObserver?.disconnect();
  };

  /************
   * Internal *
   ************/

  /**
   * run mg-action-menu behavior
   *
   * @param {number} width
   */
  private run = (width: number): void => {
    if (!this.moreELement) {
      this.moreELement = this.render();
      this.moreELement.setAttribute(OverflowBehaviorElements.MORE, '');
    }
    this.updateDisplayedItems(width);

    // toggle mg-badge
    // const mgActionMenuBadge = this.element.querySelector(`[${this.mgActionMenuBadge}]`);
    // this.toggleElement(mgActionMenuBadge, this.moreELement.querySelector(`[${OverflowBehaviorElements.PROXY_INDEX}]:not([hidden]) mg-badge`) === null);
  };

  /**
   * Update displayed items in container from a given available space
   *
   * @param {number} availableWidth available width in container to display child items
   * @returns {void}
   */
  private updateDisplayedItems = (availableWidth: number): void => {
    const items = Array.from(this.element.children);
    items.forEach(item => item.removeAttribute('hidden'));
    const { hiddenItems, visibleItems }: UpdateDisplayedItemsReducerType = items.reduce(
      (acc, curr: HTMLMgMenuItemElement) => {
        acc.accWidth += curr.offsetWidth;
        // if item has an overflow wee hidde it
        if (this.isOverflowElement(acc.accWidth, curr, availableWidth)) {
          acc.hiddenItems = [...acc.hiddenItems, curr];
        } else if (this.isMoreElement(curr) && acc.hiddenItems.length < 1) {
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

  /**
   * Utility method to know if item overflow partialy or totaly in the container
   *
   * @param {number} cumulateWidth previous sibling elements cumulate width + item width
   * @param {HTMLElement} item item HTML element
   * @param {number} availableWidth container available width
   * @returns {boolean}
   */
  private isOverflowElement = (cumulateWidth: number, item: HTMLElement, availableWidth: number): boolean => {
    const interativeElementWidth = this.moreELement.nodeName === 'MG-POPOVER' ? (this.moreELement.firstElementChild as HTMLElement).offsetWidth : this.moreELement.offsetWidth;
    if (item.previousElementSibling === null) return false;
    else if (this.isMoreElement(item)) return false;
    else if (item.previousElementSibling !== null && item.nextElementSibling !== null && !this.isMoreElement(item.nextElementSibling))
      return cumulateWidth + interativeElementWidth > availableWidth;
    else return cumulateWidth > availableWidth;
  };

  /**
   * Utility method to know if a given element is the mg-action-menu element
   *
   * @param {Element} element element to match with mg-action-menu
   * @returns {boolean}
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
    if (mgActionMenuindex) {
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
}
