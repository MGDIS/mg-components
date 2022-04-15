import { Component, Event, h, Prop, EventEmitter, State, Watch, Element } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList, allItemsAreString } from '../../../../utils/components.utils';
import { ToggleValue } from './mg-input-toggle.conf';

/**
 * type Option validation function
 *
 * @param {ToggleValue} option radio option
 * @returns {boolean} toggle option type is valid
 */
const isOption = (option: ToggleValue): boolean => typeof option === 'object' && typeof option.title === 'string' && option.value !== undefined;

@Component({
  tag: 'mg-input-toggle',
  styleUrl: 'mg-input-toggle.scss',
  shadow: true,
})
export class MgInputToggle {
  /************
   * Internal *
   ************/

  // classes
  private classReadonly = 'mg-input--toggle-readonly';
  private classDisabled = 'mg-input--toggle-disabled';
  private classIsActive = 'mg-input--toggle-is-active';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputToggleElement;

  /**
   * Component value
   */
  @Prop({ mutable: true }) value: unknown;
  @Watch('value')
  handleValue(newValue: unknown): void {
    // Swich to the right option
    this.setChecked();
    // Emit value-change event
    this.valueChange.emit(newValue);
  }

  /**
   * Items are the possible options to select
   *
   * @returns {void}
   */
  @Prop() items!: string[] | ToggleValue[];
  @Watch('items')
  validateItems(newValue: string[] | ToggleValue[]): void {
    if (typeof newValue === 'object' && this.items.length !== 2) {
      throw new Error('<mg-input-toggle> prop "items" require 2 items.');
    }
    // String array
    else if (allItemsAreString(newValue as string[])) {
      this.options = (newValue as string[]).map(item => ({ title: item, value: item }));
    }
    // Object array
    else if (newValue && (newValue as ToggleValue[]).every(item => isOption(item))) {
      this.options = newValue as ToggleValue[];
    } else {
      throw new Error('<mg-input-toggle> prop "items" is required and all items must be the same type: ToggleValue.');
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-input-toggle');

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

  /**
   * Input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop: boolean;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Define if toggle have on/off style
   */
  @Prop() isOnOff = false;
  @Watch('isOnOff')
  handleIsOnOff(newValue: boolean): void {
    if (newValue) this.classList.add(`mg-input--toggle-on-off`);
  }

  /**
   * Define if toggle display icon
   */
  @Prop() isIcon = false;
  @Watch('isIcon')
  handleIsIcon(newValue: boolean): void {
    if (newValue) this.classList.add(`mg-input--toggle-icon`);
  }

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  handleReadonly(newValue: boolean): void {
    if (newValue) this.classList.add(this.classReadonly);
    else this.classList.delete(this.classReadonly);
  }

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('disabled')
  handleDisabled(newValue: boolean): void {
    if (newValue) this.classList.add(this.classDisabled);
    else this.classList.delete(this.classDisabled);
  }

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText: string;

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-input--toggle']);

  /**
   * Formated items for display
   */
  @State() options: ToggleValue[];

  /**
   * Checked internal value
   */
  @State() checked = false;
  @Watch('checked')
  handleChecked(newValue: boolean): void {
    // style
    if (newValue) this.classList.add(this.classIsActive);
    else this.classList.delete(this.classIsActive);

    // update value
    this.value = this.options[newValue ? 1 : 0].value;
  }

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<unknown>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<boolean>;

  /**
   * Change checked value
   *
   * @returns {void}
   */
  private toggleChecked = (): void => {
    this.checked = !this.checked;
  };

  /**
   * Slots validation
   *
   * @returns {void}
   */
  private validateSlots = (): void => {
    const slots = Array.from(this.element.children);
    if (slots.length !== 2) {
      throw new Error('<mg-input-toggle> 2 slots are required.');
    } else if (!this.isIcon) {
      // Due to text-overflow set to ellipsis
      // we need to ensure that slot element have title to display value on mouse over
      slots.forEach(slot => slot.setAttribute('title', slot.textContent));
    }
  };

  /**
   * set checked state
   *
   * @returns {void}
   */
  private setChecked(): void {
    // has "value" props type is not a boolean, it is bind/render as an attributes/props
    // true props will be represent by "true" string so we convert it has boolean
    // true attribute will be represent by "" string so we convert it has boolean
    // https://stenciljs.com/docs/properties
    if (['', 'true'].includes(this.value as string) && this.options.find(option => option.value) !== undefined) {
      this.value = true;
    }

    this.checked = this.value === this.options[1].value;
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Check items format
    this.validateItems(this.items);
    // Check slots
    this.validateSlots();
    // init checked value
    this.setChecked();
    // apply handler
    this.handleIsOnOff(this.isOnOff);
    this.handleIsIcon(this.isIcon);
    this.handleReadonly(this.readonly);
    this.handleDisabled(this.disabled);
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <MgInput
        identifier={this.identifier}
        classList={this.classList}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={undefined}
        readonly={undefined}
        width={undefined}
        disabled={this.disabled}
        value={this.value as string}
        readonlyValue={undefined}
        tooltip={!this.readonly && this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={undefined}
        isFieldset={false}
      >
        <button
          type="button"
          role="switch"
          aria-checked={this.checked}
          aria-readonly={this.disabled || this.readonly}
          id={this.identifier}
          class="mg-input__button-toggle"
          disabled={this.disabled || this.readonly}
          onClick={this.toggleChecked}
        >
          <span aria-hidden="true" class="mg-input__toggle-item-container">
            <slot name="item-1"></slot>
          </span>
          <span aria-hidden="true" class="mg-input__toggle-item-container">
            <slot name="item-2"></slot>
          </span>
        </button>
      </MgInput>
    );
  }
}
