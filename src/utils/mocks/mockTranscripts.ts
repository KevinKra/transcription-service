import {
  TranscriptSelection,
  MetaTranscriptSelection,
  RawTranscript,
  RawTranscriptSegment,
  ParsedTranscript,
} from "../types";
import { mockSelectionBuilder } from "./utils/mockSelectionBuilder";

export const MOCK_RAW_TRANSCRIPT_SEGMENT_EX1: RawTranscriptSegment = {
  startTime: "4.94",
  endTime: "11.165",
  alternatives: [
    // * distinction: alternatives have a clear primary
    {
      overallAccuracy: "0.95",
      transcript: "The world is changed. I feel it in the water,",
      items: [
        {
          startTime: "4.94",
          confidence: "1.0",
          endTime: "5.15",
          type: "pronunciation",
          content: "The",
        },
        {
          startTime: "5.15",
          confidence: "1.0",
          endTime: "5.72",
          type: "pronunciation",
          content: "world",
        },
        {
          startTime: "5.73",
          confidence: "0.504",
          endTime: "5.91",
          type: "pronunciation",
          content: "is",
        },
        {
          startTime: "5.91",
          confidence: "1.0",
          endTime: "6.8",
          type: "pronunciation",
          content: "changed",
        },
        {
          confidence: "0.0",
          type: "punctuation",
          content: ".",
        },
        {
          startTime: "7.54",
          confidence: "1.0",
          endTime: "8.32",
          type: "pronunciation",
          content: "I",
        },
        {
          startTime: "8.33",
          confidence: "1.0",
          endTime: "8.77",
          type: "pronunciation",
          content: "feel",
        },
        {
          startTime: "8.77",
          confidence: "1.0",
          endTime: "8.93",
          type: "pronunciation",
          content: "it",
        },
        {
          startTime: "8.93",
          confidence: "1.0",
          endTime: "9.08",
          type: "pronunciation",
          content: "in",
        },
        {
          startTime: "9.08",
          confidence: "1.0",
          endTime: "9.21",
          type: "pronunciation",
          content: "the",
        },
        {
          startTime: "9.21",
          confidence: "1.0",
          endTime: "10.14",
          type: "pronunciation",
          content: "water",
        },
        {
          confidence: "0.0",
          type: "punctuation",
          content: ",",
        },
      ],
    },
    {
      overallAccuracy: "0.90",
      transcript: "The world has changed and I feel it in the water.",
      items: [
        {
          startTime: "4.94",
          confidence: "1.0",
          endTime: "5.15",
          type: "pronunciation",
          content: "The",
        },
        {
          startTime: "5.15",
          confidence: "1.0",
          endTime: "5.73",
          type: "pronunciation",
          content: "world",
        },
        {
          startTime: "5.74",
          confidence: "0.496",
          endTime: "5.91",
          type: "pronunciation",
          content: "has",
        },
        {
          startTime: "5.91",
          confidence: "1.0",
          endTime: "6.68",
          type: "pronunciation",
          content: "changed",
        },
        {
          startTime: "6.69",
          confidence: "0.413",
          endTime: "6.82",
          type: "pronunciation",
          content: "and",
        },
        {
          startTime: "7.54",
          confidence: "1.0",
          endTime: "8.32",
          type: "pronunciation",
          content: "I",
        },
        {
          startTime: "8.33",
          confidence: "1.0",
          endTime: "8.77",
          type: "pronunciation",
          content: "feel",
        },
        {
          startTime: "8.77",
          confidence: "1.0",
          endTime: "8.93",
          type: "pronunciation",
          content: "it",
        },
        {
          startTime: "8.93",
          confidence: "1.0",
          endTime: "9.08",
          type: "pronunciation",
          content: "in",
        },
        {
          startTime: "9.08",
          confidence: "1.0",
          endTime: "9.21",
          type: "pronunciation",
          content: "the",
        },
        {
          startTime: "9.21",
          confidence: "1.0",
          endTime: "10.14",
          type: "pronunciation",
          content: "water",
        },
        {
          confidence: "0.0",
          type: "punctuation",
          content: ".",
        },
      ],
    },
  ],
};

export const MOCK_RAW_TRANSCRIPT_SEGMENT_EX2: RawTranscriptSegment = {
  startTime: "15.34",
  endTime: "15.865",
  alternatives: [
    // * distinction: only one alternate exists
    {
      overallAccuracy: "0.59",
      transcript: "Really?",
      items: [
        {
          startTime: "15.34",
          confidence: "0.589",
          endTime: "15.85",
          type: "pronunciation",
          content: "Really",
        },
        {
          confidence: "0.0",
          type: "punctuation",
          content: "?",
        },
      ],
    },
  ],
};

