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
    // fills in youtube address input
    cy.findByTestId(/input-source-url/i)
      .type(validMediaEndpoint)
      .should("have.value", validMediaEndpoint);
    cy.findByRole("button", {
      name: /search/i,
    }).click();

    // confirms inputs are not disabled
    cy.get('[name="source-language"]')
      .parent()
      .should("not.have.class", "Mui-disabled");

    // fills in source language input
    cy.get('[name="source-language"]').parent().click();
    cy.findByRole("option", {
      name: /english/i,
    }).click();
    cy.get('[name="source-language"]').should("have.value", "en-US");
    cy.get('[name="source-language"]').parent().should("have.text", "English");

    // fills in target language input
    cy.get('[name="target-language"]').parent().click();
    cy.findByRole("option", {
      name: /french/i,
    }).click();
    cy.get('[name="target-language"]').should("have.value", "fr");
    cy.get('[name="target-language"]').parent().should("have.text", "French");

    // clicks build lesson button
    cy.findByRole("button", { name: /build lesson/i }).click();
  });
});

export {};
