import * as React from 'react'
import { createChromaticSequence, standardGuitarTuning } from 'src/music/Music';

export interface Props {
    numFrets: number,
    shouldDisplayNoteNames: boolean
    handleNoteClicked: (stringNum:number, noteClicked: string[]) => void
}

const NUM_STRINGS = 6

export default class Fretboard extends React.Component<Props, object> {

    constructor(props: Props) {
        super(props)
    }

    onNoteClicked = (stringNum: number, note?: string[]) => {
        if (note) {
            this.props.handleNoteClicked(stringNum, note);
        }
    }

    render() {
        const {shouldDisplayNoteNames, numFrets} = this.props;

        const x = 83;
        const y = 35;
        const cx = 260;
        const cy = 275;
        const r = 10;

        return (
            <svg width="1200" height="300">
                <g>
                    <rect x={x} y={y} width="5" height="210" style={{
                        stroke: 'gray',
                        fill: 'black',
                        strokeWidth: 1
                    }} />
                {
                    // frets
                    (Array.from(Array(numFrets).keys())).map((_, i) => {
                        return <rect key={i} x={x + (70 * (i+1))} y={y} width="5" height="210" style={{
                            stroke: 'gray',
                            fill: 'white',
                            strokeWidth: 1
                        }} />
                    })
                }
                </g>
                <g>
                {
                    // dot inlays
                    [0, 1, 2, 3].map((_, i) => {
                        return <circle key={i} cx={cx + (140 * i)} cy={cy} r={r} style={{
                            stroke: 'none',
                            fill: 'lightgray',
                        }} />
                    })
                }
                    <circle cx={cx + (140*3) + 195} cy={cy} r={r} style={{
                        stroke: 'none', 
                        fill: 'lightgray'
                    }} />
                    <circle cx={cx + (140*3) + 225} cy={cy} r={r} style={{
                        stroke: 'none', 
                        fill: 'lightgray'
                    }} />
                    
                </g>
                <g>
                {
                    // strings
                    (Array.from(Array(NUM_STRINGS).keys())).map((_, i) => {
                        return <g key={i} transform={`translate(0, ${20 + ((i)*40)})`}>
                                    <line x1="90" y1="20" x2={72*(numFrets+1)} y2="20" style={{ //x2=1160
                                        stroke: 'black',
                                        strokeWidth: 2
                                    }} />
                                    <StringOfNotes 
                                        stringNum={i + 1} // zero-based index to string number (1-6)
                                        startNote={standardGuitarTuning[i]} 
                                        length={numFrets + 1} // account for the unfretted string note 
                                        onNoteClicked={this.onNoteClicked} 
                                        shouldDisplayNames={shouldDisplayNoteNames}
                                    />
                                </g>
                    })
                }
                </g>
            </svg>
        )
    }
}

interface StringOfNotesProps {
    stringNum: number,
    startNote: string,
    length: number,
    shouldDisplayNames: boolean,
    onNoteClicked?: (stringNum: number, note?: string[]) => void
}

function StringOfNotes({stringNum, startNote, length, onNoteClicked, shouldDisplayNames}: StringOfNotesProps) {
    const x = 35;
    const y = 5;

    const chromaticSequence = createChromaticSequence(startNote, length)

    return (
        <React.Fragment>
        {
            (Array.from(Array(length).keys())).map((_, i) => {
                return (
                    <g key={i} transform={`translate(${x + (70 * i)}, ${y})`} onClick={() => {onNoteClicked && onNoteClicked(stringNum, chromaticSequence[i].label)}}>
                        <circle cx="15" cy="15" r="15" style={{
                            fill: 'white',
                            stroke: 'gray',
                            strokeWidth: 2
                        }} />
                        {
                            shouldDisplayNames 
                            ? (
                                chromaticSequence[i].enharmonic 
                                ? (
                                    <text x="9.5" y="20" fontSize="11">
                                        <tspan x="9.5" dy="-6">{chromaticSequence[i].label[0]}</tspan>
                                        <tspan x="9.5" dy="10.5">{chromaticSequence[i].label[1]}</tspan>
                                    </text>
                                )
                                : (
                                    <text x="10.2" y="20" fontSize="12">
                                        <tspan x="10" dy="0">
                                            {chromaticSequence[i].label[0]}
                                        </tspan>
                                    </text>
                                )
                            )
                            : (
                                '' // don't display note names, return empty string
                            )
                        }
                    </g>
                )
            })
        }
        </React.Fragment>
    )
}