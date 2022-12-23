import { Component, h, Element, Prop, Watch, State, EventEmitter, Event } from '@stencil/core';
import { sizes, Status } from '../mg-menu-item/mg-menu-item.conf';
import { initLocales } from '../../../../locales';
import { isMgActionMoreItem, ItemType, MessageType } from './mg-action-more.conf';
import { Direction } from '../mg-menu/mg-menu.conf';
import { MgIcon } from '../../../atoms/mg-icon/mg-icon';

@Component({
  tag: 'mg-action-more',
  styleUrl: 'mg-action-more.scss',
  shadow: true,
})
export class MgActionMore {
  /************
   * Internal *
   ************/
  private messages: MessageType;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgActionMoreElement;

  /**
   * Define the menu-items elements
   */
  @Prop({ mutable: true }) items!: ItemType[];
  @Watch('items')
  validateItems(newValue: MgActionMore['items']) {
    if (typeof (newValue as MgActionMore['items']) === 'object' && newValue.find(item => !isMgActionMoreItem(item as ItemType) === undefined)) {
      throw new Error('<mg-action-more> prop "item" is required and all values must be the same type, ItemType.');
    } else {
      // update badge
      this.displayBadge = newValue.find(item => item.badge!) !== undefined;
    }
  }

  /**
   * Define if label is display
   */
  @Prop() displayLabel: boolean;

  /**
   * Define displaied icon
   * Default: 'ellipsis-vertical'
   */
  @Prop() icon: MgIcon['icon'] = 'ellipsis-vertical';

  /**
   * Emitted event when selected item change - item index number
   */
  @Event({ eventName: 'selected-change' }) selectedChange: EventEmitter<number>;

  /**********
   * States *
   **********/

  /**
   * Display if badge is display on more element
   */
  @State() displayBadge: boolean;

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
    this.validateItems(this.items);
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <mg-popover>
        <mg-button variant="secondary">
          <mg-icon icon={this.icon}></mg-icon>
          <span class={{ 'sr-only': !this.displayLabel }}>{this.messages.moreLabel}</span>
          {this.displayBadge && <mg-badge label={this.messages.badgeLabel} value="!" hidden variant="primary"></mg-badge>}
        </mg-button>
        <div slot="content">
          <mg-menu direction={Direction.VERTICAL} label={this.messages.moreLabel}>
            {this.items.map((item, index) => (
              <mg-menu-item
                size={item.size || sizes[0]}
                hidden={item.hidden}
                status={item.status || Status.VISIBLE}
                onClick={() => {
                  if (item.proxyEvent) item.proxyEvent({ kind: 'click', payload: { bubbles: true } });
                  this.selectedChange.emit(index);
                }}
              >
                {item.icon && <mg-icon icon={item.icon} slot="image"></mg-icon>}
                <span slot="label">{item.label}</span>
                {item.badge?.label && <mg-badge label={item.badge.label} value={item.badge.value} slot="information" variant="primary"></mg-badge>}
              </mg-menu-item>
            ))}
          </mg-menu>
        </div>
      </mg-popover>
    );
  }
}