export const MOCK_RAW_TRANSCRIPT_SEGMENT_EX3: RawTranscriptSegment = {
  startTime: "16.24",
  endTime: "18.365",
  alternatives: [
    // * distinction: alternates overallAccuracy is tied
    {
      overallAccuracy: "1.00",
      transcript: "I smell it in the air.",
      items: [
        {
          startTime: "16.24",
          confidence: "1.0",
          endTime: "16.53",
          type: "pronunciation",
          content: "I",
        },
        {
          startTime: "16.53",
          confidence: "1.0",
          endTime: "17.02",
          type: "pronunciation",
          content: "smell",
        },
        {
          startTime: "17.02",
          confidence: "1.0",
          endTime: "17.32",
          type: "pronunciation",
          content: "it",
        },
        {
          startTime: "17.33",
          confidence: "1.0",
          endTime: "17.49",
          type: "pronunciation",
          content: "in",
        },
        {
          startTime: "17.49",
          confidence: "1.0",
          endTime: "17.7",
          type: "pronunciation",
          content: "the",
        },
        {
          startTime: "17.7",
          confidence: "1.0",
          endTime: "18.36",
          type: "pronunciation",
          content: "air",
        },
        {
          confidence: "0.0",
          type: "punctuation",
          content: ".",
        },
      ],
    },
    {
      overallAccuracy: "1.00",
      transcript: "I I smell it in the air.",
      items: [
        {
          startTime: "16.24",
          confidence: "1.0",
          endTime: "16.33",
          type: "pronunciation",
          content: "I",
        },
        {
          startTime: "16.34",
          confidence: "1.0",
          endTime: "16.53",
          type: "pronunciation",
          content: "I",
        },
        {
          startTime: "16.53",
          confidence: "1.0",
          endTime: "17.02",
          type: "pronunciation",
          content: "smell",
        },
        {
          startTime: "17.02",
          confidence: "1.0",
          endTime: "17.32",
          type: "pronunciation",
          content: "it",
        },
        {
          startTime: "17.33",
          confidence: "1.0",
          endTime: "17.49",
          type: "pronunciation",
          content: "in",
        },
        {
          startTime: "17.49",
          confidence: "1.0",
          endTime: "17.7",
          type: "pronunciation",
          content: "the",
        },
        {
          startTime: "17.7",
          confidence: "1.0",
          endTime: "18.36",
          type: "pronunciation",
          content: "air",
        },
        {
          confidence: "0.0",
          type: "punctuation",
          content: ".",
        },
      ],
    },
  ],
};

export const MOCK_RAW_TRANSCRIPT_MICRO: RawTranscript = {
  transcripts: [
    {
      transcript:
        "The world is changed. I feel it in the water, Really? I smell it in the air.",
    },
  ],
  segments: [
    // startTime: '4.94',
    // endTime: '11.165',
    MOCK_RAW_TRANSCRIPT_SEGMENT_EX1,
    // startTime: '15.34',
    // endTime: '15.865',
    MOCK_RAW_TRANSCRIPT_SEGMENT_EX2,
    // startTime: '16.24',
    // endTime: '18.365',
    MOCK_RAW_TRANSCRIPT_SEGMENT_EX3,
  ],
};

