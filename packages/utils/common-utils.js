/**
 * To conditionally render a template
 * @param {any} expression
 * @param {() => TemplateResult} trueValue
 * @param {() => TemplateResult} [falseValue]
 * @returns {TemplateResult}
 */
const when = (expression, trueValue, falseValue) => {
  if (expression) {
    return trueValue();
  }

  if (falseValue) {
    return falseValue();
  }
  return undefined;
};

/**
 * Method to get the different format options for the input amount fields
 * Forcing the locale to be NL as of now, can be customized
 * @returns {{maximumFractionDigits: number, minimumFractionDigits: number}}
 */
const getFormatOptions = () => {
  return {
    locale: "Nl-nl",
    minimumFractionDigits: 2,
    maximumFractionDigits: 10,
  };
};

export const commonUtils = {
  when,
  getFormatOptions,
};
