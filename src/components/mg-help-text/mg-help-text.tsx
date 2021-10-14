import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mg-help-text',
  styleUrl: 'mg-help-text.scss',
  scoped: true,
})
export class MgHelpText {

  // TODO : CHECK IF THIS COMPONENT IS REALLY USEFULL

  /**
   * Sets an `id` element.
   * Needed by the input for accessibility `arai-decribedby`.
   */
  @Prop() identifier: string;

  render() {
    return (
      <Host>
        <p id={this.identifier}><slot></slot></p>
      </Host>
    );
  }

}