export const MOCK_RAW_TRANSCRIPT: RawTranscript = {
  transcripts: [
    {
      transcript:
        "The world is changed. I feel it in the water, I feel it in the earth, muslim. Really? I smell it in the air. Much that once was has lost for none now live who remember it.",
    },
  ],
  segments: [
    MOCK_RAW_TRANSCRIPT_SEGMENT_EX1,
    {
      startTime: "11.84",
      endTime: "14.765",
      alternatives: [
        {
          overallAccuracy: "1.00",
          transcript: "I feel it in the earth, muslim.",
          items: [
            {
              startTime: "11.84",
              confidence: "1.0",
              endTime: "12.06",
              type: "pronunciation",
              content: "I",
            },
            {
              startTime: "12.06",
              confidence: "1.0",
              endTime: "12.44",
              type: "pronunciation",
              content: "feel",
            },
            {
              startTime: "12.44",
              confidence: "1.0",
              endTime: "12.59",
              type: "pronunciation",
              content: "it",
            },
            {
              startTime: "12.59",
              confidence: "1.0",
              endTime: "12.7",
              type: "pronunciation",
              content: "in",
            },
            {
              startTime: "12.7",
              confidence: "1.0",
              endTime: "12.96",
              type: "pronunciation",
              content: "the",
            },
            {
              startTime: "12.96",
              confidence: "1.0",
              endTime: "13.91",
              type: "pronunciation",
              content: "earth",
            },
            {
              confidence: "0.0",
              type: "punctuation",
              content: ",",
            },
            {
              startTime: "14.01",
              confidence: "0.997",
              endTime: "14.75",
              type: "pronunciation",
              content: "muslim",
            },
            {
              confidence: "0.0",
              type: "punctuation",
              content: ".",
            },
          ],
        },
        {
          overallAccuracy: "0.89",
          transcript: "I feel it in the earth. I muslim.",
          items: [
            {
              startTime: "11.84",
              confidence: "1.0",
              endTime: "12.06",
              type: "pronunciation",
              content: "I",
            },
            {
              startTime: "12.06",
              confidence: "1.0",
              endTime: "12.44",
              type: "pronunciation",
              content: "feel",
            },
            {
              startTime: "12.44",
              confidence: "1.0",
              endTime: "12.59",
              type: "pronunciation",
              content: "it",
            },
            {
              startTime: "12.59",
              confidence: "1.0",
              endTime: "12.7",
              type: "pronunciation",
              content: "in",
            },
            {
              startTime: "12.7",
              confidence: "1.0",
              endTime: "12.96",
              type: "pronunciation",
              content: "the",
            },
            {
              startTime: "12.96",
              confidence: "1.0",
              endTime: "13.88",
              type: "pronunciation",
              content: "earth",
            },
            {
              confidence: "0.0",
              type: "punctuation",
              content: ".",
            },
            {
              startTime: "13.89",
              confidence: "0.132",
              endTime: "14.15",
              type: "pronunciation",
              content: "I",
            },
            {
              startTime: "14.16",
              confidence: "0.997",
              endTime: "14.75",
              type: "pronunciation",
              content: "muslim",
            },
            {
              confidence: "0.0",
              type: "punctuation",
              content: ".",
            },
          ],
        },
      ],
    },
    MOCK_RAW_TRANSCRIPT_SEGMENT_EX2,
    MOCK_RAW_TRANSCRIPT_SEGMENT_EX3,
    {
      startTime: "19.74",
      endTime: "21.165",
      alternatives: [
        {
          overallAccuracy: "1.00",
          transcript: "Much that once was",
          items: [
            {
              startTime: "19.74",
              confidence: "1.0",
              endTime: "20.13",
              type: "pronunciation",
              content: "Much",
            },
            {
              startTime: "20.13",
              confidence: "1.0",
              endTime: "20.29",
              type: "pronunciation",
              content: "that",
            },
            {
              startTime: "20.3",
              confidence: "1.0",
              endTime: "20.6",
              type: "pronunciation",
              content: "once",
            },
            {
              startTime: "20.6",
              confidence: "1.0",
              endTime: "21.15",
              type: "pronunciation",
              content: "was",
            },
          ],
        },
      ],
    },
    {
      startTime: "21.84",
      endTime: "22.765",
      alternatives: [
        {
          overallAccuracy: "0.84",
          transcript: "has lost",
          items: [
            {
              startTime: "21.84",
              confidence: "0.687",
              endTime: "22.16",
              type: "pronunciation",
              content: "has",
            },
            {
              startTime: "22.16",
              confidence: "1.0",
              endTime: "22.76",
              type: "pronunciation",
              content: "lost",
            },
          ],
        },
        {
          overallAccuracy: "0.64",
          transcript: "is lost",
          items: [
            {
              startTime: "21.84",
              confidence: "0.279",
              endTime: "22.16",
              type: "pronunciation",
              content: "is",
            },
            {
              startTime: "22.16",
              confidence: "1.0",
              endTime: "22.76",
              type: "pronunciation",
              content: "lost",
            },
          ],
        },
      ],
    },
    {
      startTime: "24.04",
      endTime: "25.665",
      alternatives: [
        {
          overallAccuracy: "1.00",
          transcript: "for none now live",
          items: [
            {
              startTime: "24.04",
              confidence: "1.0",
              endTime: "24.37",
              type: "pronunciation",
              content: "for",
            },
            {
              startTime: "24.37",
              confidence: "1.0",
              endTime: "24.78",
              type: "pronunciation",
              content: "none",
            },
            {
              startTime: "24.78",
              confidence: "1.0",
              endTime: "25.1",
              type: "pronunciation",
              content: "now",
            },
            {
              startTime: "25.11",
              confidence: "0.999",
              endTime: "25.66",
              type: "pronunciation",
              content: "live",
            },
          ],
        },
      ],
    },
    {
      startTime: "26.24",
      endTime: "27.365",
      alternatives: [
        {
          overallAccuracy: "1.00",
          transcript: "who remember it.",
          items: [
            {
              startTime: "26.24",
              confidence: "0.997",
              endTime: "26.54",
              type: "pronunciation",
              content: "who",
            },
            {
              startTime: "26.54",
              confidence: "0.998",
              endTime: "27.06",
              type: "pronunciation",
              content: "remember",
            },
            {
              startTime: "27.06",
              confidence: "1.0",
              endTime: "27.35",
              type: "pronunciation",
              content: "it",
            },
            {
              confidence: "0.0",
              type: "punctuation",
              content: ".",
            },
          ],
        },
      ],
    },
    {
      startTime: "31.24",
      endTime: "31.465",
      alternatives: [
        {
          overallAccuracy: "0.52",
          transcript: "Mhm.",
          items: [
            {
              startTime: "31.24",
              confidence: "0.52",
              endTime: "31.45",
              type: "pronunciation",
              content: "Mhm",
            },
            {
              confidence: "0.0",
              type: "punctuation",
              content: ".",
            },
          ],
        },
      ],
    },
    {
      startTime: "42.10",
      endTime: "43.50",
      alternatives: [
        {
          overallAccuracy: "0.50",
          transcript: "Time difference test 1.",
          items: [
            {
              startTime: "31.24",
              confidence: "0.52",
              endTime: "31.45",
              type: "pronunciation",
              content: "Mhm",
            },
            {
              confidence: "0.0",
              type: "punctuation",
              content: ".",
            },
          ],
        },
      ],
    },
    {
      startTime: "44.10",
      endTime: "44.50",
      alternatives: [
        {
          overallAccuracy: "0.50",
          transcript: "Time difference test 2.",
          items: [
            {
              startTime: "31.24",
              confidence: "0.52",
              endTime: "31.45",
              type: "pronunciation",
              content: "Mhm",
            },
            {
              confidence: "0.0",
              type: "punctuation",
              content: ".",
            },
          ],
        },
      ],
    },
    {
      startTime: "54.10",
      endTime: "54.50",
      alternatives: [
        {
          overallAccuracy: "0.52",
          transcript: "Time difference test 3.",
          items: [
            {
              startTime: "31.24",
              confidence: "0.52",
              endTime: "31.45",
              type: "pronunciation",
              content: "Mhm",
            },
            {
              confidence: "0.0",
              type: "punctuation",
              content: ".",
            },
          ],
        },
      ],
    },
  ],
};

