// import { expect } from "chai"

const validMediaEndpoint = "https://www.youtube.com/watch?v=0La3aBSjvGY";

describe("Start building a dynamic lesson", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });

  it("navigates to the 'Create Lesson' overview page", () => {
    cy.findByRole("heading", { name: /create lessons/i }).click();
    cy.url().should("include", "/build");
  });

  it("navigates to the 'Dynamic Lesson' forms page", () => {
    cy.findByRole("button", { name: /build dynamic lesson/i }).click();
    cy.url().should("include", "/lessons/dynamic/select-media");
  });

  it("fills and submits the initial 'SelectMedia' form", () => {
    cy.findByTestId(/input-source-url/i)
      .type(validMediaEndpoint)
      .should("have.value", validMediaEndpoint);
    cy.findByRole("button", {
      name: /search/i,
    }).click();

    cy.get('[name="source-language"]')
      .parent()
      .should("not.have.class", "Mui-disabled");

    cy.get('[name="source-language"]').parent().click();
  });
});

export {};
