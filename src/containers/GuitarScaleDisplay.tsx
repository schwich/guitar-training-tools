import * as React from 'react';

import Fretboard from '../components/guitar/Fretboard';

import { generateFingeringFromKeyAndScalePattern } from '../music/guitar/Fingering';
import { standardGuitarTuning, KeyNote, IFingering, KeyType, IKey, Accidental } from '../music/Music';
import ScaleChooser from 'src/components/scale-display/ScaleChooser';
import KeyChooser from 'src/components/guitar/KeyChooser';
import { ScalePatternType, 
    PentatonicPattern1, PentatonicPattern2,
    PentatonicPattern3, PentatonicPattern4, PentatonicPattern5 } from 'src/music/guitar/ScalePattern';

export interface Props {

}

export interface State {
    keyNote: KeyNote,
    keyType: KeyType,
    scalePatternType: ScalePatternType,
    scaleFingering: Array<IFingering>
}

export default class GuitarScaleDisplay extends React.Component<Props, State> {

    private numFrets = 12; // todo

    constructor(props: Props) {
        super(props);

        let key: IKey = {
            note: KeyNote.C,
            accidental: Accidental.Sharp,
            type: KeyType.Major
        }

        this.state = {
            keyNote: KeyNote.C,
            keyType: KeyType.Major,
            scalePatternType: ScalePatternType.Pentatonic_1,
            scaleFingering: generateFingeringFromKeyAndScalePattern(
                key, PentatonicPattern1, standardGuitarTuning, this.numFrets
            )
        }
    }

    handleKeyTypeChanged = (type: KeyType) => {
        let key: IKey = {
            note: this.state.keyNote,
            accidental: Accidental.Sharp,
            type
        }
        this.setState({ 
            keyType: type,
            scaleFingering: generateFingeringFromKeyAndScalePattern(
                key, PentatonicPattern1, standardGuitarTuning, this.numFrets
            )
        });
    }

    handleKeyNoteChanged = (note: KeyNote) => {
        let key: IKey = {
            note,
            accidental: Accidental.Sharp,
            type: this.state.keyType
        }
        this.setState({ 
            keyNote: note,
            scaleFingering: generateFingeringFromKeyAndScalePattern(
                key, PentatonicPattern1, standardGuitarTuning, this.numFrets
            )
        });
    }

    handleScaleChosen = (scalePatternType: ScalePatternType) => {
        let key: IKey = {
            note: this.state.keyNote,
            accidental: Accidental.Sharp,
            type: this.state.keyType
        }

        let pattern;
        switch (scalePatternType) {
            case ScalePatternType.Pentatonic_1:
                pattern = PentatonicPattern1;
            break;
            case ScalePatternType.Pentatonic_2:
                pattern = PentatonicPattern2;
            break;
            case ScalePatternType.Pentatonic_3:
                pattern = PentatonicPattern3;
            break;
            case ScalePatternType.Pentatonic_4:
                pattern = PentatonicPattern4;
            break;
            case ScalePatternType.Pentatonic_5:
                pattern = PentatonicPattern5;
            break;
            default:
                pattern = PentatonicPattern1;
            break;
        }

        this.setState({ 
            scalePatternType,
            scaleFingering: generateFingeringFromKeyAndScalePattern(
                key, pattern, standardGuitarTuning, this.numFrets
            )
        });
    }

    render () {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
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
        )
    }

}