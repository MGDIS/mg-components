import { Component, h, Prop, State, EventEmitter, Watch, Event } from '@stencil/core';
import { createID, ClassList } from '../../../utils/components.utils';
import { messages } from '../../../locales';

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
  private collapseButtonElement: HTMLMgButtonElement;

  /**************
   * Decorators *
   **************/

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier?: string = createID('mg-panel');

  /**
   * Panel title
   */
  @Prop() panelTitle!: string;
  @Watch('panelTitle')
  handelTileChange(newValue: string): void {
    this.titleChange.emit(newValue);
  }

  /**
   * Panel is opened
   */
  @Prop({ mutable: true }) isOpened = false;

  /**
   * Panel is editabled
   */
  @Prop() isEditabled = false;

  /**
   * Emmited event when title change
   */
  @Event({ eventName: 'title-change' }) titleChange: EventEmitter<string>;

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

  /************
   * Methods *
   ************/

  /**
   * Toggle is editing state
   */
  private toggleIsEditing = (): void => {
    this.isEditing = !this.isEditing;
  };

  /************
   * Handlers *
   ************/

  /**
   * Collapse button click handler
   */
  private handleCollapseButton = (): void => {
    this.isOpened = !this.isOpened;
  };

  /**
   * Edit button click handler
   */
  private handleEditButton = (): void => {
    this.toggleIsEditing();
  };

  /**
   * Update title handler
   *
   * @param {CustomEvent<string>} event input value change event
   */
  private handleUpdateTitle = (event: CustomEvent<string>): void => {
    this.updatedPanelTitle = event.detail;
  };

  /**
   * Cancel edition button handler
   */
  private handleCancelEditButton = (): void => {
    this.updatedPanelTitle = undefined;
    this.toggleIsEditing();
  };

  /**
   * Validate edition button handler
   */
  private handleValidateEditButton = (): void => {
    if (this.updatedPanelTitle !== undefined) this.panelTitle = this.updatedPanelTitle;

    this.toggleIsEditing();
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Header left conditional render
   *
   * @returns {HTMLElement | HTMLElement[]} header left element
   */
  private headerLeft = (): HTMLElement | HTMLElement[] => {
    const collapseButton = (): HTMLMgButtonElement => (
      <mg-button
        onClick={this.handleCollapseButton}
        variant="flat"
        class="mg-panel__collapse-button"
        identifier={`${this.identifier}-collapse-button`}
        ref={el => (this.collapseButtonElement = el as HTMLMgButtonElement)}
      >
        <mg-icon icon={this.isOpened ? 'chevron-up' : 'chevron-down'}></mg-icon>
        {!this.isEditing && this.panelTitle}
      </mg-button>
    );

    if (this.isEditabled && !this.isEditing) {
      return [
        collapseButton(),
        <mg-button is-icon variant="secondary" label={messages.panel.editLabel} onClick={this.handleEditButton} identifier={`${this.identifier}-edit-button`}>
          <mg-icon icon="pen"></mg-icon>
        </mg-button>,
      ];
    }

    if (this.isEditabled && this.isEditing) {
      return [
        collapseButton(),
        <mg-input-text
          label={messages.panel.editLabel}
          label-hide
          value={this.panelTitle}
          onValue-change={this.handleUpdateTitle}
          displayCharacterLeft={false}
          identifier={`${this.identifier}-edition-input`}
          ref={el => (this.editInputElement = el as HTMLMgInputTextElement)}
          width="full"
        >
          <div slot="append-input">
            <mg-button label={messages.panel.cancel} is-icon variant="secondary" onClick={this.handleCancelEditButton} identifier={`${this.identifier}-edition-button-cancel`}>
              <mg-icon icon="cross"></mg-icon>
            </mg-button>
            <mg-button
              label={messages.panel.validate}
              is-icon
              variant="secondary"
              onClick={this.handleValidateEditButton}
              identifier={`${this.identifier}-edition-button-validate`}
            >
              <mg-icon icon="check"></mg-icon>
            </mg-button>
          </div>
        </mg-input-text>,
      ];
    }

    return collapseButton();
  };

  componentDidRender(): void {
    // set aria element on MgButton >>> button element
    const collapseButtonElement = this.collapseButtonElement.querySelector('button');
    collapseButtonElement.setAttribute('aria-expanded', this.isOpened.toString());
    collapseButtonElement.setAttribute('aria-controls', `${this.identifier}-content`);

    // when we are editing we get focus on edition input
    if (this.isEditing) {
      this.editInputElement.shadowRoot.querySelector('input').focus();
    }
  }

  render(): HTMLElement {
    return (
      <section class={this.classList.join()} id={this.identifier}>
        <header class="mg-panel__header" id={`${this.identifier}-header`}>
          <div class="mg-panel__header-left">{this.headerLeft()}</div>
          <div class="mg-panel__header-right">
            <slot name="header-right"></slot>
          </div>
        </header>
        <article class="mg-panel__content" id={`${this.identifier}-content`} aria-labelledby={`${this.identifier}-header`} hidden={!this.isOpened}>
          <slot name="content"></slot>
        </article>
      </section>
    );
  }
}
