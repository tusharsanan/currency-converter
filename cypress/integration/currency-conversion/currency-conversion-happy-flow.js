describe("Currency conversion: happy flow", () => {
  it("should load the page to filter the products", () => {
    cy.visit("/");

    cy.get("currency-conversion").should("have.length", 1);
  });

  it("should update the destination amount if source amount is changed", () => {
    cy.visit("/");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#sourceAmount")
      .find(".form-control")
      .focus()
      .clear({
        force: true,
      })
      .type("12");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#destinationAmount")
      .find(".form-control")
      .should("have.value", "12,00");
  });

  it("should update the source amount if destination amount is changed", () => {
    cy.visit("/");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#destinationAmount")
      .find(".form-control")
      .focus()
      .clear({
        force: true,
      })
      .type("120");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#sourceAmount")
      .find(".form-control")
      .should("have.value", "120,00");
  });

  it("should update the destination currency amount if source currency is changed", () => {
    cy.visit("/");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#sourceCurrency .form-control")
      .select("GBP");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#destinationAmount")
      .find(".form-control")
      .should("have.value", "1,1628177399");
  });

  it("should update the destination currency amount if destination currency is changed", () => {
    cy.visit("/");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#destinationCurrency .form-control")
      .select("INR");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#destinationAmount")
      .find(".form-control")
      .should("have.value", "89,231");
  });

  it("should update the destination currency amount if destination currency is changed and then source amount is changed", () => {
    cy.visit("/");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#destinationCurrency .form-control")
      .select("INR");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#sourceAmount")
      .find(".form-control")
      .focus()
      .clear({
        force: true,
      })
      .type("12");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#destinationAmount")
      .find(".form-control")
      .should("have.value", "1.070,772");
  });

  it("should update the source currency amount if destination currency is changed and then destination amount is changed", () => {
    cy.visit("/");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#destinationCurrency .form-control")
      .select("INR");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#destinationAmount")
      .find(".form-control")
      .focus()
      .clear({
        force: true,
      })
      .type("200");

    cy.get("currency-conversion")
      .shadow()
      .find("form")
      .find("#sourceAmount")
      .find(".form-control")
      .should("have.value", "2,2413735137");
  });
});
