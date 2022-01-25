import { Component, Event, h, Prop, EventEmitter, State, Watch, Element } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList, allItemsAreString } from '../../../../utils/components.utils';
import { ToggleValue } from '../../../../types/components.types'
import { messages } from '../../../../locales';

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

  private classError = 'is-not-valid';
  private classToggleActive = 'mg-input--toggle-active';

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
  @Prop({ mutable:true, reflect: true }) value?: any;
  @Watch('value')
  handleValue(newValue:any) {
    if (newValue === this.options[1].value || newValue === '') {
      this.classList.add(this.classToggleActive);
    } else {
      this.classList.delete(this.classToggleActive);
    }

    this.valueChange.emit(this.value);
  }

  /**
  * Items are the possible options to select
  * Required
  */
  @Prop() items!: string[] | ToggleValue[];
  @Watch('items')
  validateItems(newValue){
    if (typeof newValue === 'object' && this.items.length !== 2) {
      throw new Error('<mg-input-toggle> prop "items" require 2 items.')
    }
    // String array
    else if(allItemsAreString(newValue)) {
      this.options = newValue.map(item => ({ title:item, value:item }));
    }
    // Object array
    else if(newValue && (newValue as Array<ToggleValue>).every(item => isOption(item))) {
      this.options = newValue;
    } else {
      throw new Error('<mg-input-toggle> prop "items" is required and all items must be the same type: ToggleValue.')
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
    if(newValue) this.classList.add(`mg-input--toggle-is-on-off`);
  }

  /**
  * Define if toggle display icon
  */
  @Prop() isIcon?: boolean = false;
  @Watch('isIcon')
  handleIsIcon(newValue: boolean) {
    if(newValue) this.classList.add(`mg-input--toggle-is-icon`);
  }

  /**
  * Define if input is required
  */
  @Prop() required: boolean = false;

  /**
  * Define if input is readonly
  */
  @Prop() readonly: boolean = false;
  @Watch('readonly')
  handleReadonly(newValue: boolean) {
    if(newValue) this.classList.add(`mg-input--toggle-readonly`);
  }

  /**
  * Define if input is disabled
  */
  @Prop() disabled: boolean = false;
  @Watch('disabled')
  handleDisabled(newValue: boolean) {
    if(newValue) this.classList.add(`mg-input--toggle-disabled`);
  }

  /**
  * Add a tooltip message next to the input
  */
  @Prop() tooltip: string;

  /**
  * Template to use for characters left sentence
  */
  @Prop() helpText: string;

  /**
  * Force valid component
  */
  @Prop({ mutable: true, reflect: true }) valid: boolean;

  /**
  * Force invalid component
  */
  @Prop({ mutable: true, reflect: true }) invalid: boolean;

  /**
  * Component classes
  */
  @State() classList: ClassList = new ClassList(['mg-input--toggle']);

  /**
  * Formated items for display
  */
  @State() options: ToggleValue[];

  /**
  * Error message to display
  */
  @State() errorMessage: string;

  /**
  * Emmited event when value change
  */
  @Event() valueChange: EventEmitter<any>

  /**
   * Change value
   */
  private toggleValue = () => {
    // case value is not set
    if (this.value === undefined) {
      this.value = this.options[1].value
      // case value is true, as DOM rewrite true as blank string when it's render
    } else if ( this.value === '') {
      this.value = this.options[0].value
    } else {
      this.value = this.options.find(o => o.value !== this.value).value;
    }
  }

  /**
  * Handle input event
  * @param event
  */
  private handleToggleClick = () => this.toggleValue();

  /**
   * Handle keyboard event
   * @param event
   */
  private handleToggleKeyboard = (event: KeyboardEvent) => {
    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.code)) {
      this.toggleValue();
    }
  }

  /**
  * Handle blur event
  * @param event
  */
  private handleBlur = () => {
    // Manage focus
    this.classList = new ClassList(this.classList.classes);

    // Check validity
    this.checkValidity();
  }

  /**
  * Check if input is valid
  * @param element
  */
  private checkValidity() {
    const valueMissing :boolean = this.value === undefined ? true : false;

    // Set error message
    this.errorMessage = undefined;
    if(valueMissing) {
      this.errorMessage = messages.errors.required;
    }

    // Set validity
    this.valid = valueMissing === false;
    this.invalid = !this.valid;

    // Update class
    if(this.valid) {
      this.classList.delete(this.classError);
    }
    else {
      this.classList.add(this.classError);
    }
  }

  /**
  * Due to text-overflow set to ellipsis
  * we need to ensure that slot element have title to display value on mous over
  */
  private addTitleOnTextSlot () {
    if (!this.isIcon) {
      const slots = Array.from(this.element.children);
      slots.forEach(slot => slot.setAttribute('title', slot.textContent));
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
    this.handleValue(this.value);
    this.handleIsOnOff(this.isOnOff);
    this.handleIsIcon(this.isIcon);
    this.handleReadonly(this.readonly);
    this.handleDisabled(this.disabled);
    this.addTitleOnTextSlot()
  }

  render() {
    return (<MgInput
      identifier={this.identifier}
      classList={this.classList}
      label={this.label}
      labelOnTop={this.labelOnTop}
      labelHide={this.labelHide}
      required={this.required}
      readonly={false}
      value={this.value?.toString()}
      readonlyValue={undefined}
      tooltip={!this.readonly && this.tooltip}
      displayCharacterLeft={undefined}
      characterLeftTemplate={undefined}
      maxlength={undefined}
      helpText={this.helpText}
      errorMessage={this.errorMessage}
      isFieldset={false}
    >
        <button
          type="button"
          role="switch"
          aria-checked={this.value === this.options[1].value}
          id={this.identifier}
          class="mg-input__button-toggle"
          disabled={this.disabled || this.readonly}
          onBlur={this.handleBlur}
          onClick={this.handleToggleClick}
          onKeyDown={this.handleToggleKeyboard}
        >
          <span aria-hidden="true" class="toggle-button__toggle-item-container">
            <slot name="item-1"></slot>
          </span>
          <span aria-hidden="true" class="toggle-button__toggle-item-container">
            <slot name="item-2"></slot>
          </span>
        </button>
    </MgInput>)
  }
}
