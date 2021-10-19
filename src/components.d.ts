/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MgButton {
        /**
          * Disable button
         */
        "disabled": boolean;
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
          * Identifier used for the input ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Manage indeterminate state
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
          * Identifier used for the input ID (id is a reserved prop in Stencil.js) If not set, it will be created.
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
          * Identifier used for the input ID (id is a reserved prop in Stencil.js) If not set, it will be created.
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
          * Input placeholder
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
          * Identifier used for the input ID (id is a reserved prop in Stencil.js) If not set, it will be created.
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
          * Input placeholder
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
        "mg-input-text": HTMLMgInputTextElement;
        "mg-input-textarea": HTMLMgInputTextareaElement;
        "mg-label": HTMLMgLabelElement;
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
          * Identifier used for the input ID (id is a reserved prop in Stencil.js) If not set, it will be created.
         */
        "identifier"?: string;
        /**
          * Manage indeterminate state
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
          * Emmited event when value change
         */
        "onInputChange"?: (event: CustomEvent<boolean>) => void;
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
          * Identifier used for the input ID (id is a reserved prop in Stencil.js) If not set, it will be created.
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
        "onInputChange"?: (event: CustomEvent<string>) => void;
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
          * Identifier used for the input ID (id is a reserved prop in Stencil.js) If not set, it will be created.
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
        "onInputChange"?: (event: CustomEvent<string>) => void;
        /**
          * Define input pattern to validate
         */
        "pattern"?: string;
        /**
          * Define input pattern error message
         */
        "patternErrorMessage"?: string;
        /**
          * Input placeholder
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
          * Identifier used for the input ID (id is a reserved prop in Stencil.js) If not set, it will be created.
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
        "onInputChange"?: (event: CustomEvent<string>) => void;
        /**
          * Define input pattern to validate
         */
        "pattern"?: string;
        /**
          * Define input pattern error message
         */
        "patternErrorMessage"?: string;
        /**
          * Input placeholder
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
        "mg-input-text": MgInputText;
        "mg-input-textarea": MgInputTextarea;
        "mg-label": MgLabel;
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
            "mg-input-text": LocalJSX.MgInputText & JSXBase.HTMLAttributes<HTMLMgInputTextElement>;
            "mg-input-textarea": LocalJSX.MgInputTextarea & JSXBase.HTMLAttributes<HTMLMgInputTextareaElement>;
            "mg-label": LocalJSX.MgLabel & JSXBase.HTMLAttributes<HTMLMgLabelElement>;
            "mg-tag": LocalJSX.MgTag & JSXBase.HTMLAttributes<HTMLMgTagElement>;
            "mg-tooltip": LocalJSX.MgTooltip & JSXBase.HTMLAttributes<HTMLMgTooltipElement>;
        }
    }
}
