import { Component, h, Element, Prop, Watch, State, Host } from '@stencil/core';
import { MgActionMoreItemType, MgActionMoreButtonType, MgActionMoreIconType, MgActionMoreMessageType } from './mg-action-more.conf';
import { initLocales } from '../../../locales';
import { Status } from '../menu/mg-menu-item/mg-menu-item.conf';
import { Direction } from '../menu/mg-menu/mg-menu.conf';
import { createID } from '../../../utils/components.utils';

/**
 * MgActionMore['items'] type guard
 *
 * @param {unknown} prop commponent items prop
 * @returns {boolean} return true if type is valid
 */
const isMgActionMoreItems = (prop: unknown): prop is MgActionMoreItemType[] => {
  const items = prop as MgActionMoreItemType[];
  return typeof items === 'object' && items.every(item => typeof item === 'object' && typeof item.label === 'string' && typeof item.mouseEventHandler === 'function');
};

/**
 * MgActionMore['button'] type guard
 *
 * @param {unknown} prop commponent button prop
 * @returns {boolean} return true if type is valid
 */
const isMgActionMoreButton = (prop: unknown): prop is MgActionMoreButtonType => {
  const button = prop as MgActionMoreButtonType;
  return typeof button === 'object' && typeof button.variant === 'string' && typeof button.isIcon === 'boolean';
};

/**
 * MgActionMore['icon'] type guard
 *
 * @param {unknown} prop commponent icon prop
 * @returns {boolean} return true if type is valid
 */
const isMgActionMoreIcon = (prop: unknown): prop is MgActionMoreIconType => {
  const icon = prop as MgActionMoreIconType;
  return typeof icon === 'object' && typeof icon.icon === 'string';
};

@Component({
  tag: 'mg-action-more',
  styleUrl: 'mg-action-more.scss',
  shadow: true,
})
export class MgActionMore {
  /************
   * Internal *
   ************/
  private readonly name = 'mg-action-more';
  private readonly mgPopoverIdentifier = createID(this.name);
  private messages: MgActionMoreMessageType;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgActionMoreElement;

  /**
   * Define displaied icon
   * Default: {icon: 'ellipsis'}
   */
  @Prop() icon: MgActionMoreIconType = { icon: 'ellipsis' };
  @Watch('icon')
  validateIcon(newValue: MgActionMore['icon']): void {
    if (newValue && !isMgActionMoreIcon(newValue)) {
      throw new Error(`<${this.name}> prop icon must match MgActionMoreIconType.`);
    }
  }

  /**
   * Define button properties
   * Default: {variant: 'flat', isIcon: true}.
   */
  @Prop() button: MgActionMoreButtonType = { variant: 'flat', isIcon: true };
  @Watch('button')
  validateButton(newValue: MgActionMore['button']): void {
    if (newValue && !isMgActionMoreButton(newValue)) {
      throw new Error(`<${this.name}> prop button must match MgActionMoreButtonType.`);
    }
  }

  /**
   * Define the menu-items elements
   */
  @Prop() items!: MgActionMoreItemType[];
  @Watch('items')
  validateItems(newValue: MgActionMore['items']): void {
    if (!isMgActionMoreItems(newValue)) {
      throw new Error(`<${this.name}> prop "items" is required and all values must be the same type, MgActionMoreItemType.`);
    }
  }

  /**
   * Define if chevron is display
   */
  @Prop() displayChevron: boolean;
  @Watch('displayChevron')
  validateDisplayChevron(newValue: MgActionMore['displayChevron']): void {
    if (newValue && this.button.isIcon === true) {
      throw new Error(`<${this.name}> prop "displayChevron" can't be used with a 'button" prop "isIcon" attribute.`);
    }
  }
  /**
   * Menu expanded state
   * Default: false.
   */
  @State() expanded = false;

  /************
   * Merthods *
   ***********/

  /**
   * Toogle expanded props
   *
   * @returns {void}
   */
  private toggleExpanded = (): void => {
    this.expanded = !this.expanded;
  };

  /**
   * Button click handler
   *
   * @returns {void}
   */
  private handleButton = (): void => {
    this.toggleExpanded();
  };

  /**
   * Item click handler
   *
   * @param {MouseEvent} event click event
   * @param {MgActionMoreItemType['mouseEventHandler']} customHandler item['mouseEventHandler']
   * @returns {void}
   */
  private handleItemClick = (event: MouseEvent, customHandler: MgActionMoreItemType['mouseEventHandler']) => {
    this.expanded = false;
    customHandler(event);
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
    this.messages = initLocales(this.element).messages.actionMore as MgActionMoreMessageType;
    this.validateItems(this.items);
    this.validateButton(this.button);
    this.validateIcon(this.icon);
    this.validateDisplayChevron(this.displayChevron);
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    const buttonLabel = this.button.label || this.messages.label;
    const buttonContent = [buttonLabel];

    if (!this.button.isIcon && this.displayChevron) {
      buttonContent.push(
        <span
          class={{
            [`${this.name}__chevron`]: true,
            [`${this.name}__chevron--rotate`]: this.expanded === true,
            'mg-a11y-animation': true,
          }}
        >
          <mg-icon icon="chevron-down" size="small"></mg-icon>
        </span>,
      );
    }

    return (
      <Host data-mg-popover-guard={this.mgPopoverIdentifier}>
        <span class="mg-action-more">
          <mg-popover identifier={this.mgPopoverIdentifier} display={this.expanded}>
            <mg-button variant={this.button.variant} isIcon={this.button.isIcon} type="button" label={buttonLabel} onClick={this.handleButton}>
              <mg-icon {...this.icon}></mg-icon>
              {!this.button.isIcon && buttonContent}
            </mg-button>
            <div slot="content">
              <mg-menu direction={Direction.VERTICAL} label={this.messages.label}>
                {this.items.map(item => (
                  // eslint-disable-next-line react/jsx-no-bind
                  <mg-menu-item key={item.label} status={item.status || Status.VISIBLE} onClick={e => this.handleItemClick(e, item.mouseEventHandler)} href={item.href}>
                    {item.icon && <mg-icon icon={item.icon} slot="image"></mg-icon>}
                    <span slot="label">{item.label}</span>
                    {item.badge?.label && <mg-badge label={item.badge.label} value={item.badge.value} slot="information" variant="text-color"></mg-badge>}
                  </mg-menu-item>
                ))}
              </mg-menu>
            </div>
          </mg-popover>
        </span>
      </Host>
    );
  }
}
