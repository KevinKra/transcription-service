import { render, screen } from "@testing-library/react";
import { MyDrawer } from "./MyDrawer";
import user from "@testing-library/user-event";

// ? testing approach using mock SwipeableDrawer
// jest.mock("@mui/material", () => ({
//   ...jest.requireActual("@mui/material"),
//   SwipeableDrawer: jest.fn(() => <div>MOCK DRAWER</div>),
// }));

// describe("MyDrawer -- Mock Example", () => {
//   test('"MOCK DRAWER" does not appear initially', () => {
//     render(<MyDrawer />);
//     expect(screen.queryByText("MOCK DRAWER")).toBeInTheDocument();
//     // expect(screen.queryByText("MOCK DRAWER")).not.toBeInTheDocument();
//     // ? because we are mocking the SwipeableDrawer, it will always appear
//     // ? in the document if we use this approach.
//   });

//   test('clicking on the "Open Drawer" Button shows "MOCK DRAWER"', () => {
//     render(<MyDrawer />);
//     user.click(screen.getByRole("button", { name: "Open Drawer" }));
//     expect(screen.getByText("MOCK DRAWER")).toBeInTheDocument();
//   });
// });

// ? testing approach not using mock
describe("MyDrawer", () => {
  beforeEach(() => {
    render(<MyDrawer />);
  });

  test('"Hello World" does not appear initially', () => {
    expect(screen.queryByText(/Hello World/i)).not.toBeInTheDocument();
  });

  test('"Hello World" appears after Open Drawer button is clicked', () => {
    user.click(screen.getByRole("button", { name: "Open Drawer" }));
    expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
  });
});
