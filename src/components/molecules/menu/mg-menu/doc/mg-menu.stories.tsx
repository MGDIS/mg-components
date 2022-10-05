import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';
import { Status } from '../../mg-menu-item/mg-menu-item.conf';
import { DisplayType } from '../mg-menu.conf';

export default {
  component: 'mg-menu',
  title: 'Molecules/menus/mg-menu',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
  <div>
    <mg-menu {...filterArgs(args)}>
      <mg-menu-item label="Bane"></mg-menu-item>
      <mg-menu-item label="Joker" status={Status.DISABLED}></mg-menu-item>
      <mg-menu-item icon={{ icon: 'user' }} label="Harley Quinn"></mg-menu-item>
      <mg-menu-item icon={{ icon: 'user' }} label="Batman" badge={{ value: 2, label: 'hello' }}>
        <mg-menu label="submenu" display={DisplayType.VERTICAL}>
          <mg-menu-item size={'medium'} label="Batman begins"></mg-menu-item>
          <mg-menu-item size={'medium'} icon={{ icon: 'user' }} label="The dark knight"></mg-menu-item>
          <mg-menu-item size={'medium'} icon={{ icon: 'user' }} label="The dark knight"></mg-menu-item>
          <mg-menu-item size={'medium'} icon={{ icon: 'user' }} label="Batman super trilogie" badge={{ value: 2, label: 'hello' }}>
            <mg-menu label="submenu 2" display={DisplayType.VERTICAL}>
              <mg-menu-item size={'regular'} label="Batman begins"></mg-menu-item>
              <mg-menu-item size={'regular'} icon={{ icon: 'user' }} label="The dark knight"></mg-menu-item>
              <mg-menu-item size={'regular'} icon={{ icon: 'user' }} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
            </mg-menu>
          </mg-menu-item>
          <mg-menu-item size={'medium'} icon={{ icon: 'user' }} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
        </mg-menu>
        {/* <div>
          compte utilisqateur
          <mg-button>login</mg-button>
          <mg-button>mon compte</mg-button>
        </div> */}
      </mg-menu-item>
      <mg-menu-item icon={{ icon: 'user' }} label="Batman" badge={{ value: 2, label: 'hello' }}>
        <mg-menu label="submenu" display={DisplayType.VERTICAL}>
          <mg-menu-item size={'medium'} label="Batman begins">
            <mg-menu label="submenu" display={DisplayType.VERTICAL}>
              <mg-menu-item size={'medium'} icon={{ icon: 'user' }} label="Batman trilogie" badge={{ value: 2, label: 'hello' }}>
                <mg-menu label="submenu 2" display={DisplayType.VERTICAL}>
                  <mg-menu-item size={'regular'} label="Batman begins" status={Status.ACTIVE}></mg-menu-item>
                  <mg-menu-item size={'regular'} icon={{ icon: 'user' }} label="The dark knight"></mg-menu-item>
                  <mg-menu-item size={'regular'} icon={{ icon: 'user' }} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
                </mg-menu>
              </mg-menu-item>
            </mg-menu>
          </mg-menu-item>
          <mg-menu-item size={'medium'} icon={{ icon: 'user' }} label="The dark knight"></mg-menu-item>
          <mg-menu-item size={'medium'} icon={{ icon: 'user' }} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
          <mg-menu-item size={'medium'} icon={{ icon: 'user' }} label="Batman trilogie" badge={{ value: 2, label: 'hello' }}>
            <mg-menu label="submenu 2" display={DisplayType.VERTICAL}>
              <mg-menu-item size={'regular'} label="Batman begins"></mg-menu-item>
              <mg-menu-item size={'regular'} icon={{ icon: 'user' }} label="The dark knight"></mg-menu-item>
              <mg-menu-item size={'regular'} icon={{ icon: 'user' }} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
            </mg-menu>
          </mg-menu-item>
          <mg-menu-item size={'medium'} icon={{ icon: 'user' }} label="The batman" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
        </mg-menu>
        {/* <div>
          compte utilisqateur
          <mg-button>login</mg-button>
          <mg-button>mon compte</mg-button>
        </div> */}
      </mg-menu-item>
    </mg-menu>
    {/* <mg-menu {...filterArgs(args)}>
      <mg-menu-item label="Bane"></mg-menu-item>
      <mg-menu-item label="Joker"></mg-menu-item>
      <mg-menu-item icon={{icon: "user"}} label="Harley Quinn"></mg-menu-item>
      <mg-menu-item icon={{icon: "user"}} label="Batman" badge={{ value: 2, label: 'hello' }}>
        <mg-menu label="submenu">
          <mg-menu-item label="Batman begins"></mg-menu-item>
          <mg-menu-item icon={{icon: "user"}} label="The dark knight"></mg-menu-item>
          <mg-menu-item icon={{icon: "user"}} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
          <mg-menu-item icon={{icon: "user"}} label="Batman" badge={{ value: 2, label: 'hello' }}>
            <mg-menu label="submenu 2">
              <mg-menu-item label="Batman begins"></mg-menu-item>
              <mg-menu-item icon={{icon: "user"}} label="The dark knight"></mg-menu-item>
              <mg-menu-item icon={{icon: "user"}} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
            </mg-menu>
          </mg-menu-item>
        </mg-menu>
      </mg-menu-item>
    </mg-menu>
    <div style={{width: "fit-content", backgroundColor: 'grey'}}>
      <mg-menu {...filterArgs(args)} display={DisplayType.VERTICAL}>
        <mg-menu-item label="Bane"></mg-menu-item>
        <mg-menu-item label="Joker"></mg-menu-item>
        <mg-menu-item icon={{icon: "user"}} label="Harley Quinn"></mg-menu-item>
        <mg-menu-item icon={{icon: "user"}} label="Batman" badge={{ value: 2, label: 'hello' }}>
          <mg-menu label="submenu" display={DisplayType.VERTICAL}>
            <mg-menu-item label="Batman begins"></mg-menu-item>
            <mg-menu-item icon={{icon: "user"}} label="The dark knight"></mg-menu-item>
            <mg-menu-item icon={{icon: "user"}} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
            <mg-menu-item icon={{icon: "user"}} label="Batman" badge={{ value: 2, label: 'hello' }}>
              <mg-menu label="submenu 2" display={DisplayType.VERTICAL}>
                <mg-menu-item label="Batman begins"></mg-menu-item>
                <mg-menu-item icon={{icon: "user"}} label="The dark knight"></mg-menu-item>
                <mg-menu-item icon={{icon: "user"}} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
              </mg-menu>
            </mg-menu-item>
          </mg-menu>
        </mg-menu-item>
      </mg-menu>
    </div>
    <div style={{width: "fit-content",  backgroundColor: 'green'}}>
      <mg-menu {...filterArgs(args)} display={DisplayType.VERTICAL}>
        <mg-menu-item label="Bane"></mg-menu-item>
        <mg-menu-item label="Joker"></mg-menu-item>
        <mg-menu-item icon={{icon: "user"}} label="Harley Quinn"></mg-menu-item>
        <mg-menu-item icon={{icon: "user"}} label="Batman" badge={{ value: 2, label: 'hello' }}>
          <mg-menu label="submenu">
            <mg-menu-item label="Batman begins"></mg-menu-item>
            <mg-menu-item icon={{icon: "user"}} label="The dark knight"></mg-menu-item>
            <mg-menu-item icon={{icon: "user"}} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
            <mg-menu-item icon={{icon: "user"}} label="Batman" badge={{ value: 2, label: 'hello' }}>
              <mg-menu label="submenu 2" display={DisplayType.VERTICAL}>
                <mg-menu-item label="Batman begins"></mg-menu-item>
                <mg-menu-item icon={{icon: "user"}} label="The dark knight"></mg-menu-item>
                <mg-menu-item icon={{icon: "user"}} label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
              </mg-menu>
            </mg-menu-item>
          </mg-menu>
        </mg-menu-item>
      </mg-menu>
    </div> */}
  </div>
);

export const MgMenu = Template.bind({});

MgMenu.args = {
  label: 'Batman menu',
};
