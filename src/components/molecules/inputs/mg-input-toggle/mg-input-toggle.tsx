import { Component, Event, h, Prop, EventEmitter, State, Watch, Element } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList, allItemsAreString } from '../../../../utils/components.utils';
import { ToggleValue } from './mg-input-toggle.conf';

/**
 * type Option validation function
 * @param option
 * @returns {boolean}
 */
const isOption = (option: ToggleValue): boolean => typeof option === 'object' && typeof option.title === 'string' && option.value !== undefined;

@Component({
  tag: 'mg-input-toggle',
  styleUrl: 'mg-input-toggle.scss',
  scoped: true,
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
  @Prop({ mutable: true }) value?: any;

  /**
   * Items are the possible options to select
   * Required
   */
  @Prop() items!: string[] | ToggleValue[];
  @Watch('items')
  validateItems(newValue) {
    if (typeof newValue === 'object' && this.items.length !== 2) {
      throw new Error('<mg-input-toggle> prop "items" require 2 items.');
    }
    // String array
    else if (allItemsAreString(newValue)) {
      this.options = newValue.map(item => ({ title: item, value: item }));
    }
    // Object array
    else if (newValue && (newValue as Array<ToggleValue>).every(item => isOption(item))) {
      this.options = newValue;
    } else {
      throw new Error('<mg-input-toggle> prop "items" is required and all items must be the same type: ToggleValue.');
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier?: string = createID('mg-input-toggle');

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name?: string = this.identifier;

  /**
   * Input label
   * Required
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop: boolean;

  /**
   * Define if label is visible
   */
  @Prop() labelHide: boolean = false;

  /**
   * Define if toggle have on/off style
   */
  @Prop() isOnOff?: boolean = false;
  @Watch('isOnOff')
  handleIsOnOff(newValue: boolean) {
    if (newValue) this.classList.add(`mg-input--toggle-on-off`);
  }

  /**
   * Define if toggle display icon
   */
  @Prop() isIcon?: boolean = false;
  @Watch('isIcon')
  handleIsIcon(newValue: boolean) {
    if (newValue) this.classList.add(`mg-input--toggle-icon`);
  }

  /**
   * Define if input is readonly
   */
  @Prop() readonly: boolean = false;
  @Watch('readonly')
  handleReadonly(newValue: boolean) {
    if (newValue) this.classList.add(this.classReadonly);
    else this.classList.delete(this.classReadonly);
  }

  /**
   * Define if input is disabled
   */
  @Prop() disabled: boolean = false;
  @Watch('disabled')
  handleDisabled(newValue: boolean) {
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
  @State() checked: boolean = false;
  @Watch('checked')
  handleChecked(newValue) {
    // style
    if (newValue) this.classList.add(this.classIsActive);
    else this.classList.delete(this.classIsActive);

    // update value
    this.value = this.options[this.checked ? 1 : 0].value;
    this.valueChange.emit(this.value);
  }

  /**
   * Emmited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<any>;

  /**
   * Change checked value
   */
  private toggleChecked = () => {
    this.setChecked(!this.checked);
  };

  /**
   * Slots validation
   */
  private validateSlots = () => {
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
   * @param newValue?
   */
  private setChecked(newValue?) {
    // has "value" props type is not a boolean, it is bind/render as an attributes
    // true props will be represent by "" string so we convert it has boolean
    // https://stenciljs.com/docs/properties
    this.value = this.value === '' && typeof this.options[1].value === 'boolean' ? true : this.value;
    if (newValue !== undefined) {
      this.checked = newValue;
    } else if (this.value === this.options[1].value) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad() {
    // Check items format
    this.validateItems(this.items);
    // init checked value
    this.setChecked();

    // apply handler
    this.handleIsOnOff(this.isOnOff);
    this.handleIsIcon(this.isIcon);
    this.handleReadonly(this.readonly);
    this.handleDisabled(this.disabled);
    this.validateSlots();
  }

  render() {
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
        value={this.value?.toString()}
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
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => this.toggleChecked()}
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
