import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSwitch } from "./ThemeSwitch";
// import user from "@testing-library/user-event";

// ? this component uses context from the dark-mode package
// ? while the commented out tests can test if events are being clicked
// ? and changed. I'm not yet sure how to imitate the state
// ? of the package to simulate actual changes to the component (day/night).

describe("ThemeSwitch", () => {
  describe("when the switch is set to day mode", () => {
    beforeEach(() => {
      render(
        <ThemeSwitch
          switchToDarkMode={jest.fn()}
          switchToLightMode={jest.fn()}
          darkModeActive={false}
        />
      );
    });

    test("the switch appears on the page", () => {
      const switchElement = screen.getByTestId(/night-day-switch/i);
      expect(switchElement).toBeInTheDocument();
    });

    test.skip("the user clicks the switch, it sets to day mode", () => {
      const switchElement = screen.getByTestId(/night-day-switch/i);
      userEvent.click(switchElement);
    });
  });
});
