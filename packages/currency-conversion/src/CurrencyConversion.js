import { LitElement, html } from "@lion/core";

import "../../components/currency-conversion-form/currency-conversion-form.js";

import { commonUtils } from "../../utils/common-utils.js";
import { currencyConversionService } from "../../services/currency-conversion-service.js";
import { currencyConversionStyles } from "../../styles/currency-conversion-styles.js";
import { FIELD_NAMES } from "../../constants/common-values.js";
import { renderComponents } from "../../utils/render-components";
import { UrlConstants } from "../../constants/url-constants.js";

export class CurrencyConversion extends LitElement {
  static get properties() {
    return {
      conversionRates: { type: Object }, // To hold the initial conversion rates data.
      countries: { type: Array }, // To populate the countries based on initial API response.
      initialCurrencyConversionData: { type: Object }, // To hold the response from the currency conversion API.
    };
  }

  constructor() {
    super();
    this.conversionRates = {};
    this.countries = [];
    this.initialCurrencyConversionData = {};
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      this.initialCurrencyConversionData =
        await currencyConversionService.getData(UrlConstants.RATES_API);

      this.countries = Object.keys(this.initialCurrencyConversionData.rates);
      this.countries.unshift(this.initialCurrencyConversionData.base); // Adding the base currency to the countries list

      this.conversionRates = this.initialCurrencyConversionData.rates;
      this.conversionRates[this.initialCurrencyConversionData.base] = 1; // Setting the base currency conversion value to 1
    } catch {
      this.initialCurrencyConversionData = { error: true };
    }
  }

  static get styles() {
    return [currencyConversionStyles];
  }

  // Check if the initial conversion rates are available from the API
  ifConversionRatesAvailable() {
    return !!(
      this.initialCurrencyConversionData?.rates &&
      Object.keys(this.initialCurrencyConversionData.rates).length !== 0
    );
  }

  /**
   * This function gets the new rates data from the API if the source or destination currency is changed
   * @param currency The currency to be passed as a base to the rates API
   * @returns {Promise<*>}
   */
  async getRatesByBase(currency) {
    let ratesData;
    ratesData = await currencyConversionService.getData(
      `${UrlConstants.RATES_API}?base=${currency}`
    );

    if (!ratesData?.rates) {
      this.shadowRoot.querySelector(".currency-conversion__wrapper").innerText =
        "Sorry something went wrong. Please refresh the page";
      return [];
    }

    const { rates } = ratesData;
    rates[ratesData.base] = 1;

    return rates;
  }

  /**
   * This method is triggered everytime a customer changes the currencies or the values
   * @param name The name of the element
   * @param isTriggeredByUser If this is manually triggered by a user
   * @returns {Promise<void>}
   */
  async OnValueChange(name, isTriggeredByUser) {
    if (isTriggeredByUser) {
      const sourceCurrency = this.shadowRoot.getElementById(
        FIELD_NAMES.SOURCE_CURRENCY
      ).modelValue;

      const destinationCurrency = this.shadowRoot.getElementById(
        FIELD_NAMES.DESTINATION_CURRENCY
      ).modelValue;

      const destinationAmountElement =
        this.shadowRoot.getElementById("destinationAmount");

      const sourceAmountElement = this.shadowRoot.getElementById(
        FIELD_NAMES.SOURCE_AMOUNT
      );

      let baseRates;

      // To avoid calling the API if the input amount is changed
      if (name === FIELD_NAMES.SOURCE_AMOUNT || name === "destinationAmount") {
        baseRates = this.conversionRates;
      } else {
        baseRates = await this.getRatesByBase(sourceCurrency);
        Object.assign(this.conversionRates, baseRates);
      }

      const rate = baseRates[destinationCurrency];

      if (name === "destinationAmount") {
        sourceAmountElement.modelValue =
          destinationAmountElement.modelValue / rate;
        return;
      }

      destinationAmountElement.modelValue =
        sourceAmountElement.modelValue * rate;
    }
  }

  render() {
    return html`
      ${commonUtils.when(
        Object.keys(this.initialCurrencyConversionData).length,
        () =>
          this.ifConversionRatesAvailable()
            ? html` <currency-conversion-form name="currencyConversionForm">
                <form>
                  <main>
                    <header><h1>Currency Converter</h1></header>
                    <section class="currency-conversion__wrapper">
                      <div class="currency-conversion__data">
                        ${renderComponents.inputAmount(
                          {
                            label: "Source Currency Value",
                            name: FIELD_NAMES.SOURCE_AMOUNT,
                          },
                          (isTriggeredByUser) => {
                            this.OnValueChange(
                              FIELD_NAMES.SOURCE_AMOUNT,
                              isTriggeredByUser
                            );
                          }
                        )}
                        ${renderComponents.dropDown(
                          {
                            label: "Source Currency",
                            name: FIELD_NAMES.SOURCE_CURRENCY,
                            options: this.countries,
                          },
                          (isTriggeredByUser) => {
                            this.OnValueChange(
                              FIELD_NAMES.SOURCE_CURRENCY,
                              isTriggeredByUser
                            );
                          }
                        )}
                      </div>
                      <div class="currency-conversion__data">
                        ${renderComponents.inputAmount(
                          {
                            label: "Destination Currency Value",
                            name: FIELD_NAMES.DESTINATION_AMOUNT,
                          },
                          (isTriggeredByUser) => {
                            this.OnValueChange(
                              FIELD_NAMES.DESTINATION_AMOUNT,
                              isTriggeredByUser
                            );
                          }
                        )}
                        ${renderComponents.dropDown(
                          {
                            label: "Destination Currency",
                            name: FIELD_NAMES.DESTINATION_CURRENCY,
                            options: this.countries,
                          },
                          (isTriggeredByUser) => {
                            this.OnValueChange(
                              FIELD_NAMES.DESTINATION_CURRENCY,
                              isTriggeredByUser
                            );
                          }
                        )}
                      </div>
                    </section>
                  </main>
                </form></currency-conversion-form
              >`
            : html` <div
                class="currency-conversion__wrapper currency-conversion--error"
              >
                <h2>Oops!</h2>
                <p>Sorry something went wrong. Please try again.</p>
              </div>`,
        () => html`<p>Please wait...</p>`
      )}
    `;
  }
}
