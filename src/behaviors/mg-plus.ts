type UpdateDisplayedItemsReducerType = { accWidth: number; hiddenItems: HTMLMgMenuItemElement[]; visibleItems: HTMLMgMenuItemElement[] };

export class MgPlus {
  private mgPlus: HTMLElement;

  constructor(private container: Element, private render: () => HTMLElement, private updateDisplayedItemCondition: (item: HTMLElement) => boolean) {}

  setUp = (width: number): void => {
    if ([null, undefined].includes(this.mgPlus)) {
      this.mgPlus = this.render();
      this.mgPlus.setAttribute('data-mg-plus', '');
      this.mgPlus.setAttribute('hidden', '');

      const dataMgMenuIndex = this.mgPlus.querySelectorAll('[data-mg-menu-index]');
      if (!dataMgMenuIndex) throw new Error('<mg-plus /> attribute "data-mg-menu-index" must be defined on the mgPlus container items.');
      Array.from(dataMgMenuIndex).forEach(item => {
        item.setAttribute('data-mg-plus-index', item.getAttribute('data-mg-menu-index'));
        item.removeAttribute('data-mg-menu-index');
        item.setAttribute('hidden', '');
      });

      this.container.appendChild(this.mgPlus);
    }
    this.updateDisplayedItems(width);
  };

  private toggleItem = (item: HTMLMgMenuItemElement, hidden: boolean) => {
    const mgPlusindex = Number(item.getAttribute('data-mg-menu-index'));
    if (this.isMgPlusElement(item)) this.toggleMgPlus(hidden);
    else if (hidden && mgPlusindex) {
      item.setAttribute('hidden', '');
      this.mgPlus.querySelector(`[data-mg-plus-index="${mgPlusindex}"]`).removeAttribute('hidden');
    } else {
      item.removeAttribute('hidden');
      this.mgPlus.querySelector(`[data-mg-plus-index="${mgPlusindex}"]`).setAttribute('hidden', '');
    }
  };

  private toggleMgPlus = hidden => {
    if (hidden) this.mgPlus.setAttribute('hidden', '');
    else this.mgPlus.removeAttribute('hidden');
  };

  private isMgPlusElement = (element: Element): boolean => element?.getAttribute('data-mg-plus') !== null;

  private isOverflowElement = (cumulateWidth: number, item: HTMLMgMenuItemElement, availableWidth: number): boolean => {
    if (item.previousElementSibling === null) return false;
    else if (this.isMgPlusElement(item)) return false;
    else if (item.previousElementSibling !== null && !this.isMgPlusElement(item.nextElementSibling)) return cumulateWidth + this.mgPlus.offsetWidth > availableWidth;
    else return cumulateWidth > availableWidth;
  };

  private updateDisplayedItems = (availableWidth: number): void => {
    const items = Array.from(this.container.children);
    items.forEach(item => item.removeAttribute('hidden'));
    const { hiddenItems, visibleItems }: UpdateDisplayedItemsReducerType = items.reduce(
      (acc, curr: HTMLMgMenuItemElement) => {
        if (this.updateDisplayedItemCondition(curr)) {
          acc.accWidth += curr.offsetWidth;
          // if item has an overflow wee hidde it
          if (this.isOverflowElement(acc.accWidth, curr, availableWidth)) {
            acc.hiddenItems = [...acc.hiddenItems, curr];
          } else if (this.isMgPlusElement(curr) && acc.hiddenItems.length < 1) {
            // if current item is mg-plus and have NOT hidden items, mg-plus is an hidden item
            acc.hiddenItems = [...acc.hiddenItems, curr];
          } else acc.visibleItems = [...acc.visibleItems, curr];
        }
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
}
