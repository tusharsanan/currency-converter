import { css } from "@lion/core";
import { breakpoint840 } from "../utils/breakpoint.js";

export const currencyConversionStyles = [
  css`
    .currency-conversion__wrapper {
      border-radius: 8px;
      box-shadow: rgb(35 55 80 / 30%) 0 6px 12px;
      box-sizing: border-box;
      display: flex;
      flex: 1 1 100%;
      flex-direction: column;
      margin: 0 auto;
      max-width: 1016px;
      padding: 16px;
      background-color: #f3f6f9;
    }

    h1 {
      font-size: 2.5em;
      text-align: center;
    }

    .form-field {
      width: 100%;
    }

    .currency-conversion__data {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .currency-conversion__data:first-child {
      margin-right: 0;
    }

    .currency-conversion__wrapper.currency-conversion--error {
      justify-content: center;
      flex-direction: column;
      font-size: 1.5em;
      text-align: center;
    }

    @media (min-width: ${breakpoint840}px) {
      .currency-conversion__wrapper {
        flex-direction: row;
        align-items: center;
      }

      .currency-conversion__data:first-child {
        margin-right: 16px;
      }
    }
  `,
];
