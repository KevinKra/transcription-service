import { fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Hello from "./Hello";

describe("Hello.tsx", () => {
  describe("initializes with a count of 0 and the title: 'Hello World'", () => {
    beforeEach(() => {
      render(<Hello title="Hello World" />);
    });

    test("default count is 0", () => {
      const element = screen.getByText(/count: 0/i);
      expect(element).toBeInTheDocument();
    });

    test("title is 'Hello World'", () => {
      const element = screen.getByText(/Hello World/);
      expect(element).toBeInTheDocument();
    });

    describe("when minus button is clicked", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole("button", { name: "decrement" }));
      });

      test("decreases count by 1", () => {
        const element = screen.getByText(/count: -1/i);
        expect(element).toBeInTheDocument();
      });
    });

    describe("when plus button is clicked", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole("button", { name: "increment" }));
      });

      test("count increases by 1", () => {
        const element = screen.getByText(/count: 1/i);
        expect(element).toBeInTheDocument();
      });
    });

    describe("when incrementor is changed to 5", () => {
      beforeEach(() => {
        user.type(screen.getByLabelText(/incrementor/i), "{selectall}5");
      });

      describe("when the minus button is clicked", () => {
        beforeEach(() => {
          user.click(screen.getByRole("button", { name: "decrement" }));
        });

        test("count decreases by 5", () => {
          expect(screen.getByText(/count: -5/)).toBeInTheDocument();
        });
      });

      describe("when the plus button is clicked", () => {
        beforeEach(() => {
          user.click(screen.getByRole("button", { name: "increment" }));
        });

        test("count increases by 5", () => {
          expect(screen.getByText(/count: 5/)).toBeInTheDocument();
        });
      });
    });
  });
});
