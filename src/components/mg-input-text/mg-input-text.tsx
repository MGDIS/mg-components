import { Component, Event, Host, h, Prop, Watch, EventEmitter, State, Element } from '@stencil/core';
import { createID } from '../../utils/utils';

@Component({
  tag: 'mg-input-text',
  styleUrl: 'mg-input-text.scss',
  shadow: true,
})
export class MgInputText {

  displayCharacterLeftReference ='';

  /**
   * Input reference used for the input ID (id is a reserved prop in Stencil.js)
   * If not set, an ID will be created
   */
  @Prop() reference?: string = createID('mg-input-text');

  /**
   * Input name
   * If not set the value equals the reference
   */
   @Prop() name?: string = this.reference;

  /**
   * Input label
   * Required
   */
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: string) {
    if (typeof newValue !== 'string' || newValue === '') {
      throw new Error('Label is a required prop')
    };
  }

  /**
   * Input placeholder
   */
  @Prop() placeholder: string;

  /**
   * Input max length
   */
   @Prop() maxlength: number = 400;

  /**
   * Define if input is required
   */
   @Prop() required: boolean;

   /**
   * Define if input is desabled
   */
  @Prop() disabled: boolean;

  /**
   *
   */
  @Prop({ mutable: true, reflect: true }) value: string;

  /**
   *
   */
  @State() displayCharacterLeft: boolean = false;

  /**
   *
   */
  @State() ariaDescribedby: string[] = [this.displayCharacterLeftReference];

  /**
   * Check if props are well configured on init
   */
   componentWillLoad() {
    this.validateLabel(this.label);
    this.displayCharacterLeftReference = `${this.reference}-character-left`;
  }

  handleChange(event) {
    this.value = event?.target?.value;
    this.changed.emit(this.value)
  }

  setDisplayCharacterLeft(isDisplayed) {
    this.displayCharacterLeft = isDisplayed;
  }

  @Event() changed: EventEmitter<string>

  render() {
    return (
      <Host>
        <mg-label reference={this.reference} required={this.required}>{this.label}</mg-label>
        <input
          type="text"
          id={this.reference}
          name={this.name}
          placeholder={this.placeholder}
          value={this.value}
          maxlength={this.maxlength}
          disabled={this.disabled}
          required={this.required}
          aria-describedby={this.ariaDescribedby.join(' ')}
          onInput={(e) => this.handleChange(e)}
          onFocus={() => this.setDisplayCharacterLeft(true)}
          onBlur={() => this.setDisplayCharacterLeft(false)}
        />
        { this.displayCharacterLeft && <mg-character-left reference={this.displayCharacterLeftReference} characters={this.value} maxlength={this.maxlength}></mg-character-left> }
      </Host>
    );
  }
}
