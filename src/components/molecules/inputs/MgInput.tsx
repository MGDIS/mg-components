import { FunctionalComponent, h, VNode, FunctionalUtilities } from '@stencil/core';
import { Width } from './MgInput.conf';
import { ClassList } from '../../../utils/components.utils';

/**
 * Apply in all input child node the aria-describedby attribute
 *
 * @param {VNode[]} children Represent scoped elements
 * @param {Set<string>} ariaDescribedbyIDs List of IDs
 * @param {FunctionalUtilities} utils Stencil.js utils
 * @returns {VNode[]} Children with aria-describedby attribute
 */
const applyAriadescribedBy = (children: VNode[], ariaDescribedbyIDs: Set<string>, utils: FunctionalUtilities): VNode[] =>
  utils.map(children, child => {
    if (['input', 'select', 'textarea'].includes(child.vtag as string)) {
      return {
        ...child,
        vattrs: {
          ...child.vattrs,
          'aria-describedby': [...ariaDescribedbyIDs].join(' '),
        },
      };
    }

    // we recursively apply ariadescribedBy attributes to child input nodes if exists
    if (child.vchildren === null) return { ...child };
    return {
      ...child,
      vchildren: applyAriadescribedBy(child.vchildren, ariaDescribedbyIDs, utils),
    };
  });

/**
 * Add classes based on props
 *
 * @param {MgInputProps} props MgInput Interface Props
 */
const manageClasses = (props: MgInputProps): void => {
  props.classList.add('mg-input');

  if (props.labelOnTop) props.classList.add('mg-input--label-on-top');

  if (props.readonly) props.classList.add('mg-input--readonly');

  if (props.mgWidth !== undefined) props.classList.add(`mg-input--width-${props.mgWidth}`);
};

/**
 * Get tagname
 *
 * @param {boolean} isFieldset is fieldset
 * @returns {string} tag name
 */
const getTagName = (isFieldset: boolean): string => (isFieldset ? 'fieldset' : 'div');

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
  labelHide: boolean;
  isFieldset: boolean;
  // Input
  value: string;
  readonlyValue: string;
  required: boolean;
  readonly: boolean;
  mgWidth: Width;
  disabled: boolean;
  // Tooltip
  tooltip: string;
  // Help Text
  helpText: string;
  // Error Message
  errorMessage: string;
  // ariaDescribedbyIDs
  ariaDescribedbyIDs: string[];
}

/**
 * Get input template
 *
 * @param {MgInputProps} props MgInput Interface Props
 * @param {VNode[]} children Represent scoped elements
 * @param {FunctionalUtilities} utils Stencil.js utils
 * @returns {VNode[]} input template
 */
export const MgInput: FunctionalComponent<MgInputProps> = (props: MgInputProps, children: VNode[], utils: FunctionalUtilities): VNode[] => {
  /**
   * Check required properties
   */
  if (typeof props.identifier !== 'string' || props.identifier.trim() === '') {
    throw new Error('<mg-input> prop "identifier" is required.');
  }
  if (typeof props.label !== 'string' || props.label.trim() === '') {
    throw new Error('<mg-input> prop "label" is required.');
  }
  if (props.labelOnTop && props.labelHide) {
    throw new Error('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
  }

  /**
   * Set readonly value
   */
  if (props.readonlyValue === undefined) props.readonlyValue = props.value;

  /**
   * Component classes
   */
  manageClasses(props);

  /**
   * a11y IDs
   */
  const ariaDescribedbyIDs: Set<string> = new Set(props.ariaDescribedbyIDs);

  // Help text
  const helpTextId = `${props.identifier}-help-text`;
  if (typeof props.helpText === 'string' && props.helpText !== '') {
    ariaDescribedbyIDs.add(helpTextId);
  }

  // Error Message
  const helpTextErrorId = `${props.identifier}-error`;
  if (typeof props.errorMessage === 'string' && props.errorMessage !== '') {
    ariaDescribedbyIDs.add(helpTextErrorId);
  }

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

  const TagName: string = getTagName(props.isFieldset);

  /**
   * Get tooltip node
   *
   * @returns {VNode[]} mg-tooltip
   */
  const getTooltip = (): VNode[] => (
    <mg-tooltip identifier={`${props.identifier}-tooltip`} message={props.tooltip}>
      <mg-icon icon="info-circle"></mg-icon>
    </mg-tooltip>
  );

  /**
   * Get input title (label) node
   * Display asterisk only if not disabled and not readonly
   *
   * @returns {VNode[]} mg-input-title
   */
  const getInputTitle = (): VNode[] => (
    <mg-input-title
      identifier={props.identifier}
      class={props.labelHide ? 'sr-only' : undefined}
      required={props.required && !props.disabled && !props.readonly}
      is-legend={props.isFieldset}
    >
      {props.label}
    </mg-input-title>
  );

  return (
    <TagName class={props.classList.join()}>
      {props.labelOnTop ? (
        <div class="mg-input__title">
          {getInputTitle()}
          {!props.readonly && props.tooltip && getTooltip()}
        </div>
      ) : (
        getInputTitle()
      )}
      {props.readonly ? (
        <div class="mg-input__input-container">
          <strong>{props.readonlyValue}</strong>
          {children.filter(child => child.$name$ === 'append-input')}
        </div>
      ) : (
        <div class="mg-input__input-container">
          <div class={{ 'mg-input__input': true, 'mg-input__input--has-error': props.errorMessage !== undefined }}>
            {applyAriadescribedBy(children, ariaDescribedbyIDs, utils)}
            {!props.labelOnTop && props.tooltip && getTooltip()}
          </div>
          {props.helpText && <div id={helpTextId} class="mg-input__help-text" innerHTML={props.helpText}></div>}
          {props.errorMessage && !props.readonly && !props.disabled && (
            <div id={helpTextErrorId} class="mg-input__error" innerHTML={props.errorMessage} aria-live="assertive"></div>
          )}
        </div>
      )}
    </TagName>
  );
};
