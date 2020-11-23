import {
  createChromaticSequence,
  generateNoteSequenceFromFingering, IFingering,
  INote,
  standardGuitarTuning,
} from "../../../music/Music";
import * as React from "react";

interface FretNotesProps {
  stringStartX: number;
  stringStartY: number;
  numFrets: number;
  numStrings: number;
  stringSpacing: number;
  fretSpacing: number;
  fretWidth: number;
  noteRadius: number;
  guitarTuning: string[];
  onNoteClicked?: (stringNum: number, noteClicked: string[]) => void;
  hideNoteNames?: boolean;
  fingering?: Array<IFingering>;
}

export default function FretNotes(props: FretNotesProps) {
  const {
    stringStartX,
    stringStartY,
    numFrets,
    numStrings,
    stringSpacing,
    fretSpacing,
    fretWidth,
    noteRadius,
    guitarTuning,
    onNoteClicked,
    fingering,
  } = props;

  const hideNoteNames = props.hideNoteNames || false;

  // calculate note start X (to account for open string's note, which is behind the nut)
  const noteStartX = stringStartX - (fretSpacing - fretWidth / 2) / 2;

  return (
    <g>
      {Array.from(Array(numStrings).keys()).map((_, stringIdx) => {
        let noteSequence: Array<INote>;
        if (fingering) {
          noteSequence = generateNoteSequenceFromFingering(
            stringIdx + 1,
            numFrets + 1,
            fingering,
            standardGuitarTuning
          );
        } else {
          noteSequence = createChromaticSequence(
            guitarTuning[stringIdx],
            numFrets + 1
          ); // account for 12 frets + open string
        }

        return (
          <g
            key={stringIdx}
            transform={`translate(${noteStartX},${
              stringStartY + stringSpacing * stringIdx
            })`}
          >
            {Array.from(Array(numFrets + 1).keys()).map((_, noteIdx) => {
              return (
                <g
                  onClick={() => {
                    onNoteClicked &&
                      onNoteClicked(stringIdx + 1, noteSequence[noteIdx].label);
                  }}
                  key={noteIdx}
                  transform={`translate(${noteIdx * fretSpacing}, 0)`}
                >
                  {noteSequence[noteIdx].display ? (
                    <circle
                      r={noteRadius}
                      style={{
                        fill: "white",
                        stroke: "gray",
                        strokeWidth: 2,
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {noteSequence[noteIdx].display && !hideNoteNames ? (
                    noteSequence[noteIdx].enharmonic ? (
                      <text
                        x={(-1 * noteRadius) / 2}
                        y={noteRadius / 2}
                        fontSize="12"
                      >
                        {fingering && noteSequence[noteIdx].fingerNum ? (
                          <React.Fragment>
                            <tspan
                              fontSize="14"
                              dx={noteRadius / 4.4}
                              dy={(-1 * noteRadius) / 5}
                            >
                              {noteSequence[noteIdx].fingerNum}
                            </tspan>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <tspan
                              x={(-1 * noteRadius) / 2}
                              dy={(-1 * noteRadius) / 1.7}
                            >
                              {noteSequence[noteIdx].label[0]}
                            </tspan>
                            <tspan
                              x={(-1 * noteRadius) / 2}
                              dy={noteRadius / 1.2}
                            >
                              {noteSequence[noteIdx].label[1]}
                            </tspan>
                          </React.Fragment>
                        )}
                      </text>
                    ) : (
                      <text
                        x={(-1 * noteRadius) / 3.3}
                        y={noteRadius / 3.2}
                        fontSize="14"
                      >
                        {fingering && noteSequence[noteIdx].fingerNum ? ( // display finger numbers if available (for chords)
                          <React.Fragment>
                            {noteSequence[noteIdx].fingerNum}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {noteSequence[noteIdx].label[0]}
                          </React.Fragment>
                        )}
                      </text>
                    )
                  ) : (
                    "" // don't display note names, return empty string
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}