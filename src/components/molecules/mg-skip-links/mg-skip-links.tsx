import { Component, Element, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import { SkipLink } from './mg-skip-links.conf';
import { initLocales } from '../../../locales';

@Component({
  tag: 'mg-skip-links',
  styleUrl: 'mg-skip-links.scss',
  shadow: true,
})
export class MgSkipLinks {
  /************
   * Internal *
   ************/

  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgSkipLinksElement;

  /**
   * Skip links
   */
  @Prop({ mutable: true }) links: SkipLink[];
  @Watch('links')
  validateLinks(links: SkipLink[]): void {
    if (
      links === undefined ||
      links.length === 0 ||
      links.some(link => link.href === undefined || !link.href.startsWith('#') || link.label === undefined || link.label.trim() === '')
    ) {
      throw new Error(`<mg-skip-links> prop "links": Cannot be empty and each link must contains an href starting with a "#" and a non empty label attributes.`);
    }
  }

  /**
   * Emited event when link is clicked
   */
  @Event({ eventName: 'go-to-anchor' }) goToAnchor: EventEmitter<string>;

  /***********
   * Methods *
   **********/

  /**
   * Handle link click and emit go-to-anchor event
   *
   * @param {MouseEvent} event mouse event
   * @returns {void}
   */
  private handleLinkCLick = (event: MouseEvent & { currentTarget: HTMLElement }): void => {
    this.goToAnchor.emit(event.currentTarget.getAttribute('href'));
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateLinks(this.links);
    this.messages = initLocales(this.element).messages;
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <nav class="mg-skip-links" role="navigation" aria-label={this.messages.skipLinks.navLabel}>
        <ul class="mg-skip-links__list">
          {this.links.map(link => (
            <li>
              <a class="mg-skip-links__link" href={link.href} onClick={this.handleLinkCLick}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
