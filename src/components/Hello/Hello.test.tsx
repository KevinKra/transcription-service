import { fireEvent, render, screen } from "@testing-library/react";
import Hello from "./Hello";

describe("Hello.tsx", () => {
  describe("initializes with a count of 0", () => {
    beforeEach(() => {
      render(<Hello />);
    });

    it("default count is 0", () => {
      const element = screen.getByText(/count: 0/i);
      expect(element).toBeInTheDocument();
    });

    describe("when minus button is clicked", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole("button", { name: "decrement" }));
      });

      it("count decreases by 1", () => {
        const element = screen.getByText(/count: -1/i);
        expect(element).toBeInTheDocument();
      });
    });

    describe("when plus button is clicked", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole("button", { name: "increment" }));
      });

      it("count increases by 1", () => {
        const element = screen.getByText(/count: 1/i);
        expect(element).toBeInTheDocument();
      });
    });
  });
});
