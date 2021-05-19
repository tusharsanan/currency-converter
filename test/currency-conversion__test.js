import { html, fixture, expect } from "@open-wc/testing";

import "../../adyen/packages/currency-conversion/currency-conversion.js";
import { currencyConversionMock } from "./mocks/currency-conversion.mock";
import sinon from "sinon";
import { currencyConversionService } from "../packages/services/currency-conversion-service";

let currencyConversionComponent;

describe("Currency conversion form", async () => {
  beforeEach(async () => {
    sinon
      .stub(currencyConversionService, "getData")
      .returns(Promise.resolve(currencyConversionMock));

    currencyConversionComponent = await fixture(
      html`<currency-conversion></currency-conversion>`
    );

    await currencyConversionComponent.updateComplete;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should load the input fields for displaying the source and destination currency amount when the data is received from the API successfully", async () => {
    const { 0: destinationAmount, 1: sourceAmount } =
      currencyConversionComponent.shadowRoot.querySelectorAll(
        "currency-conversion-input-amount"
      );

    expect(destinationAmount).to.exist;
    expect(sourceAmount).to.exist;
  });

  it("should load the select fields for displaying the source and destination currency when the data is received from the API successfully", async () => {
    const { 0: destinationCurrency, 1: sourceCurrency } =
      currencyConversionComponent.shadowRoot.querySelectorAll(
        "currency-conversion-select"
      );

    expect(destinationCurrency).to.exist;
    expect(sourceCurrency).to.exist;
  });

  it("should load the input fields for displaying the source and destination currency amount with default value of 1", async () => {
    const { 0: destinationAmount, 1: sourceAmount } =
      currencyConversionComponent.shadowRoot.querySelectorAll(
        "currency-conversion-input-amount"
      );

    expect(destinationAmount.modelValue).to.equal(1);
    expect(sourceAmount.modelValue).to.equal(1);
  });

  it("should load the select fields for displaying the source and destination currency with default value of base currency", async () => {
    const { 0: destinationCurrency, 1: sourceCurrency } =
      currencyConversionComponent.shadowRoot.querySelectorAll(
        "currency-conversion-select"
      );

    expect(destinationCurrency.modelValue).to.equal("EUR");
    expect(sourceCurrency.modelValue).to.equal("EUR");
  });

  it("should change the destination currency value when the source currency value is changed", async () => {
    const { 1: sourceAmount } =
      currencyConversionComponent.shadowRoot.querySelectorAll(
        "currency-conversion-input-amount"
      );

    await currencyConversionComponent.OnValueChange("sourceAmount", true);
    sourceAmount.modelValue = 21;

    await currencyConversionComponent.updateComplete;

    expect(
      currencyConversionComponent.shadowRoot.getElementById("destinationAmount")
        .modelValue
    ).to.equal(21);
  });

  it("should change the source currency value when the destination currency value is changed", async () => {
    const { 0: destinationAmount } =
      currencyConversionComponent.shadowRoot.querySelectorAll(
        "currency-conversion-input-amount"
      );

    await currencyConversionComponent.OnValueChange("destinationAmount", true);
    destinationAmount.modelValue = 21;

    await currencyConversionComponent.updateComplete;

    expect(
      currencyConversionComponent.shadowRoot.getElementById("sourceAmount")
        .modelValue
    ).to.equal(21);
  });
});

describe("Error cases for currency conversion", () => {
  beforeEach(async () => {
    sinon
      .stub(currencyConversionService, "getData")
      .returns(Promise.reject({ error: true }));

    currencyConversionComponent = await fixture(
      html`<currency-conversion></currency-conversion>`
    );

    await currencyConversionComponent.updateComplete;
  });

  afterEach(() => {
    sinon.restore();
  });
  it("should show something went wrong if error is returned from the API", () => {
    expect(currencyConversionComponent.shadowRoot.innerHTML).to.includes(
      "Sorry something went wrong"
    );
  });
});
