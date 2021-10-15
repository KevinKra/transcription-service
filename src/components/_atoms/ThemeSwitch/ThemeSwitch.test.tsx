import { render } from "@testing-library/react";
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

    test.skip("the user clicks the switch, it sets to day mode", () => {
      // const switchElement = screen.getByLabelText(/switch/i);
      // user.click(switchElement);
      // fireEvent.change(switchElement, { target: { checked: true } });
      // expect(screen.getByRole("checkbox")).toHaveProperty("checked", true);
      // screen.debug();
      // expect(screen.getByTestId("theme-day-mode")).toBeInTheDocument();
      // fireEvent.change(switchElement, { target: { checked: false } });
      // expect(screen.getByTestId("theme-day-mode")).toBeInTheDocument();
    });

    test.skip("the user clicks the switch again, it sets to night mode", () => {
      // fireEvent.change(screen.getByRole("checkbox"), {
      //   target: { checked: true },
      // });
      // expect(screen.getByRole("checkbox")).toHaveProperty("checked", true);
      // expect(screen.getByTestId("theme-night-mode")).toBeInTheDocument();
    });
  });
});
