import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'mg-details',
  styleUrl: 'mg-details.scss',
  shadow: true,
})
export class MgDetails {
  /************
   * Internal *
   ************/

  // HTML selector
  private details: HTMLDetailsElement;

  /**************
   * Decorators *
   **************/

  /**
   * Displayed title when details are closed
   */
  @Prop() toggleClosed!: string;

  /**
   * Displayed title when details are opened
   */
  @Prop() toggleOpened!: string;
  @Watch('toggleClosed')
  @Watch('toggleOpened')
  validateTitles(newValue: string): void {
    if (newValue === undefined || newValue.trim() === '') {
      throw new Error('<mg-details> prop "toggleClosed" and "toggleOpened" must be defined.');
    }
  }

  /**
   * Hide summary element
   */
  @Prop() hideSummary = false;

  /**
   * Define if details are diplayed
   */
  @Prop({ mutable: true }) expanded = false;
  @Watch('expanded')
  handleExpanded(newValue: boolean): void {
    this.expandedChange.emit(newValue);
  }

  /**
   * Emmited event when expanded change
   */
  @Event({ eventName: 'expanded-change' }) expandedChange: EventEmitter<boolean>;

  /**
   * Handle details toggle
   *
   * @returns {void}
   */
  private handleToggle = (): void => {
    this.expanded = this.details.open;
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateTitles(this.toggleClosed);
    this.validateTitles(this.toggleOpened);
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <details class="mg-details" onToggle={this.handleToggle} open={this.expanded} ref={el => (this.details = el as HTMLDetailsElement)}>
        <summary>
          <slot name="summary"></slot>
          <span class="mg-details__toggle">
            <mg-icon icon={this.expanded ? 'chevron-up' : 'chevron-down'}></mg-icon>
            <span class={{ 'sr-only': this.hideSummary }}>{this.expanded ? this.toggleOpened : this.toggleClosed}</span>
          </span>
        </summary>
        <div class="mg-details__details">
          <slot name="details"></slot>
        </div>
      </details>
    );
  }
}
