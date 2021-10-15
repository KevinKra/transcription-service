import { render } from "@testing-library/react";
import TopNavBar from "./TopNavBar";

describe("TopNavBar", () => {
  describe("when the component mounts", () => {
    beforeEach(() => {
      render(
        <TopNavBar
          switchToDarkMode={jest.fn()}
          switchToLightMode={jest.fn()}
          darkModeActive={false}
        />
      );
    });
    test.todo("write tests for this component");
  });
});
