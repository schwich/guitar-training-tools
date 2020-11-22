import * as React from "react";

import Fretboard from "../components/guitar/Fretboard";

import { generateFingeringFromKeyAndScalePattern } from "../music/guitar/Fingering";
import {
  standardGuitarTuning,
  KeyNote,
  IFingering,
  KeyType,
  IKey,
  Accidental,
} from "../music/Music";
import ScaleChooser from "src/components/scale-display/ScaleChooser";
import KeyChooser from "src/components/guitar/KeyChooser";
import {
  ScaleShape,
  PentatonicPattern1,
  getPatternFromType,
  ScaleShapeType,
  getScaleTypeFromShape,
  getPatternFromIdx,
} from "src/music/guitar/ScalePattern";
import PatternControl from "src/components/scale-display/PatternControl";

export interface Props {}

export interface State {
  keyNote: KeyNote;
  keyType: KeyType;
  keyAccidental: Accidental;
  scaleShape: ScaleShape;
  scaleShapeType: ScaleShapeType;
  scaleFingering: Array<IFingering>;
  scalePatternIdx: number;
}

export default class GuitarScaleDisplay extends React.Component<Props, State> {
  private numFrets = 12; // todo

  constructor(props: Props) {
    super(props);

    let key: IKey = {
      note: KeyNote.C,
      accidental: Accidental.Natural,
      type: KeyType.Major,
    };

    this.state = {
      keyNote: KeyNote.C,
      keyType: KeyType.Major,
      keyAccidental: Accidental.Natural,
      scaleShapeType: ScaleShapeType.Pentatonic,
      scaleShape: ScaleShape.Pentatonic_1,
      scaleFingering: generateFingeringFromKeyAndScalePattern(
        key,
        PentatonicPattern1,
        standardGuitarTuning,
        this.numFrets
      ),
      scalePatternIdx: 0,
    };
  }

  handleKeyTypeChanged = (type: KeyType) => {
    let key: IKey = {
      note: this.state.keyNote,
      accidental: this.state.keyAccidental,
      type,
    };
    this.setState({
      keyType: type,
      scaleFingering: generateFingeringFromKeyAndScalePattern(
        key,
        getPatternFromType(this.state.scaleShape),
        standardGuitarTuning,
        this.numFrets
      ),
    });
  };

  handleKeyNoteChanged = (note: KeyNote, accidental: Accidental) => {
    let key: IKey = {
      note,
      accidental,
      type: this.state.keyType,
    };
    this.setState({
      keyNote: note,
      scaleFingering: generateFingeringFromKeyAndScalePattern(
        key,
        getPatternFromType(this.state.scaleShape),
        standardGuitarTuning,
        this.numFrets
      ),
    });
  };

  handleScaleChosen = (scaleShape: ScaleShape) => {
    let key: IKey = {
      note: this.state.keyNote,
      accidental: this.state.keyAccidental,
      type: this.state.keyType,
    };

    this.setState({
      scaleShape,
      scaleShapeType: getScaleTypeFromShape(scaleShape),
      scaleFingering: generateFingeringFromKeyAndScalePattern(
        key,
        getPatternFromType(scaleShape),
        standardGuitarTuning,
        this.numFrets
      ),
    });
  };

  handleScalePatternIdxChanged = (idx: number) => {
    let key: IKey = {
      note: this.state.keyNote,
      accidental: this.state.keyAccidental,
      type: this.state.keyType,
    };

    // what is the next pattern based on idx?
    let pattern = getPatternFromIdx(this.state.scaleShapeType, idx);

    this.setState({
      scalePatternIdx: idx,
      scaleFingering: generateFingeringFromKeyAndScalePattern(
        key,
        pattern,
        standardGuitarTuning,
        this.numFrets
      ),
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <h4>Scale Pattern</h4>
            <ScaleChooser handleScaleChosen={this.handleScaleChosen} />
          </div>

          <div>
            <h4>Key</h4>
            <KeyChooser
              keyNoteChanged={this.handleKeyNoteChanged}
              keyTypeChanged={this.handleKeyTypeChanged}
            />
          </div>

          <div>
            <PatternControl
              scalePatternIdxChanged={this.handleScalePatternIdxChanged}
              scalePatternIdx={this.state.scalePatternIdx}
              scalePatternType={this.state.scaleShape}
            />
          </div>
        </div>

        <Fretboard
          width={1200}
          height={300}
          numStrings={6}
          numFrets={15}
          tuning={standardGuitarTuning}
          fingerings={this.state.scaleFingering}
          showDotInlays
        />
      </div>
    );
  }
}
