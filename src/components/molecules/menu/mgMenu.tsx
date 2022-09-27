import { FunctionalComponent, h, VNode, Host } from '@stencil/core';
import { ClassList } from '../../../utils/components.utils';
import { DisplayType } from './mgMenu.conf';

/**
 * MgMenu Interface
 */
interface MgMenuProps {
  // Global
  identifier: string;
  classList: ClassList;
  label: string;
  display: DisplayType;
  isChild?: boolean;
}

/**
 * Get input template
 *
 * @param {MgMenuProps} props MgInput Interface Props
 * @param {VNode[]} children Represent scoped elements
 * @returns {VNode[]} input template
 */
export const MgMenu: FunctionalComponent<MgMenuProps> = (props: MgMenuProps, children: VNode[]): VNode[] => {
  return (
    <Host id={props.identifier} role={props.isChild ? 'menu' : 'menubar'} aria-label={props.label} class={props.classList.join()}>
      {children}
    </Host>
  );
};
