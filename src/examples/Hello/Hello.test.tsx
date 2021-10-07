import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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
      beforeEach(async () => {
        fireEvent.click(screen.getByRole("button", { name: "increment" }));
        await screen.findByText(/count: 1/i);
        // await waitFor(() => screen.getByText(/count: 1/i));
        // ? linter prefers 'findByText' syntax over 'waitFor(() => getByText ... )'
      });

      test("count increases by 1", () => {
        expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
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
        beforeEach(async () => {
          user.click(screen.getByRole("button", { name: "increment" }));
          await screen.findByText(/count: 5/i);
          // await waitFor(() => screen.getByText(/count: 5/));
          // ? linter prefers 'findByText' syntax over 'waitFor(() => getByText ... )'
        });

        test("count increases by 5", () => {
          expect(screen.getByText(/count: 5/)).toBeInTheDocument();
        });

        test("removes 'I am too small' after 300ms", async () => {
          const result = await waitForElementToBeRemoved(() =>
            // ? waitForElementToBeRemoved is a two for one, it req's element to be there before it's removed.
            screen.queryByText(/I am too small/)
          );
          expect(result).toBeUndefined();
          // ? writing this assertion since linter was angry not expect was provided
        });
      });
    });
  });
});
