import { css } from "@lion/core";
import { LionInputAmount } from "@lion/input-amount";

export class CurrencyConversionInputAmount extends LionInputAmount {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          margin-bottom: 12px;
        }

        .form-field__label {
          margin-bottom: 8px;
        }

        :host([focused])
          .input-group__container
          > .input-group__input
          ::slotted(.form-control) {
          border-radius: 4px;
          border: 1px solid #0abf53;
          outline: none;
        }

        .input-group__container > .input-group__input ::slotted(.form-control) {
          padding: 8px 8px 8px 12px;
          width: 1%;
          border: 1px solid #696969;
          border-radius: 4px;
        }
      `,
    ];
  }
}
