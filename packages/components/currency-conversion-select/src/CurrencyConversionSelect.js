import { css } from "@lion/core";
import { LionSelect } from "@lion/select";

export class CurrencyConversionSelect extends LionSelect {
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
          outline: none;
          border: 1px solid #0abf53;
        }

        .input-group__before {
          display: flex;
        }

        .input-group__container > .input-group__input ::slotted(.form-control) {
          border-radius: 4px;
          padding: 8px 44px 8px 12px;
          width: 1%;
        }
      `,
    ];
  }
}
