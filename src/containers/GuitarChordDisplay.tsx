import * as React from "react";

import { testFingering1 } from "../music/guitar/Fingering";
import { standardGuitarTuning } from "src/music/Music";

import Fretboard from "src/components/guitar/Fretboard";

export interface Props {}

export interface State {}

export default class GuitarChordDisplay extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Fretboard
          width={1200}
          height={300}
          numStrings={6}
          numFrets={12}
          tuning={standardGuitarTuning}
          fingerings={testFingering1}
          portraitOrientation
        />
      </div>
    );
  }
}
