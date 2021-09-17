import { Component, Host, h, Prop, Watch, getAssetPath } from '@stencil/core';

// TODO : Work on Accessible SVGs
@Component({
  tag: 'mg-icon',
  styleUrl: 'mg-icon.scss',
  assetsDirs: ['assets'],
  shadow: true,
})
export class MgIcon {

  /**
   * Internal
   */
   classes = ['mg-icon'];
   icons = ["user-cadenas", "editable"];
   sizes = ["regular", "large"];

  /**
   * Icon to display
   */
  @Prop() icon: string
  @Watch('icon')
  validateIcon(newValue: string) {
    if(!this.icons.includes(newValue)) {
      throw new Error(`<mg-icon> prop "icon" must be one of : ${this.icons.join(', ')}`);
    }
    this.classes.push(`mg-icon-${this.icon}`);
  }

  /**
   * Define icon size
   */
  @Prop() size: string = "regular"
  @Watch('size')
  validateSize(newValue: string) {
    if(!this.sizes.includes(newValue)) {
      throw new Error(`<mg-icon> prop "size" must be one of : ${this.sizes.join(', ')}`);
    }
    this.classes.push(`mg-icon-${this.size}`);
  }

  /**
   * Check if props are well configured on init
   */
  componentWillLoad() {
    this.validateIcon(this.icon);
    this.validateSize(this.size);
  }

  /**
  * Render component
  */
  render() {
    return (
      <Host>
        <svg class={this.classes.join(' ')} >
          <use xlinkHref={getAssetPath('./assets/icons.svg') + `#${this.icon}`}></use>
        </svg>
      </Host>
    );
  }

}
