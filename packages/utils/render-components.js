import { html } from "@lion/core";
import { preprocessAmount } from "@lion/input-amount";
import { Validator } from "@lion/form-core";

import "../components/currency-conversion-input-amount/currency-conversion-input-amount.js";
import "../components/currency-conversion-select/currency-conversion-select.js";
import { commonUtils } from "./common-utils.js";

/**
 * The template to render an input amount type.
 * @param label The label of the input.
 * @param name The name of the input.
 * @param onInputAmountChange The callback to trigger once input is changed.
 * @returns {TemplateResult}
 */
const inputAmount = ({ label, name }, onInputAmountChange) => {
  return html`<currency-conversion-input-amount
    label="${label}"
    id="${name}"
    name="${name}"
    .preprocessor=${preprocessAmount}
    .formatOptions=${commonUtils.getFormatOptions()}
    .modelValue=${1}
    .validators="${new Validator()}"
    @model-value-changed="${(event) =>
      onInputAmountChange(event.detail.isTriggeredByUser)}"
  ></currency-conversion-input-amount>`;
};

/**
 * The template to render a select type.
 * @param label The label of the select.
 * @param name The name of the select.
 * @param options the different options of a select.
 * @param onSelectValueChange The callback to trigger once select option is changed.
 * @returns {TemplateResult}
 */
const dropDown = ({ label, name, options }, onSelectValueChange) => {
  return html`<currency-conversion-select
    name="${name}"
    label="${label}"
    id="${name}"
    @model-value-changed="${(event) =>
      onSelectValueChange(event.detail.isTriggeredByUser)}"
  >
    <select slot="input">
      ${options.map(
        (option) => html`<option value=${option}>${option}</option>`
      )}
    </select>
  </currency-conversion-select>`;
};

export const renderComponents = {
  inputAmount,
  dropDown,
};
