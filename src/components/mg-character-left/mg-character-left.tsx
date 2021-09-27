import { Component, Host, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'mg-character-left',
  styleUrl: 'mg-character-left.scss',
  scoped: true,
})
export class MgCharacterLeft {

  /**
   * Reference
   * Element ID for a11y link
   */
   @Prop() reference: string;

  /**
   * Characters to count
   */
  @Prop() characters!: string;
  @Watch('characters')
  watchPropHandler() {
    this.characterLeft = this.getCharacterLeft();
  }

  /**
   * Character max length
   */
   @Prop() maxlength!: number;

  /**
   * Character left
   */
  @State() characterLeft: number = this.getCharacterLeft();

  /**
   * Calculate number character left
   * @returns {number}
   */
  getCharacterLeft() {
    return this.maxlength - this.characters.length
  }

  /**
   * Render
   */
  render() {
    return (
      <Host>
        <p id={this.reference}>Reste {this.characterLeft} caractères à saisir</p>
      </Host>
    );
  }

}