export const MOCK_PARSED_TRANSCRIPT: ParsedTranscript = {
  epics: [
    {
      id: "123",
      title: "Translated Epic",
      chapters: [
        {
          id: "456",
          title: "",
          selections: [
            {
              id: "1234-5678-abcd-0000",
              singleLine: false,
              content: "The world is changed.",
              startTime: 4,
              endTime: 11,
              translation: {
                content: "die Welt ist verändert.",
              },
            },
            {
              id: "1234-5678-abcd-1234",
              singleLine: false,
              content: "I feel it in the water.",
              startTime: 4,
              endTime: 11,
              translation: {
                content: "Ich spüre es im Wasser.",
              },
            },
            {
              id: "1234-5678-abcd-1111",
              singleLine: false,
              content: "I feel it in the Earth.",
              startTime: 11,
              endTime: 15,
              translation: {
                content: "Ich spüre es in der Erde.",
              },
            },
            {
              id: "1234-5678-abcd-3333",
              singleLine: false,
              content: "I smell it in the air.",
              startTime: 16,
              endTime: 19,
              translation: {
                content: "Ich rieche es in der Luft.",
              },
            },
            {
              id: "1234-5678-abcd-4444",
              singleLine: false,
              content: "Much that once was, is lost.",
              startTime: 19,
              endTime: 22,
              translation: {
                content: "Vieles, was einmal war, ist verloren.",
              },
            },
            {
              id: "1234-5678-abcd-6666",
              singleLine: false,
              content: "For none now live, who remember it.",
              startTime: 24,
              endTime: 26,
              translation: {
                content: "Denn keiner lebt jetzt, der sich daran erinnert.",
              },
            },
          ],
        },
      ],
    },
  ],
};

export const MOCK_PARSED_TRANSCRIPT_MICRO: ParsedTranscript = {
  epics: [
    {
      id: "1234-avcc-1234-hyfd-ytre",
      title: "Creation of the Ring",
      chapters: [
        {
          id: "4224-avcc-3413-hyfd-ytre",
          title: "Introduction",
          selections: [
            mockSelectionBuilder("selection", {
              content: "the world is changed.",
            }),
            mockSelectionBuilder("selection", {
              content: "i feel it in the water.",
            }),
            mockSelectionBuilder("selection", {
              content: "i feel it in the earth.",
            }),
          ],
        },
      ],
    },
  ],
};

export const MOCK_META_SELECTION: MetaTranscriptSelection =
  mockSelectionBuilder("metaSelection", undefined, {
    epicIndex: 0,
    chapterIndex: 0,
    selectionIndex: 0,
  }) as MetaTranscriptSelection;

export const MOCK_PRUNED_SELECTION: TranscriptSelection =
  mockSelectionBuilder("selection");
