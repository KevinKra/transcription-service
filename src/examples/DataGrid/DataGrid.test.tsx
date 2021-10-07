import { fireEvent, render, screen } from "@testing-library/react";
import { Example2, rows } from "./DataGrid";
import { mocked } from "ts-jest/utils";
import { DataGrid } from "@mui/x-data-grid";

jest.mock("@mui/x-data-grid", () => ({
  ...jest.requireActual("@mui/x-data-grid"),
  // ? jest.requireActual allows to copy everything from module
  DataGrid: jest.fn(() => <div>Table</div>),
  // ? with DataGrid being overridden as the div above
}));

const mockDataGrid = mocked(DataGrid);

describe("DataGrid (my component)", () => {
  beforeEach(() => {
    mockDataGrid.mockClear();
  });

  test("renders Mui DataGrid with columnDefs and rowData", () => {
    const myOnMoney = jest.fn();

    render(<Example2 onMoney={myOnMoney} />);
    fireEvent.click(
      screen.getByRole("button", { name: /give me 33 dollars/i })
    );
    expect(myOnMoney).toHaveBeenCalledTimes(1);
    expect(myOnMoney).toHaveBeenCalledWith(33);
  });

  test("renders table passing the expected props", () => {
    render(<Example2 onMoney={jest.fn()} />);
    expect(mockDataGrid).toHaveBeenCalledTimes(1);
    expect(mockDataGrid).toHaveBeenCalledWith(
      {
        rows: rows,
        columns: [
          expect.objectContaining({ field: "id" }),
          expect.objectContaining({ field: "firstName" }),
          expect.objectContaining({ field: "lastName" }),
          expect.objectContaining({ field: "age" }),
        ],
        pageSize: 5,
        checkboxSelection: true,
      },
      {}
    );
  });
});
