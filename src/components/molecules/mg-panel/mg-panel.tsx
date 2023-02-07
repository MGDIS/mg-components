import { Component, Element, h, Prop, State, EventEmitter, Watch, Event } from '@stencil/core';
import { createID, ClassList } from '../../../utils/components.utils';
import { initLocales } from '../../../locales';

@Component({
  tag: 'mg-panel',
  styleUrl: 'mg-panel.scss',
  shadow: true,
})
export class MgPanel {
  /************
   * Internal *
   ************/

  // HTML selector
  private editInputElement: HTMLMgInputTextElement;

  // Locales
  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgPanelElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-panel');

  /**
   * Panel title
   */
  @Prop({ mutable: true }) panelTitle!: string;
  @Watch('panelTitle')
  validatePanelTitle(newValue: string): void {
    if (typeof newValue !== 'string' || newValue.trim() === '') {
      throw new Error('<mg-panel> prop "panelTitle" is required.');
    }
    this.titleChange.emit(newValue);
  }

  /**
   * Panel title pattern
   */
  @Prop({ mutable: true }) titlePattern: string;
  @Watch('titlePattern')
  validatetitlePattern(newValue: string): void {
    if (newValue && !this.titleEditable) {
      throw new Error('<mg-panel> prop "titleEditable" must be set to `true`.');
    }
    if (newValue && (this.titlePatternErrorMessage === undefined || this.titlePatternErrorMessage.trim() === '')) {
      throw new Error('<mg-panel> prop "titlePattern" must be paired with the prop "titlePatternErrorMessage".');
    }
  }

  /**
   * Panel title pattern error message
   */
  @Prop({ mutable: true }) titlePatternErrorMessage: string;

  /**
   * Panel is opened
   */
  @Prop({ mutable: true }) expanded = false;
  @Watch('expanded')
  handleExpanded(newValue: boolean): void {
    this.expandedChange.emit(newValue);
  }

  /**
   * Disable possibility to toggle expand
   */
  @Prop({ mutable: true }) expandToggleDisabled: boolean;

  /**
   * Panel title is editabled
   */
  @Prop() titleEditable = false;

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-panel']);

  /**
   * Title is in edition mode
   */
  @State() isEditing = false;

  /**
   * Cache for updated panel title before validation
   */
  @State() updatedPanelTitle: string;

  /**
   * Emmited event when title change
   */
  @Event({ eventName: 'title-change' }) titleChange: EventEmitter<string>;

  /**
   * Emmited event when expanded change
   */
  @Event({ eventName: 'expanded-change' }) expandedChange: EventEmitter<boolean>;

  /************
   * Methods *
   ************/

  /**
   * Toggle is editing state
   *
   * @returns {void}
   */
  private toggleIsEditing = (): void => {
    this.isEditing = !this.isEditing;
  };

  /************
   * Handlers *
   ************/

  /**
   * Collapse button click handler
   *
   * @returns {void}
   */
  private handleCollapseButton = (): void => {
    if (!this.expandToggleDisabled) {
      this.expanded = !this.expanded;
    }
  };

  /**
   * Edit button click handler
   *
   * @returns {void}
   */
  private handleEditButton = (): void => {
    this.toggleIsEditing();
  };

  /**
   * Update title handler
   *
   * @param {CustomEvent<string>} event input value change event
   * @returns {void}
   */
  private handleUpdateTitle = (event: CustomEvent<string>): void => {
    this.updatedPanelTitle = event.detail;
  };

  /**
   * Cancel edition button handler
   *
   * @returns {void}
   */
  private handleCancelEditButton = (): void => {
    this.updatedPanelTitle = undefined;
    this.toggleIsEditing();
  };

  /**
   * Validate edition button handler
   *
   * @returns {void}
   */
  private handleValidateEditButton = (): void => {
    if (this.editInputElement.valid) {
      if (this.updatedPanelTitle !== undefined) this.panelTitle = this.updatedPanelTitle;

      this.toggleIsEditing();
    }
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
    // Get locales
    this.messages = initLocales(this.element).messages;
    // Validate
    this.validatetitlePattern(this.titlePattern);
    this.validatePanelTitle(this.panelTitle);
  }

  /**
   * Header left conditional render
   *
   * @typedef {HTMLElement} HTMLMgButtonElement
   * @returns {HTMLMgButtonElement | HTMLElement | HTMLElement[]} header left element
   */
  private headerLeft = (): HTMLMgButtonElement | HTMLElement | HTMLElement[] => {
    const collapseButton = (): HTMLMgButtonElement => (
      <mg-button
        onClick={this.handleCollapseButton}
        variant="flat"
        identifier={`${this.identifier}-collapse-button`}
        aria-expanded={this.expanded !== undefined && this.expanded.toString()}
        aria-controls={`${this.identifier}-content`}
        disabled={this.expandToggleDisabled}
      >
        <span class="mg-panel__collapse-button-content">
          <mg-icon icon={this.expanded ? 'chevron-up' : 'chevron-down'}></mg-icon>
          {!this.isEditing && this.panelTitle}
        </span>
      </mg-button>
    );

    if (this.titleEditable && !this.isEditing) {
      return [
        collapseButton(),
        <mg-button key="edit-button" is-icon variant="flat" label={this.messages.panel.editLabel} onClick={this.handleEditButton} identifier={`${this.identifier}-edit-button`}>
          <mg-icon icon="pen"></mg-icon>
        </mg-button>,
      ];
    }

    if (this.titleEditable && this.isEditing) {
      return [
        collapseButton(),
        <mg-input-text
          key="edition-input"
          label={this.messages.panel.editLabel}
          label-hide
          value={this.panelTitle}
          onValue-change={this.handleUpdateTitle}
          displayCharacterLeft={false}
          pattern={this.titlePattern}
          pattern-error-message={this.titlePatternErrorMessage}
          identifier={`${this.identifier}-edition-input`}
          ref={el => (this.editInputElement = el as HTMLMgInputTextElement)}
        >
          <mg-button
            slot="append-input"
            label={this.messages.general.cancel}
            is-icon
            variant="secondary"
            onClick={this.handleCancelEditButton}
            identifier={`${this.identifier}-edition-button-cancel`}
          >
            <mg-icon icon="cross"></mg-icon>
          </mg-button>
          <mg-button
            slot="append-input"
            label={this.messages.general.confirm}
            is-icon
            variant="secondary"
            onClick={this.handleValidateEditButton}
            identifier={`${this.identifier}-edition-button-validate`}
          >
            <mg-icon icon="check"></mg-icon>
          </mg-button>
        </mg-input-text>,
      ];
    }

    return collapseButton();
  };

  /**
   * Edit DOM after render
   *
   * @returns {void}
   */
  componentDidRender(): void {
    // when we are editing we get focus on edition input
    if (this.isEditing) {
      this.editInputElement.setFocus();
    }
  }

  /**
   * Render component
   *
   * @returns {HTMLElement} html element
   */
  render(): HTMLElement {
    return (
      <section class={this.classList.join()} id={this.identifier}>
        <mg-card>
          <header class="mg-panel__header" id={`${this.identifier}-header`}>
            <div class={`mg-panel__header-left ${this.isEditing ? 'mg-panel__header-left--full' : ''}`}>{this.headerLeft()}</div>
            <div class="mg-panel__header-right">
              <slot name="header-right"></slot>
            </div>
          </header>
          <article class="mg-panel__content" id={`${this.identifier}-content`} aria-labelledby={`${this.identifier}-header`} hidden={!this.expanded}>
            <slot></slot>
          </article>
        </mg-card>
      </section>
    );
  }
}
