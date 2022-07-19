/**
 * Possible input width
 */
export type Width = 2 | 4 | 16 | 'full';

/**
 * Possible Input types
 */

export type HTMLMgInputsElement =
  | HTMLMgInputCheckboxElement
  | HTMLMgInputDateElement
  | HTMLMgInputNumericElement
  | HTMLMgInputPasswordElement
  | HTMLMgInputRadioElement
  | HTMLMgInputSelectElement
  | HTMLMgInputTextElement
  | HTMLMgInputTextareaElement
  | (HTMLMgInputToggleElement & { required: true; invalid: false; displayError: () => void });
