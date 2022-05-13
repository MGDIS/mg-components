import { h } from '@stencil/core';

export default {
  component: 'mg-input-text',
  title: 'Molecules/Inputs/mg-input-text',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => {
  const labelOnTop = args.labelOnTop;
  delete args.labelOnTop;
  const labelHide = args.labelHide;
  delete args.labelHide;
  const patternErrorMessage = args.patternErrorMessage;
  delete args.patternErrorMessage;
  const displayCharacterLeft = args.displayCharacterLeft;
  delete args.displayCharacterLeft;
  const characterLeftTemplate = args.characterLeftTemplate;
  delete args.characterLeftTemplate;
  const helpText = args.helpText;
  delete args.helpText;
  // return element
  return (
    <mg-input-text
      {...args}
      label-on-top={labelOnTop}
      label-hide={labelHide}
      pattern-error-message={patternErrorMessage}
      display-character-left={displayCharacterLeft ? 'true' : 'false'}
      character-left-template={characterLeftTemplate}
      help-text={helpText}
    ></mg-input-text>
  );
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
  // Tooltip
  tooltip: 'This is a tooltip',
  // Nb Char Left
  displayCharacterLeft: true,
  characterLeftTemplate: '{counter} characters left.',
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
 * Search
 */

const SearchTemplate = args => {
  const labelOnTop = args.labelOnTop;
  delete args.labelOnTop;
  const labelHide = args.labelHide;
  delete args.labelHide;
  const patternErrorMessage = args.patternErrorMessage;
  delete args.patternErrorMessage;
  const displayCharacterLeft = args.displayCharacterLeft;
  delete args.displayCharacterLeft;
  const characterLeftTemplate = args.characterLeftTemplate;
  delete args.characterLeftTemplate;
  // return element
  return (
    <form role="search">
      <mg-input-text
        {...args}
        label-on-top={labelOnTop}
        label-hide={labelHide}
        pattern-error-message={patternErrorMessage}
        display-character-left={displayCharacterLeft}
        character-left-template={characterLeftTemplate}
      >
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
