/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Option } from "./components/molecules/inputs/mg-input-select/mg-input-select";
export namespace Components {
    interface MgButton {
        /**
          * Disable button
         */
        "disabled": boolean;
        /**
          * Define if button is round. Used for icon button.
         */
        "isIcon": boolean;
        /**
          * aria-label In case button text is not explicit enough
         */
        "label": string;
        /**
          * Define button variant
         */
        "variant": string;
    }
    interface MgCharacterLeft {
        /**
          * Sets the characters to count
         */
        "characters": string;
        /**
          * Sets an `id` element. Needed by the input for accessibility `arai-decribedby`.
         */
        "identifier": string;
        /**
          * Add maximum length
         */
        "maxlength": number;
        /**
          * Template to display remaining characters. Must have {counter} inside
         */
        "template": string;
    }
    interface MgHelpText {
        /**
          * Sets an `id` element. Needed by the input for accessibility `arai-decribedby`.
         */
        "identifier": string;
    }
    interface MgIcon {
        /**
          * Icon to display
         */
        "icon": string;
        /**
          * Define icon size
         */
        "size": string;
    }
    interface MgInputCheckbox {
        /**
          * Define if input is disabled
         */
        "disabled": boolean;
        /**
          * Template to use for characters left sentence
         */
        "helpText": string;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Manage indeterminate state
          * @see https ://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/checkbox#g%C3%A9rer_un_%C3%A9tat_ind%C3%A9termin%C3%A9
         */
        "indeterminate": boolean;
        /**
          * Force invalid component
         */
        "invalid": boolean;
        /**
          * Input label Required
         */
        "label": string;
        /**
          * Define if label has colon ":"
         */
        "labelColon": boolean;
        /**
          * Define if label is displayed on top
         */
        "labelOnTop": boolean;
        /**
          * Input name If not set the value equals the identifier
         */
        "name"?: string;
        /**
          * Define if input is readonly
         */
        "readonly": boolean;
        /**
          * Define if input is required
         */
        "required": boolean;
        /**
          * Add a tooltip message next to the input
         */
        "tooltip": string;
        /**
          * Force valid component
         */
        "valid": boolean;
        /**
          * Component value If not set, checkbox will be indeterminate by default
         */
        "value"?: boolean;
    }
    interface MgInputDate {
        /**
          * Define if input is disabled
         */
        "disabled": boolean;
        /**
          * Template to use for characters left sentence
         */
        "helpText": string;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Define input pattern error message
         */
        "invalid": boolean;
        /**
          * Input label Required
         */
        "label": string;
        /**
          * Define if label has colon ":"
         */
        "labelColon": boolean;
        /**
          * Define if label is displayed on top
         */
        "labelOnTop": boolean;
        /**
          * Input name If not set the value equals the identifier
         */
        "name"?: string;
        /**
          * Define if input is readonly
         */
        "readonly": boolean;
        /**
          * Define if input is required
         */
        "required": boolean;
        /**
          * Add a tooltip message next to the input
         */
        "tooltip": string;
        /**
          * Define input pattern to validate
         */
        "valid": boolean;
        /**
          * Component value
         */
        "value": string;
    }
    interface MgInputSelect {
        /**
          * Define if input is disabled
         */
        "disabled": boolean;
        /**
          * Template to use for characters left sentence
         */
        "helpText": string;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Define input invalid state
         */
        "invalid": boolean;
        /**
          * Items are the possible options to select
         */
        "items": string[] | Option[];
        /**
          * Input label Required
         */
        "label": string;
        /**
          * Define if label has colon ":"
         */
        "labelColon": boolean;
        /**
          * Define if label is displayed on top
         */
        "labelOnTop": boolean;
        /**
          * Input name If not set the value equals the identifier
         */
        "name"?: string;
        /**
          * Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
         */
        "placeholder": string;
        /**
          * Define if input is readonly
         */
        "readonly": boolean;
        /**
          * Define if input is required
         */
        "required": boolean;
        /**
          * Add a tooltip message next to the input
         */
        "tooltip": string;
        /**
          * Define input valid state
         */
        "valid": boolean;
        /**
          * Component value
         */
        "value": string;
    }
    interface MgInputText {
        /**
          * Template to use for characters left sentence
         */
        "characterLeftTemplate": string;
        /**
          * Define if input is disabled
         */
        "disabled": boolean;
        /**
          * Define if component should display character left
         */
        "displayCharacterLeft": boolean;
        /**
          * Template to use for characters left sentence
         */
        "helpText": string;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Define input pattern error message
         */
        "invalid": boolean;
        /**
          * Input label Required
         */
        "label": string;
        /**
          * Define if label has colon ":"
         */
        "labelColon": boolean;
        /**
          * Define if label is displayed on top
         */
        "labelOnTop": boolean;
        /**
          * Input max length
         */
        "maxlength": number;
        /**
          * Input name If not set the value equals the identifier
         */
        "name"?: string;
        /**
          * Define input pattern to validate
         */
        "pattern": string;
        /**
          * Define input pattern error message
         */
        "patternErrorMessage": string;
        /**
          * Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
         */
        "placeholder": string;
        /**
          * Define if input is readonly
         */
        "readonly": boolean;
        /**
          * Define if input is required
         */
        "required": boolean;
        /**
          * Add a tooltip message next to the input
         */
        "tooltip": string;
        /**
          * Define input pattern to validate
         */
        "valid": boolean;
        /**
          * Component value
         */
        "value": string;
    }
    interface MgInputTextarea {
        /**
          * Template to use for characters left sentence
         */
        "characterLeftTemplate": string;
        /**
          * Define if input is disabled
         */
        "disabled": boolean;
        /**
          * Define if component should display character left
         */
        "displayCharacterLeft": boolean;
        /**
          * Template to use for characters left sentence
         */
        "helpText": string;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Define input pattern error message
         */
        "invalid": boolean;
        /**
          * Input label Required
         */
        "label": string;
        /**
          * Define if label has colon ":"
         */
        "labelColon": boolean;
        /**
          * Define if label is displayed on top
         */
        "labelOnTop": boolean;
        /**
          * Input max length
         */
        "maxlength": number;
        /**
          * Input name If not set the value equals the identifier
         */
        "name"?: string;
        /**
          * Define input pattern to validate
         */
        "pattern": string;
        /**
          * Define input pattern error message
         */
        "patternErrorMessage": string;
        /**
          * Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
         */
        "placeholder": string;
        /**
          * Define if input is readonly
         */
        "readonly": boolean;
        /**
          * Define if input is required
         */
        "required": boolean;
        /**
          * Define input pattern error message
         */
        "rows": number;
        /**
          * Add a tooltip message next to the input
         */
        "tooltip": string;
        /**
          * Define input pattern to validate
         */
        "valid": boolean;
        /**
          * Component value
         */
        "value": string;
    }
    interface MgLabel {
        /**
          * Add a colon punctuation after label text
         */
        "colon": boolean;
        /**
          * Label input id
         */
        "identifier": string;
        /**
          * If input is required an asterisk is added at the end of the label
         */
        "required": boolean;
    }
    interface MgMessage {
        /**
          * Define if message has a cross button RG 01: https://jira.mgdis.fr/browse/PDA9-140
         */
        "closeButton"?: boolean;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Message type
         */
        "type"?: string;
    }
    interface MgTag {
        /**
          * Define button variant
         */
        "variant": string;
    }
    interface MgTooltip {
        /**
          * Sets an `id` element. Needed by the input for accessibility `arai-decribedby`.
         */
        "identifier"?: string;
        /**
          * Displayed message in the tooltip
         */
        "message": string;
    }
}
declare global {
    interface HTMLMgButtonElement extends Components.MgButton, HTMLStencilElement {
    }
    var HTMLMgButtonElement: {
        prototype: HTMLMgButtonElement;
        new (): HTMLMgButtonElement;
    };
    interface HTMLMgCharacterLeftElement extends Components.MgCharacterLeft, HTMLStencilElement {
    }
    var HTMLMgCharacterLeftElement: {
        prototype: HTMLMgCharacterLeftElement;
        new (): HTMLMgCharacterLeftElement;
    };
    interface HTMLMgHelpTextElement extends Components.MgHelpText, HTMLStencilElement {
    }
    var HTMLMgHelpTextElement: {
        prototype: HTMLMgHelpTextElement;
        new (): HTMLMgHelpTextElement;
    };
    interface HTMLMgIconElement extends Components.MgIcon, HTMLStencilElement {
    }
    var HTMLMgIconElement: {
        prototype: HTMLMgIconElement;
        new (): HTMLMgIconElement;
    };
    interface HTMLMgInputCheckboxElement extends Components.MgInputCheckbox, HTMLStencilElement {
    }
    var HTMLMgInputCheckboxElement: {
        prototype: HTMLMgInputCheckboxElement;
        new (): HTMLMgInputCheckboxElement;
    };
    interface HTMLMgInputDateElement extends Components.MgInputDate, HTMLStencilElement {
    }
    var HTMLMgInputDateElement: {
        prototype: HTMLMgInputDateElement;
        new (): HTMLMgInputDateElement;
    };
    interface HTMLMgInputSelectElement extends Components.MgInputSelect, HTMLStencilElement {
    }
    var HTMLMgInputSelectElement: {
        prototype: HTMLMgInputSelectElement;
        new (): HTMLMgInputSelectElement;
    };
    interface HTMLMgInputTextElement extends Components.MgInputText, HTMLStencilElement {
    }
    var HTMLMgInputTextElement: {
        prototype: HTMLMgInputTextElement;
        new (): HTMLMgInputTextElement;
    };
    interface HTMLMgInputTextareaElement extends Components.MgInputTextarea, HTMLStencilElement {
    }
    var HTMLMgInputTextareaElement: {
        prototype: HTMLMgInputTextareaElement;
        new (): HTMLMgInputTextareaElement;
    };
    interface HTMLMgLabelElement extends Components.MgLabel, HTMLStencilElement {
    }
    var HTMLMgLabelElement: {
        prototype: HTMLMgLabelElement;
        new (): HTMLMgLabelElement;
    };
    interface HTMLMgMessageElement extends Components.MgMessage, HTMLStencilElement {
    }
    var HTMLMgMessageElement: {
        prototype: HTMLMgMessageElement;
        new (): HTMLMgMessageElement;
    };
    interface HTMLMgTagElement extends Components.MgTag, HTMLStencilElement {
    }
    var HTMLMgTagElement: {
        prototype: HTMLMgTagElement;
        new (): HTMLMgTagElement;
    };
    interface HTMLMgTooltipElement extends Components.MgTooltip, HTMLStencilElement {
    }
    var HTMLMgTooltipElement: {
        prototype: HTMLMgTooltipElement;
        new (): HTMLMgTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "mg-button": HTMLMgButtonElement;
        "mg-character-left": HTMLMgCharacterLeftElement;
        "mg-help-text": HTMLMgHelpTextElement;
        "mg-icon": HTMLMgIconElement;
        "mg-input-checkbox": HTMLMgInputCheckboxElement;
        "mg-input-date": HTMLMgInputDateElement;
        "mg-input-select": HTMLMgInputSelectElement;
        "mg-input-text": HTMLMgInputTextElement;
        "mg-input-textarea": HTMLMgInputTextareaElement;
        "mg-label": HTMLMgLabelElement;
        "mg-message": HTMLMgMessageElement;
        "mg-tag": HTMLMgTagElement;
        "mg-tooltip": HTMLMgTooltipElement;
    }
}
declare namespace LocalJSX {
    interface MgButton {
        /**
          * Disable button
         */
        "disabled"?: boolean;
        /**
          * Define if button is round. Used for icon button.
         */
        "isIcon"?: boolean;
        /**
          * aria-label In case button text is not explicit enough
         */
        "label"?: string;
        /**
          * Define button variant
         */
        "variant"?: string;
    }
    interface MgCharacterLeft {
        /**
          * Sets the characters to count
         */
        "characters"?: string;
        /**
          * Sets an `id` element. Needed by the input for accessibility `arai-decribedby`.
         */
        "identifier"?: string;
        /**
          * Add maximum length
         */
        "maxlength": number;
        /**
          * Template to display remaining characters. Must have {counter} inside
         */
        "template"?: string;
    }
    interface MgHelpText {
        /**
          * Sets an `id` element. Needed by the input for accessibility `arai-decribedby`.
         */
        "identifier"?: string;
    }
    interface MgIcon {
        /**
          * Icon to display
         */
        "icon"?: string;
        /**
          * Define icon size
         */
        "size"?: string;
    }
    interface MgInputCheckbox {
        /**
          * Define if input is disabled
         */
        "disabled"?: boolean;
        /**
          * Template to use for characters left sentence
         */
        "helpText"?: string;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Manage indeterminate state
          * @see https ://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/checkbox#g%C3%A9rer_un_%C3%A9tat_ind%C3%A9termin%C3%A9
         */
        "indeterminate"?: boolean;
        /**
          * Force invalid component
         */
        "invalid"?: boolean;
        /**
          * Input label Required
         */
        "label": string;
        /**
          * Define if label has colon ":"
         */
        "labelColon"?: boolean;
        /**
          * Define if label is displayed on top
         */
        "labelOnTop"?: boolean;
        /**
          * Input name If not set the value equals the identifier
         */
        "name"?: string;
        /**
          * Emitted event when value change
         */
        "onValueChange"?: (event: CustomEvent<boolean>) => void;
        /**
          * Define if input is readonly
         */
        "readonly"?: boolean;
        /**
          * Define if input is required
         */
        "required"?: boolean;
        /**
          * Add a tooltip message next to the input
         */
        "tooltip"?: string;
        /**
          * Force valid component
         */
        "valid"?: boolean;
        /**
          * Component value If not set, checkbox will be indeterminate by default
         */
        "value"?: boolean;
    }
    interface MgInputDate {
        /**
          * Define if input is disabled
         */
        "disabled"?: boolean;
        /**
          * Template to use for characters left sentence
         */
        "helpText"?: string;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Define input pattern error message
         */
        "invalid"?: boolean;
        /**
          * Input label Required
         */
        "label": string;
        /**
          * Define if label has colon ":"
         */
        "labelColon"?: boolean;
        /**
          * Define if label is displayed on top
         */
        "labelOnTop"?: boolean;
        /**
          * Input name If not set the value equals the identifier
         */
        "name"?: string;
        /**
          * Emmited event when value change
         */
        "onValueChange"?: (event: CustomEvent<string>) => void;
        /**
          * Define if input is readonly
         */
        "readonly"?: boolean;
        /**
          * Define if input is required
         */
        "required"?: boolean;
        /**
          * Add a tooltip message next to the input
         */
        "tooltip"?: string;
        /**
          * Define input pattern to validate
         */
        "valid"?: boolean;
        /**
          * Component value
         */
        "value"?: string;
    }
    interface MgInputSelect {
        /**
          * Define if input is disabled
         */
        "disabled"?: boolean;
        /**
          * Template to use for characters left sentence
         */
        "helpText"?: string;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Define input invalid state
         */
        "invalid"?: boolean;
        /**
          * Items are the possible options to select
         */
        "items": string[] | Option[];
        /**
          * Input label Required
         */
        "label": string;
        /**
          * Define if label has colon ":"
         */
        "labelColon"?: boolean;
        /**
          * Define if label is displayed on top
         */
        "labelOnTop"?: boolean;
        /**
          * Input name If not set the value equals the identifier
         */
        "name"?: string;
        /**
          * Emmited event when value change
         */
        "onValueChange"?: (event: CustomEvent<string>) => void;
        /**
          * Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
         */
        "placeholder"?: string;
        /**
          * Define if input is readonly
         */
        "readonly"?: boolean;
        /**
          * Define if input is required
         */
        "required"?: boolean;
        /**
          * Add a tooltip message next to the input
         */
        "tooltip"?: string;
        /**
          * Define input valid state
         */
        "valid"?: boolean;
        /**
          * Component value
         */
        "value"?: string;
    }
    interface MgInputText {
        /**
          * Template to use for characters left sentence
         */
        "characterLeftTemplate"?: string;
        /**
          * Define if input is disabled
         */
        "disabled"?: boolean;
        /**
          * Define if component should display character left
         */
        "displayCharacterLeft"?: boolean;
        /**
          * Template to use for characters left sentence
         */
        "helpText"?: string;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Define input pattern error message
         */
        "invalid"?: boolean;
        /**
          * Input label Required
         */
        "label": string;
        /**
          * Define if label has colon ":"
         */
        "labelColon"?: boolean;
        /**
          * Define if label is displayed on top
         */
        "labelOnTop"?: boolean;
        /**
          * Input max length
         */
        "maxlength"?: number;
        /**
          * Input name If not set the value equals the identifier
         */
        "name"?: string;
        /**
          * Emmited event when value change
         */
        "onValueChange"?: (event: CustomEvent<string>) => void;
        /**
          * Define input pattern to validate
         */
        "pattern"?: string;
        /**
          * Define input pattern error message
         */
        "patternErrorMessage"?: string;
        /**
          * Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
         */
        "placeholder"?: string;
        /**
          * Define if input is readonly
         */
        "readonly"?: boolean;
        /**
          * Define if input is required
         */
        "required"?: boolean;
        /**
          * Add a tooltip message next to the input
         */
        "tooltip"?: string;
        /**
          * Define input pattern to validate
         */
        "valid"?: boolean;
        /**
          * Component value
         */
        "value"?: string;
    }
    interface MgInputTextarea {
        /**
          * Template to use for characters left sentence
         */
        "characterLeftTemplate"?: string;
        /**
          * Define if input is disabled
         */
        "disabled"?: boolean;
        /**
          * Define if component should display character left
         */
        "displayCharacterLeft"?: boolean;
        /**
          * Template to use for characters left sentence
         */
        "helpText"?: string;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Define input pattern error message
         */
        "invalid"?: boolean;
        /**
          * Input label Required
         */
        "label": string;
        /**
          * Define if label has colon ":"
         */
        "labelColon"?: boolean;
        /**
          * Define if label is displayed on top
         */
        "labelOnTop"?: boolean;
        /**
          * Input max length
         */
        "maxlength"?: number;
        /**
          * Input name If not set the value equals the identifier
         */
        "name"?: string;
        /**
          * Emmited event when value change
         */
        "onValueChange"?: (event: CustomEvent<string>) => void;
        /**
          * Define input pattern to validate
         */
        "pattern"?: string;
        /**
          * Define input pattern error message
         */
        "patternErrorMessage"?: string;
        /**
          * Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
         */
        "placeholder"?: string;
        /**
          * Define if input is readonly
         */
        "readonly"?: boolean;
        /**
          * Define if input is required
         */
        "required"?: boolean;
        /**
          * Define input pattern error message
         */
        "rows"?: number;
        /**
          * Add a tooltip message next to the input
         */
        "tooltip"?: string;
        /**
          * Define input pattern to validate
         */
        "valid"?: boolean;
        /**
          * Component value
         */
        "value"?: string;
    }
    interface MgLabel {
        /**
          * Add a colon punctuation after label text
         */
        "colon"?: boolean;
        /**
          * Label input id
         */
        "identifier"?: string;
        /**
          * If input is required an asterisk is added at the end of the label
         */
        "required"?: boolean;
    }
    interface MgMessage {
        /**
          * Define if message has a cross button RG 01: https://jira.mgdis.fr/browse/PDA9-140
         */
        "closeButton"?: boolean;
        /**
          * Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Message type
         */
        "type"?: string;
    }
    interface MgTag {
        /**
          * Define button variant
         */
        "variant"?: string;
    }
    interface MgTooltip {
        /**
          * Sets an `id` element. Needed by the input for accessibility `arai-decribedby`.
         */
        "identifier"?: string;
        /**
          * Displayed message in the tooltip
         */
        "message"?: string;
    }
    interface IntrinsicElements {
        "mg-button": MgButton;
        "mg-character-left": MgCharacterLeft;
        "mg-help-text": MgHelpText;
        "mg-icon": MgIcon;
        "mg-input-checkbox": MgInputCheckbox;
        "mg-input-date": MgInputDate;
        "mg-input-select": MgInputSelect;
        "mg-input-text": MgInputText;
        "mg-input-textarea": MgInputTextarea;
        "mg-label": MgLabel;
        "mg-message": MgMessage;
        "mg-tag": MgTag;
        "mg-tooltip": MgTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "mg-button": LocalJSX.MgButton & JSXBase.HTMLAttributes<HTMLMgButtonElement>;
            "mg-character-left": LocalJSX.MgCharacterLeft & JSXBase.HTMLAttributes<HTMLMgCharacterLeftElement>;
            "mg-help-text": LocalJSX.MgHelpText & JSXBase.HTMLAttributes<HTMLMgHelpTextElement>;
            "mg-icon": LocalJSX.MgIcon & JSXBase.HTMLAttributes<HTMLMgIconElement>;
            "mg-input-checkbox": LocalJSX.MgInputCheckbox & JSXBase.HTMLAttributes<HTMLMgInputCheckboxElement>;
            "mg-input-date": LocalJSX.MgInputDate & JSXBase.HTMLAttributes<HTMLMgInputDateElement>;
            "mg-input-select": LocalJSX.MgInputSelect & JSXBase.HTMLAttributes<HTMLMgInputSelectElement>;
            "mg-input-text": LocalJSX.MgInputText & JSXBase.HTMLAttributes<HTMLMgInputTextElement>;
            "mg-input-textarea": LocalJSX.MgInputTextarea & JSXBase.HTMLAttributes<HTMLMgInputTextareaElement>;
            "mg-label": LocalJSX.MgLabel & JSXBase.HTMLAttributes<HTMLMgLabelElement>;
            "mg-message": LocalJSX.MgMessage & JSXBase.HTMLAttributes<HTMLMgMessageElement>;
            "mg-tag": LocalJSX.MgTag & JSXBase.HTMLAttributes<HTMLMgTagElement>;
            "mg-tooltip": LocalJSX.MgTooltip & JSXBase.HTMLAttributes<HTMLMgTooltipElement>;
        }
    }
}
