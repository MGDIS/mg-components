import { Component, h, Element, Fragment, Prop, Watch } from '@stencil/core';
import { placements, PlacementType } from './mg-action-menu.conf';
import { OverflowBehavior } from '../../../../utils/behaviors.utils';
import { IProxyEvent } from '../mg-action-more/mg-action-more.conf';

@Component({
  tag: 'mg-action-menu',
  styleUrl: 'mg-action-menu.scss',
  shadow: true,
})
export class MgActionMenu {
  /************
   * Internal *
   ************/

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
  @Prop({ reflect: true }) placement: PlacementType = placements[0];
  @Watch('placement')
  validatePlacement(newValue: MgActionMenu['placement']): void {
    if (!placements.includes(newValue)) {
      throw new Error(`<mg-action-menu> prop "interactiveElement" must be one off: ${placements.join(',')}.`);
    }
  }

  /**
   * Define component manage child overflow
   */
  @Prop() disableOverflow: boolean;

  /************
   * Methods *
   ************/

  private renderMgActionMore(): HTMLMgActionMoreElement {
    const mgMoreElement = document.createElement('mg-action-more');
    const children = Array.from(this.element.children);
    const dispatchEvent: (element: Element) => IProxyEvent = element => event => {
      element.dispatchEvent(new CustomEvent(event.kind, event.payload));
    };
    mgMoreElement.items = children.map(child => ({
      label: child.textContent,
      badge: {
        value: child.querySelector('mg-badge')?.value,
        label: child.querySelector('mg-badge')?.label,
      },
      icon: child.querySelector('mg-icon')?.icon,
      proxyEvent: dispatchEvent(child),
    }));
    this.element.appendChild(mgMoreElement);

    return mgMoreElement;
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Validate props
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validatePlacement(this.placement);
  }

  /**
   * init overflow behavior
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    if (!this.disableOverflow) {
      this.overflowBehavior = new OverflowBehavior(this.element, this.renderMgActionMore);
      this.overflowBehavior.init();
    }
  }

  /**
   * Disconnect overflow ResizeObserver
   *
   * @returns {void}
   */
  disconnectedCallback(): void {
    if (!this.disableOverflow) {
      this.overflowBehavior.disconnect();
    }
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
