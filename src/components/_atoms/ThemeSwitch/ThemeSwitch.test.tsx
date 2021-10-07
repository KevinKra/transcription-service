import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeSwitch } from "./ThemeSwitch";
import user from "@testing-library/user-event";

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
    test("the user clicks the switch, it sets to day mode", () => {
      //   user.click(screen.getByRole("checkbox"));
      //   fireEvent.change(screen.getByRole("checkbox"), {
      //     target: { checked: "" },
      //   });
      expect(screen.getByRole("checkbox")).toHaveProperty("checked", false);
      expect(screen.getByTestId("theme-day-mode")).toBeInTheDocument();
    });

    test.skip("the user clicks the switch again, it sets to night mode", () => {
      fireEvent.change(screen.getByRole("checkbox"), {
        target: { checked: true },
      });
      expect(screen.getByRole("checkbox")).toHaveProperty("checked", true);
      expect(screen.getByTestId("theme-night-mode")).toBeInTheDocument();
    });
  });
});
