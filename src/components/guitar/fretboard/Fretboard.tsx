import * as React from "react";
import { IFingering } from "src/music/Music";
import FretInlays from "./FretInlays";
import Frets from "./Frets";
import FretLabels from "./FretLabels";
import FretNotes from "./FretNotes";
import GuitarStrings from "./GuitarStrings";
import FretBarres from "./FretBarres";

export interface Props {
  height: number;
  width: number;
  title?: string;
  numStrings: number;
  numFrets: number;
  tuning: string[]; // TODO Array<INote>
  showDotInlays?: boolean;
  showFretNumbers?: boolean;
  fingerings?: Array<IFingering>;
  noteSelection?: string[]; // TODO Array<INote>
  hideNoteNames?: boolean;
  portraitOrientation?: boolean;
  handleNoteClicked?: (stringNum: number, noteClicked: string[]) => void;
}

export default class Fretboard extends React.Component<Props, object> {
  constructor(props: Props) {
    super(props);
  }

  // todo still need?
  onNoteClicked = (stringNum: number, note?: string[]) => {
    if (note && this.props.handleNoteClicked) {
      this.props.handleNoteClicked(stringNum, note);
    }
  };

  render() {
    let {
      height,
      width,
      numStrings,
      numFrets,
      tuning,
      hideNoteNames,
      handleNoteClicked,
      fingerings,
      portraitOrientation,
    } = this.props;

    // todo
    if (portraitOrientation) {
      // what needs to change?
    }

    const noteRadius = 15;
    const topGutter = noteRadius * 2;
    const bottomGutter = noteRadius * 2;
    const fretWidth = 5;
    const fretHeight = height - topGutter - bottomGutter;
    const fretBoxWidth = width / (numFrets + 2); // evenly divide svg's width so the frets are even
    const fretBoxHeight = height / (numStrings + 1);
    const stringLength = fretBoxWidth + fretBoxWidth * numFrets; // make sure that ends of the strings touch the ends of the frets

    const stringSpacing = height / (numStrings + 1);

    let fretLabels;
    if (this.props.showFretNumbers) {
      fretLabels = (
        <FretLabels
          startY={0.5 * topGutter}
          numFrets={numFrets}
          fretWidth={fretBoxWidth}
        />
      );
    } else {
      fretLabels = null;
    }

    let dotInlays;
    if (this.props.showDotInlays) {
      dotInlays = (
        <FretInlays
          numFrets={numFrets}
          startX={fretBoxWidth}
          startY={height - bottomGutter / 2}
          fretSpacing={fretBoxWidth}
          fretWidth={fretWidth}
          inlayRadius={noteRadius * 0.33}
        />
      );
    } else {
      dotInlays = null;
    }

    let fingeringsDisplay;
    if (fingerings) {
      fingeringsDisplay = (
        <FretBarres
          stringStartX={fretBoxWidth}
          stringStartY={fretBoxHeight}
          numStrings={numStrings}
          numFrets={numFrets}
          stringSpacing={stringSpacing}
          fretSpacing={fretBoxWidth}
          fingerings={fingerings}
        />
      );
    } else {
      fingeringsDisplay = null;
    }

    return (
      <svg width={width} height={height}>
        {fretLabels}

        <Frets
          startX={fretBoxWidth}
          startY={topGutter}
          fretHeight={fretHeight}
          fretWidth={fretWidth}
          fretSpacing={fretBoxWidth}
          numFrets={numFrets}
        />

        {dotInlays}

        <GuitarStrings
          startX={fretBoxWidth}
          startY={fretBoxHeight}
          numStrings={numStrings}
          spacing={stringSpacing}
          stringLength={stringLength}
        />

        <FretNotes
          stringStartX={fretBoxWidth}
          stringStartY={fretBoxHeight}
          numStrings={numStrings}
          numFrets={numFrets}
          stringSpacing={stringSpacing}
          fretSpacing={fretBoxWidth}
          fretWidth={fretWidth}
          noteRadius={noteRadius}
          guitarTuning={tuning}
          hideNoteNames={hideNoteNames}
          onNoteClicked={handleNoteClicked}
          fingering={fingerings}
        />

        {fingeringsDisplay}
      </svg>
    );
  }
}
