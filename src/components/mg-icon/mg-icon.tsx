import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mg-icon',
  styleUrl: 'mg-icon.css',
  shadow: true,
})
export class MgIcon {

  /**
   * Icon to display
   * Possible icons must be listed
   */
  @Prop() icon: "save" | "cancel"

  render() {
    return (
      <Host>
        <span class="mg-icon" aria-hidden="true"></span>
      </Host>
    );
  }

}
