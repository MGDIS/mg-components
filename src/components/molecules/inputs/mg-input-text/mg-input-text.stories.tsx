import { h } from "@stencil/core";

export default {
  component: 'mg-input-text',
  title: 'Molecules/mg-input-text',
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */
const Template = args => (
  <mg-input-text
    {...args}
    label-on-top={args.labelOnTop}
    label-colon={args.labelColon}
    pattern-error-message={args.patternErrorMessage}
    display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
    character-left-template={args.characterLeftTemplate}
    help-text={args.helpText}
  ></mg-input-text>
);

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
  labelColon: true,
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

// Set exemple code for component
MgInputText.parameters = {
  docs: {
    source: {
      code: `<mg-input-text
  value="${MgInputText.args.value}"
  label="${MgInputText.args.label}"
  tooltip="${MgInputText.args.tooltip}"
  help-text="${MgInputText.args.helpText}"
  required
  has-colon
></mg-input-text>`,
    },
  },
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
  labelColon: false,
  label: "Adresse email",
  // Add pattern Email rules
  maxlength: 100,
  pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}',
  patternErrorMessage: 'L\'information saisie est incorrecte (exemple : prenom.nom@exemple.fr)',
  // Help Text
  helpText: 'exemple : prenom.nom@exemple.fr',
}

// Set exemple code for component
Email.parameters = {
  docs: {
    source: {
      code: `<mg-input-text
  value="${Email.args.value}"
  label="${Email.args.label}"
  maxlength="${Email.args.maxlength}"
  pattern="${Email.args.pattern}"
  pattern-error-message="${Email.args.patternErrorMessage}"
  help-text="${Email.args.helpText}"
></mg-input-text>`,
    },
  },
};

/**
 * Emails
 */

export const Emails = Template.bind({});

Emails.args = {
  ...Email.args,
  label: "Adresses email",
  // Add pattern Emails rules
  maxlength: 200,
  pattern: '([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}(;)*)+',
  patternErrorMessage: 'L\'information saisie est incorrecte (exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr)',
  // Help Text
  helpText: 'exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr',
}

// Set exemple code for component
Emails.parameters = {
  docs: {
    source: {
      code: `<mg-input-text
  value="${Emails.args.value}"
  label="${Emails.args.label}"
  maxlength="${Emails.args.maxlength}"
  pattern="${Emails.args.pattern}"
  pattern-error-message="${Emails.args.patternErrorMessage}"
  help-text="${Emails.args.helpText}"
></mg-input-text>`,
    },
  },
};

/**
 * RNA
 */

export const RNA = Template.bind({});
RNA.args = {
  ...Emails.args,
  label: "RNA",
  // Add pattern RNA rules
  maxlength: 10,
  pattern: '(W[0-9]{1}[a-zA-Z0-9]{1}[0-9]{7})',
  patternErrorMessage: 'Le numéro RNA n\'est pas valide (exemple: W123456789)',
  // Help Text
  helpText: 'exemple : W123456789',
}

// Set exemple code for component
RNA.parameters = {
  docs: {
    source: {
      code: `<mg-input-text
  value="${RNA.args.value}"
  label="${RNA.args.label}"
  maxlength="${RNA.args.maxlength}"
  pattern="${RNA.args.pattern}"
  pattern-error-message="${RNA.args.patternErrorMessage}"
  help-text="${RNA.args.helpText}"
></mg-input-text>`,
    },
  },
};

/**
 * URL
 */

 export const URL = Template.bind({});
 URL.args = {
   ...Emails.args,
   label: "URL",
   // Add pattern URL rules
   maxlength: 200,
   pattern: 'https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*',
   patternErrorMessage: 'Le format du champ n\'est pas valide (exemple: https://www.exemple.fr)',
   // Help Text
   helpText: 'Exemple: https://www.exemple.fr',
 }

 // Set exemple code for component
 URL.parameters = {
   docs: {
     source: {
       code: `<mg-input-text
   value="${URL.args.value}"
   label="${URL.args.label}"
   maxlength="${URL.args.maxlength}"
   pattern="${URL.args.pattern}"
   pattern-error-message="${URL.args.patternErrorMessage}"
   help-text="${URL.args.helpText}"
 ></mg-input-text>`,
     },
   },
 };
