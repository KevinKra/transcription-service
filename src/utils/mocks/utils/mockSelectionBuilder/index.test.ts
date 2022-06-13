import { TranscriptSelection } from "../../../types";
import { IMetaSelectionIndexes, mockSelectionBuilder } from "./index";

describe("mockSelectionBuilder()", () => {
  let defaultSelection: TranscriptSelection;
  let customSelection: TranscriptSelection;
  let defaultIndexes: IMetaSelectionIndexes;
  let customIndexes: IMetaSelectionIndexes;

  beforeAll(() => {
    defaultSelection = {
      id: "1234-abcd-efgh",
      singleLine: false,
      content: "example content",
      alternate: "",
      translation: {
        content: "Guten Tag",
      },
      startTime: 0,
      endTime: 1,
    };
    customSelection = {
      id: "1234-abcd-efgh",
      singleLine: false,
      content: "this is a custom selection",
      alternate: "",
      translation: {
        content: "Guten Tag",
      },
      startTime: 0,
      endTime: 1,
    };
    defaultIndexes = {
      epicIndex: 0,
      chapterIndex: 0,
      selectionIndex: 0,
    };
    customIndexes = {
      epicIndex: 1,
      chapterIndex: 2,
      selectionIndex: 3,
    };
  });

  it("can return a default selection", () => {
    const result = mockSelectionBuilder("selection");
    expect(result).toEqual({
      ...defaultSelection,
    });
  });
  it("can return a default metaSelection with default indexes", () => {
    const result = mockSelectionBuilder("metaSelection");
    expect(result).toEqual({
      ...defaultIndexes,
      ...defaultSelection,
    });
  });
  it("can return a default metaSelection with custom indexes", () => {
    const result = mockSelectionBuilder(
      "metaSelection",
      undefined,
      customIndexes
    );
    expect(result).toEqual({
      ...customIndexes,
      ...defaultSelection,
    });
  });
  it("can return a custom selection", () => {
    const result = mockSelectionBuilder("selection", customSelection);
    expect(result).toEqual(customSelection);
  });
  it("can return a custom metaSelection", () => {
    const result = mockSelectionBuilder(
      "metaSelection",
      customSelection,
      customIndexes
    );
    expect(result).toEqual({ ...customIndexes, ...customSelection });
  });
  it("can accept a custom selection argument with only one or more values provided", () => {
    const resultOne = mockSelectionBuilder("selection", {
      content: "only content is provided",
    });
    const resultTwo = mockSelectionBuilder("selection", {
      content: "content and other attributes provided",
      alternate: "like an alternate",
      singleLine: true,
    });
    expect(resultOne).toEqual({
      ...defaultSelection,
      content: "only content is provided",
    });
    expect(resultTwo).toEqual({
      ...defaultSelection,
      content: "content and other attributes provided",
      alternate: "like an alternate",
      singleLine: true,
    });
  });
});
