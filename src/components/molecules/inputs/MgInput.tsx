import { FunctionalComponent, h } from '@stencil/core';

/**
 * MgInput Interface
 */
interface MgInputProps {
  // Global
  identifier: string;
  classes: Set<string>;
  // Label
  label: string;
  labelOnTop: boolean;
  labelColon: boolean;
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

  if(props.labelOnTop) {
    props.classes.add('is-label-on-top');
  }
  const classes = ['mg-input', ...props.classes];

  /**
   * a11y IDs
   */

  const ariaDescribedbyIDs = new Set();

  // Character Left
  const characterLeftId = `${props.identifier}-character-left`;
  if(props.classes.has('is-focused') && props.displayCharacterLeft){
    ariaDescribedbyIDs.add(characterLeftId);
  }

  // Help text
  const helpTextId = `${props.identifier}-help-text`;
  if(props.classes.has('is-focused') && typeof props.helpText === 'string' && props.helpText !== ''){
    ariaDescribedbyIDs.add(helpTextId);
  }

  // Error Message
  const helpTextErrorId = `${props.identifier}-error`;
  if(typeof props.errorMessage === 'string' && props.errorMessage !== ''){
    ariaDescribedbyIDs.add(helpTextErrorId);
  }

  /**
   * Update children
   */

  children = utils.map(children, child => ({
    ...child,
    vattrs: {
      ...child.vattrs,
      'aria-describedby': [...ariaDescribedbyIDs].join(' '),
    }
  }))

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
   */
  return (
    <div class={classes.join(' ')}>
      <mg-label
        identifier={props.identifier}
        colon={props.labelColon}
        required={props.required}
        >
        {props.label}
      </mg-label>
      { props.readonly
      ? <div class="mg-input__input-container">
          <strong>{props.readonlyValue || props.readonly}</strong>
        </div>
      : <div class="mg-input__input-container">
          <div class="mg-input__input-container__input">
            { children }
            { props.tooltip && <mg-tooltip identifier={`${props.identifier}-tooltip`} message={props.tooltip}><mg-icon icon="user-cadenas"></mg-icon></mg-tooltip>}
          </div>
          { props.displayCharacterLeft && props.maxlength && <mg-character-left
            identifier={characterLeftId}
            characters={props.value}
            maxlength={props.maxlength}
            template={props.characterLeftTemplate}
          ></mg-character-left> }
          { props.helpText && <mg-help-text identifier={helpTextId} innerHTML={props.helpText}></mg-help-text> }
          { props.errorMessage && <mg-help-text class="error" identifier={helpTextErrorId} innerHTML={props.errorMessage}></mg-help-text> }
        </div>
      }
    </div>
  );
}
