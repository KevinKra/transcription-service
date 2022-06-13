/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { TranscriptSelection, MetaTranscriptSelection } from ;

// TODO: get ts imports working
import { MetaTranscriptSelection, TranscriptSelection } from "../../../types";

export interface IMetaSelectionIndexes {
  epicIndex: number;
  chapterIndex: number;
  selectionIndex: number;
}

type OptionalTranscriptSelection = Partial<TranscriptSelection>;

export const mockSelectionBuilder = (
  format: "selection" | "metaSelection",
  mockSelection?: OptionalTranscriptSelection,
  indexes?: IMetaSelectionIndexes
): TranscriptSelection | MetaTranscriptSelection => {
  let selection: TranscriptSelection = {
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

  // * if mockSelection is provided, override generic selection with new values as provided
  if (mockSelection) {
    selection = { ...selection, ...mockSelection };
  }

  const mockIndexes = { epicIndex: 0, chapterIndex: 0, selectionIndex: 0 };

  const metaSelection: MetaTranscriptSelection = {
    ...(indexes || mockIndexes),
    ...selection,
  };

  return format === "selection" ? selection : metaSelection;
};
