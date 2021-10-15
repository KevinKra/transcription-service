import { expect } from "chai";

describe("My First Test", () => {
  it("Does not do much!", () => {
    // expect(true).toEqual(true);
    expect(true).to.equal(true);
  });
  it("Visits the Kitchen Sink", () => {
    cy.visit("https://example.cypress.io");
  });

  it("works with react testing library", () => {
    cy.findByText("Kitchen Sink").should("exist");
    // const title = cy.findByText(/kitchen sink/i);
    // expect(title).toBeInTheDocument();
    // cy.contains("Kitchen Sink");
    // cy.contains;
  });
});
