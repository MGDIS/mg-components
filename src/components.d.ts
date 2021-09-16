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
          * aria-label In case button text is not explicit enougth
         */
        "label": string;
        /**
          * Define button style
         */
        "variant": string;
    }
    interface MgIcon {
        /**
          * Icon to display Possible icons must be listed
         */
        "icon": "save" | "cancel";
    }
}
declare global {
    interface HTMLMgButtonElement extends Components.MgButton, HTMLStencilElement {
    }
    var HTMLMgButtonElement: {
        prototype: HTMLMgButtonElement;
        new (): HTMLMgButtonElement;
    };
    interface HTMLMgIconElement extends Components.MgIcon, HTMLStencilElement {
    }
    var HTMLMgIconElement: {
        prototype: HTMLMgIconElement;
        new (): HTMLMgIconElement;
    };
    interface HTMLElementTagNameMap {
        "mg-button": HTMLMgButtonElement;
        "mg-icon": HTMLMgIconElement;
    }
}
declare namespace LocalJSX {
    interface MgButton {
        /**
          * Disable button
         */
        "disabled"?: boolean;
        /**
          * aria-label In case button text is not explicit enougth
         */
        "label"?: string;
        /**
          * Define button style
         */
        "variant"?: string;
    }
    interface MgIcon {
        /**
          * Icon to display Possible icons must be listed
         */
        "icon"?: "save" | "cancel";
    }
    interface IntrinsicElements {
        "mg-button": MgButton;
        "mg-icon": MgIcon;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "mg-button": LocalJSX.MgButton & JSXBase.HTMLAttributes<HTMLMgButtonElement>;
            "mg-icon": LocalJSX.MgIcon & JSXBase.HTMLAttributes<HTMLMgIconElement>;
        }
    }
}
