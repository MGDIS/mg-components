import { FunctionalComponent, h, VNode, FunctionalUtilities } from '@stencil/core';
import { ClassList } from '../../../utils/components.utils';

/**
 * Apply in all input child node the aria-describedby attribute
 * @param children
 * @param ariaDescribedbyIDs
 * @param utils
 * @returns {VNode[]}
 */
const applyAriadescribedBy = (children :VNode[], ariaDescribedbyIDs: Set<String>, utils: FunctionalUtilities): VNode[] =>  utils.map(children, child => {
  if(['input', 'select', 'textarea'].includes(child.vtag as string)) {
    return {
      ...child,
      vattrs: {
        ...child.vattrs,
        'aria-describedby': [...ariaDescribedbyIDs].join(' '),
      }
    }
  }

  // we recursively apply ariadescribedBy attributes to child input nodes if exists
  if(child.vchildren === null) return {...child};
  return {
    ...child,
    vchildren: applyAriadescribedBy(child.vchildren, ariaDescribedbyIDs, utils)
  };
});

/**
 * MgInput Interface
 */
interface MgInputProps {
  // Global
  identifier: string;
  classList: ClassList;
  // Label
  label: string;
  labelOnTop: boolean;
  labelColon: boolean;
  labelHide: boolean;
  isFieldset: boolean;
  // Input
  value: string;
  readonlyValue: string;
  required: boolean;
  readonly: boolean;
  // Tooltip
  tooltip: string;
  // Nb Char Left
  displayCharacterLeft: boolean;
  characterLeftTemplate: string;
  maxlength: number;
  // Help Text
  helpText: string;
  // Error Message
  errorMessage: string;
}

/**
 * Get input template
 * @param props MgInput Interface Props
 * @param children Represent scoped elements
 * @param utils Stencil.js utils
 * @returns JSX template
 */
export const MgInput: FunctionalComponent<MgInputProps> = (props, children, utils) => {

  /**
   * Check required properties
   */

  // Label
  if(typeof props.label !== 'string' || props.label === '') {
    throw new Error(`prop "label" is required`);
  }

  /**
   * Component classes
   */

  props.classList.add('mg-input');

  if(props.labelOnTop) {
    props.classList.add('mg-input--label-on-top');
  }

  if(props.readonly) {
    props.classList.add('mg-input--readonly');
  }

  /**
   * a11y IDs
   */

  const ariaDescribedbyIDs: Set<String> = new Set();

  // Character Left
  const characterLeftId = `${props.identifier}-character-left`;
  if(props.classList.has('is-focused') && props.displayCharacterLeft){
    ariaDescribedbyIDs.add(characterLeftId);
  }

  // Help text
  const helpTextId = `${props.identifier}-help-text`;
  if(props.classList.has('is-focused') && typeof props.helpText === 'string' && props.helpText !== ''){
    ariaDescribedbyIDs.add(helpTextId);
  }

  // Error Message
  const helpTextErrorId = `${props.identifier}-error`;
  if(typeof props.errorMessage === 'string' && props.errorMessage !== ''){
    ariaDescribedbyIDs.add(helpTextErrorId);
  }

  /**
   * Update input(s) in children
   */
  children = applyAriadescribedBy(children, ariaDescribedbyIDs, utils);


  /**
   * Return template
   *
   * +--------+--------------+---------+
   * |  label | input        | tooltip |
   * |        +--------------+---------+
   * |        | nb Char Left           |
   * |        +------------------------+
   * |        | Help Text              |
   * |        +------------------------+
   * |        | Error                  |
   * +--------+------------------------+
   *
   * Error message is based on this aria method: https://www.w3.org/WAI/tutorials/forms/notifications/#on-focus-change
   */

  const TagName = props.isFieldset ? 'fieldset' : 'div';

  return (
    <TagName class={props.classList.join()}>
      <mg-input-title
        identifier={props.identifier}
        class={props.labelHide ? "sr-only" : undefined}
        colon={props.labelColon}
        required={props.required}
        is-legend={props.isFieldset}
      >
        {props.label}
      </mg-input-title>
      { props.readonly
      ? <div class="mg-input__input-container">
          <strong>{props.readonlyValue || props.value}</strong>
        </div>
      : <div class="mg-input__input-container">
          <div class="mg-input__input-container__input">
            { children }
            { props.tooltip && <mg-tooltip identifier={`${props.identifier}-tooltip`} message={props.tooltip}><mg-icon icon="info"></mg-icon></mg-tooltip>}
          </div>
          { props.displayCharacterLeft && props.maxlength && props.classList.has('is-focused') && <mg-character-left
            identifier={characterLeftId}
            characters={props.value}
            maxlength={props.maxlength}
            template={props.characterLeftTemplate}
          ></mg-character-left> }
          { props.helpText && <div id={helpTextId} class="mg-input__input-container__help-text" innerHTML={props.helpText}></div> }
          { props.errorMessage && <div id={helpTextErrorId} class="mg-input__input-container__error" innerHTML={props.errorMessage} aria-live="assertive"></div> }
        </div>
      }
    </TagName>
  );
}
