import { Component, Event, Host, h, Prop, Watch, EventEmitter, State } from '@stencil/core';
import { createID } from '../../utils/utils';

@Component({
  tag: 'mg-input-text',
  styleUrl: 'mg-input-text.scss',
  shadow: true,
})
export class MgInputText {

  /**
   * Internal
   */
  private displayCharacterLeftReference = '';

  /**
   * Component value
   */
   @Prop({ mutable: true, reflect: true }) value: string;

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
   * Define if input is disabled
   */
  @Prop() disabled: boolean;

  /**
   * Define if component should display character left
   */
   @Prop() displayCharacterLeft: boolean = true;

  /**
   * Template to use for characters left sentence
   */
   @Prop() characterLeftTemplate: string;

  /**
   * Aria attributes that need to be added to the input :
   * - nbCharLeft
   * - help text
   * - tooltip ?
   * (label is already linked throught for/id)
   */
  @State() ariaDescribedby: string[] = [this.displayCharacterLeftReference];

  /**
   * Emmited event when value change
   */
  @Event() changed: EventEmitter<string>


  /**
   *
   * @param event
   */
  handleChange(event) {
    this.value = event?.target?.value;
    this.changed.emit(this.value)
  }

  /**
   * Check if props are well configured on init
   */
  componentWillLoad() {
    this.validateLabel(this.label);
    this.displayCharacterLeftReference = `${this.reference}-character-left`;
  }

  /**
   * Render
   */
  render() {
    return (
      <Host>
        <mg-label reference={this.reference} required={this.required}>{this.label}</mg-label>
        <input
          type="text"
          id={this.reference}
          name={this.name}
          placeholder={this.placeholder}
          title={this.placeholder}
          value={this.value}
          maxlength={this.maxlength}
          disabled={this.disabled}
          required={this.required}
          aria-describedby={this.ariaDescribedby.join(' ')}
          onInput={(e) => this.handleChange(e)}
        />
        { this.displayCharacterLeft && <mg-character-left
          reference={this.displayCharacterLeftReference}
          characters={this.value}
          maxlength={this.maxlength}
          template={this.characterLeftTemplate}
        ></mg-character-left> }
      </Host>
    );
  }
}
