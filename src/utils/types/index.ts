import { IAlertStatus } from "../../redux/slices/alertSlice/alertSlice";

// * Selections
export interface TranscriptSelection {
  id: string;
  singleLine: boolean;
  content: string;
  alternate?: string;
  startTime: number;
  endTime: number;
  translation: {
    content: string;
  };
}

export type MetaTranscriptSelection = TranscriptSelection & {
  epicIndex: number;
  chapterIndex: number;
  selectionIndex: number;
};

// * Transcripts
export interface ParsedTranscript {
  epics: {
    id: string;
    title: string;
    chapters: {
      id: string;
      title?: string;
      selections: TranscriptSelection[];
    }[];
  }[];
}

export interface RawTranscript {
  transcripts: {
    transcript: string;
  }[];
  segments: RawTranscriptSegment[];
}

export interface RawTranscriptSegment {
  startTime: string;
  endTime: string;
  alternatives: RawTranscriptAlternative[];
}

export interface RawTranscriptAlternative {
  transcript: string;
  overallAccuracy: string;
  items: {
    startTime?: string;
    endTime?: string;
    confidence: string;
    type: string;
    content: string;
  }[];
}

// * Other
export interface ITimeStamp {
  startTime: number;
  endTime?: number;
}

export interface IQueryResponse {
  type: IAlertStatus;
  message: string;
  data?: any;
}
