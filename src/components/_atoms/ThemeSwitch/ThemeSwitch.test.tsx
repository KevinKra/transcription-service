import { render } from "@testing-library/react";
import { ThemeSwitch } from "./ThemeSwitch";

describe("ThemeSwitch", () => {
  describe("when the component mounts", () => {
    beforeEach(() => {
      render(
        <ThemeSwitch
          switchToDarkMode={jest.fn()}
          switchToLightMode={jest.fn()}
          darkModeActive={false}
        />
      );
    });
    test.todo("write tests for this component");
  });
});
