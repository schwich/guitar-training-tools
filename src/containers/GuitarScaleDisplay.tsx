import * as React from 'react';

import Fretboard from '../components/guitar/Fretboard';

import { GMajorScale } from '../music/guitar/Fingering';
import { standardGuitarTuning } from '../music/Music';
import ScaleChooser from 'src/components/scale-display/ScaleChooser';

export interface Props {

}

export interface State {

}

export default class GuitarScaleDisplay extends React.Component<Props, State> {

    render () {
        return (
            <div>
                <ScaleChooser />

                <Fretboard
                    width={1200}
                    height={300}
                    numStrings={6}
                    numFrets={12}
                    tuning={standardGuitarTuning}
                    fingerings={GMajorScale}
                />
            </div>
        )
    }

}