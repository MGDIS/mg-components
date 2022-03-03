import { Component, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { createID } from '../../../utils/components.utils';
import { PageKind, Page, PagerItem, NavigationAction } from './mg-pagination.conf';
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

/**
 * Helper function to tell if given page is current
 * @param currentPage
 * @param number
 * @returns {boolean}
 */
const isCurrentPage = (currentPage: number, number: number): boolean => currentPage === number;

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
    } else {
      this.setPager();
    }

    this.currentPageChange.emit(newValue);
  }

  /**
   * Pager items
   */
  @State() pager: PagerItem[] = [];

  /**
   * Pages to display
   */
  @State() pages: Page[] = [1];

  /**
   * Emmited event when current page change
   */
  @Event({ eventName: 'current-page-change' }) currentPageChange: EventEmitter<number>;

  /**
   * Pages state setter
   * @returns {void}
   */
  private setPages = (): void => {
    const firstPage = 1;
    const pages = range(firstPage, this.totalPages);
    const lastPage = this.totalPages;
    const ellipsis = PageKind.ELLIPSIS;
    let middlePages = [];

    /*
     * < [1] >
     * < [1] 2 >
     * < 1 [2] >
     * < [1] 2 3 >
     * < 1 [2] 3 >
     * < 1 2 [3] >
     * < [1] 2 3 4>
     * < 1 [2] 3 4>
     * < 1 2 [3] 4>
     * < 1 2 3 [4]>
     */
    if (pages.length <= 4) {
      this.pages = pages;
      return;
    } else {
      /**
       * < [1] 2 ... total >
       * < 1 [2] ... total >
       * < 1 ...[n] ... total >
       * < 1 ... [total-1] total >
       * < 1 ... total-1 [total] >
       */
      if ([this.currentPage - 1, this.currentPage].includes(firstPage)) {
        middlePages = [firstPage + 1, ellipsis];
      } else if ([this.currentPage + 1, this.currentPage].includes(lastPage)) {
        middlePages = [ellipsis, lastPage - 1];
      } else {
        middlePages = [ellipsis, this.currentPage, ellipsis];
      }

      this.pages = [firstPage, ...middlePages, lastPage];
      return;
    }
  };

  /**
   * Pager state setter
   */
  private setPager = () => {
    this.setPages();

    const pages = this.pages.map(page => ({
      kind: page === PageKind.ELLIPSIS ? PageKind.ELLIPSIS : PageKind.NUMBER,
      number: page === PageKind.ELLIPSIS ? null : page,
      disabled: false,
    }));
    const previousPage = { kind: PageKind.NAVIGATION, disabled: isCurrentPage(this.currentPage, 1), navigationaction: NavigationAction.PREVIOUS };
    const nextPage = { kind: PageKind.NAVIGATION, disabled: isCurrentPage(this.currentPage, this.totalPages), navigationaction: NavigationAction.NEXT };

    this.pager = [previousPage, ...pages, nextPage];
  };

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
  private handleClick = (event: MouseEvent & { currentTarget: HTMLElement }) => {
    const nextPage: number = Number(event.currentTarget.getAttribute('data-page'));
    this.goToPage(nextPage);
  };

  /**
   * Go to 'previous' button handler
   * @returns {void}
   */
  private handleGoToPrevious = () => this.goToPage(this.currentPage - 1);

  /**
   * Go to 'next' button handler
   * @returns {void}
   */
  private handleGoToNext = () => this.goToPage(this.currentPage + 1);

  /*************
   * Lifecycle *
   *************/

  componentWillLoad() {
    this.validateTotalPages(this.totalPages);
    this.validateCurrentPage(this.currentPage);
  }

  render() {
    const button = ({ kind, number, disabled, navigationaction }) => {
      if (kind === PageKind.ELLIPSIS) return <button class="mg-pagination-list__button mg-pagination-list__button--ellipsis">&#8230;</button>;

      if (kind === PageKind.NAVIGATION)
        return (
          <button
            class="mg-pagination-list__button mg-pagination-list__button--navigation"
            aria-label={navigationaction === NavigationAction.PREVIOUS ? messages.pagination.previousPage : messages.pagination.nextPage}
            onClick={navigationaction === NavigationAction.PREVIOUS ? this.handleGoToPrevious : this.handleGoToNext}
            disabled={disabled}
          >
            <span aria-hidden="true">{navigationaction === NavigationAction.PREVIOUS ? messages.pagination.previous : messages.pagination.next}</span>
          </button>
        );

      return (
        <button
          class={`mg-pagination-list__button ${number === this.currentPage ? 'mg-pagination-list__button--active' : ''}`}
          onClick={this.handleClick}
          data-page={number}
          aria-current={number === this.currentPage ? messages.pagination.page : false}
          disabled={disabled}
        >
          <span class="sr-only">{messages.pagination.page}</span> {number}
        </button>
      );
    };

    return (
      <nav aria-label={this.label} id={this.identifier}>
        <ul class="mg-pagination-list">
          {this.pager.map(({ kind, number, disabled, navigationaction }) => (
            <li class="mg-pagination-list__item">{button({ kind, number, disabled, navigationaction })}</li>
          ))}
        </ul>
      </nav>
    );
  }
}
