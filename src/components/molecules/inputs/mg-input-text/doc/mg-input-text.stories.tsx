import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-input-text',
  title: 'Molecules/Inputs/mg-input-text',
  argTypes: {
    mgWidth: {
      options: [2, 4, 16, 'full'],
      control: { type: 'select' },
    },
  },
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => {
  const displayCharacterLeft = args.displayCharacterLeft;
  delete args.displayCharacterLeft;
  // return element
  return <mg-input-text {...filterArgs(args)} display-character-left={displayCharacterLeft ? undefined : 'false'}></mg-input-text>;
};

/**
 * Global use
 */

export const MgInputText = Template.bind({});

MgInputText.args = {
  // Global
  value: '',
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Label',
  labelOnTop: false,
  labelHide: false,
  // Input
  placeholder: 'placeholder',
  maxlength: 400,
  required: true,
  disabled: false,
  readonly: false,
  pattern: undefined,
  patternErrorMessage: undefined,
  mgWidth: 'full',
  type: 'text',
  // Tooltip
  tooltip: 'This is a tooltip',
  // Nb Char Left
  displayCharacterLeft: true,
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};

/**
 * Email
 */

export const Email = Template.bind({});

Email.args = {
  ...MgInputText.args,
  // remove feature to focus on pattern
  tooltip: '',
  required: false,
  label: 'Adresse email',
  // Add pattern Email rules
  maxlength: 100,
  pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}',
  patternErrorMessage: "L'information saisie est incorrecte (exemple : prenom.nom@exemple.fr)",
  // Help Text
  helpText: 'exemple : prenom.nom@exemple.fr',
};

/**
 * Emails
 */

export const Emails = Template.bind({});

Emails.args = {
  ...Email.args,
  label: 'Adresses email',
  // Add pattern Emails rules
  maxlength: 200,
  pattern: '([a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}(;)*)+',
  patternErrorMessage: "L'information saisie est incorrecte (exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr)",
  // Help Text
  helpText: 'exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr',
};

/**
 * RNA
 */

export const RNA = Template.bind({});
RNA.args = {
  ...Emails.args,
  label: 'RNA',
  // Add pattern RNA rules
  maxlength: 10,
  pattern: '(W[0-9]{1}[a-zA-Z0-9]{1}[0-9]{7})',
  patternErrorMessage: "Le numéro RNA n'est pas valide (exemple: W123456789)",
  // Help Text
  helpText: 'exemple : W123456789',
};

/**
 * URL
 */

export const URL = Template.bind({});
URL.args = {
  ...Emails.args,
  label: 'URL',
  // Add pattern URL rules
  maxlength: 200,
  pattern: 'https?://(?:www.)?([-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b)*(/[/dw.-]*)*(?:[?])*(.+)*',
  patternErrorMessage: "Le format du champ n'est pas valide (exemple: https://www.exemple.fr)",
  // Help Text
  helpText: 'Exemple: https://www.exemple.fr',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchTemplate = (args: any): HTMLElement => {
  const displayCharacterLeft = args.displayCharacterLeft;
  delete args.displayCharacterLeft;
  // return element
  return (
    <form role="search">
      <mg-input-text {...filterArgs(args)} display-character-left={displayCharacterLeft ? undefined : 'false'}>
        <mg-button slot="append-input" label="search">
          <mg-icon icon="magnifying-glass"></mg-icon> Search
        </mg-button>
      </mg-input-text>
    </form>
  );
};

export const Search = SearchTemplate.bind({});

Search.args = {
  ...MgInputText.args,
  type: 'search',
  icon: 'magnifying-glass',
};
