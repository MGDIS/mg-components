import { Component, h, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { createID } from '../../../utils/components.utils';
import { NavigationAction } from './mg-pagination.conf';
import { messages } from './../../../locales';

/**
 * Range generator
 *
 * start by get the range length, add "+ 1" to include last value, ex: Math.ceil((3 + 1 - 1) / 1) => 3
 * then with Array(Math.ceil...) we get the final array with empty values, ex: Array(Math.ceil(2 + 1 - 1) / 1)) => [empty, empty, empty]
 * then with Array(Math.ceil...).keys() we get the Array Iterator from empty values
 * then with Array.from(Array(...)) we get the complete array with "index" values instead of "empty" values
 * ex: Array.from(Array(Math.ceil((2 + 1 - 1) / 1) || 1).keys()) => [0, 1, 2]
 * finaly we map values from "start" range and apply the "step" coefficiant,
 * ex: Array.from(Array(Math.ceil((2 + 1 - 1) / 1) || 1).keys()).map(x => 1 + x * 1) => [1, 2, 3]
 *
 * range(1, 1) = [1]
 * range(1, 5) = [1, 2, 3, 4, 5]
 * range(10, 20, 2) = [10, 12, 14, 16, 18, 20]
 *
 * @param start
 * @param end
 * @param step
 * @returns {number[]}
 */
const range = (start: number, end: number, step = 1): number[] => Array.from(Array(Math.ceil((end + 1 - start) / step)).keys()).map(x => start + x * step);

@Component({
  tag: 'mg-pagination',
  styleUrl: 'mg-pagination.scss',
  shadow: true,
})
export class MgPagination {
  /**************
   * Decorators *
   **************/

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier?: string = createID('mg-pagination');

  /**
   * Panignation label. Is a short description.
   * Customize default value can be usefull to improve accessibility
   */
  @Prop() label: string = 'pagination';

  /**
   * Component total pages
   */
  @Prop() totalPages: number = 1;
  @Watch('totalPages')
  validateTotalPages(newValue) {
    if (newValue < 1) {
      throw new Error('<mg-pagination> prop "totalPages" must be greater than 0');
    }
  }

  /**
   * Component current page
   */
  @Prop({ reflect: true, mutable: true }) currentPage: number = 1;
  @Watch('currentPage')
  validateCurrentPage(newValue) {
    if (newValue < 1) {
      throw new Error('<mg-pagination> prop "currentPage" must be greater than 0');
    } else if (newValue > this.totalPages) {
      throw new Error('<mg-pagination> prop "currentPage" can not be greater than total page');
    }

    this.currentPageChange.emit(newValue);
  }

  /**
   * Emmited event when current page change
   */
  @Event({ eventName: 'current-page-change' }) currentPageChange: EventEmitter<number>;

  /**
   * Change current page from target
   * @param target
   */
  private goToPage = (target: number) => (this.currentPage = target);

  /************
   * Handlers *
   ************/

  /**
   * Default click handler
   * @param event
   */
  private handleSelect = (event: InputEvent & { target: HTMLInputElement }) => {
    const to = Number(event.target.value);
    this.goToPage(to > 0 ? to : 1);
  };

  /**
   * Go to 'previous/next' page button handler
   * @returns {void}
   */
  private handleGoToPage = (action: NavigationAction) => this.goToPage(action === NavigationAction.NEXT ? this.currentPage + 1 : this.currentPage - 1);

  /*************
   * Lifecycle *
   *************/

  componentWillLoad() {
    this.validateTotalPages(this.totalPages);
    this.validateCurrentPage(this.currentPage);
  }

  render() {
    const navigationActionButton = (disabled: boolean, action: NavigationAction) => (
      <mg-button
        identifier={`${this.identifier}-button-${action}`}
        class="mg-pagination__button"
        label={messages.pagination[`${action}Page`]}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => this.handleGoToPage(action)}
        disabled={disabled}
        variant="flat"
      >
        {action === NavigationAction.PREVIOUS && <mg-icon icon="chevron-left"></mg-icon>}
        <span aria-hidden="true">{messages.pagination[action]}</span>
        {action === NavigationAction.NEXT && <mg-icon icon="chevron-right"></mg-icon>}
      </mg-button>
    );

    return (
      <nav aria-label={this.label} id={this.identifier} class="mg-pagination__nav">
        {navigationActionButton(this.currentPage <= 1, NavigationAction.PREVIOUS)}
        <mg-input-select
          identifier={`${this.identifier}-select`}
          items={range(1, this.totalPages).map(page => page.toString())}
          label={messages.pagination.selectPage}
          label-hide={true}
          on-value-change={this.handleSelect}
          value={this.currentPage.toString()}
          placeholder-hide
        ></mg-input-select>
        <span class="sr-only">
          {messages.pagination.page} {this.currentPage}
        </span>
        <span>
          / {this.totalPages} {this.totalPages > 1 ? messages.pagination.pages : messages.pagination.pages}
        </span>
        {navigationActionButton(this.currentPage >= this.totalPages, NavigationAction.NEXT)}
      </nav>
    );
  }
}
