describe("Currency conversion: unhappy flow", () => {
  it("should show an error message if the request has errors", () => {
    cy.intercept("GET", "https://api.ratesapi.io/api/latest/", {
      success: false,
    });

    cy.visit("/");

    cy.get("currency-conversion")
      .shadow()
      .find("p")
      .should("contain.text", "Sorry something went wrong");
  });
});
