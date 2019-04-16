import * as React from 'react'
import { createChromaticSequence, generateNoteSequenceFromFingering, IFingering, INote } from 'src/music/Music';

export interface Props {
    height: number,
    width: number,
    title?: string,
    numStrings: number,
    numFrets: number,
    tuning: string[], // TODO Array<INote>
    showDotInlays?: boolean,
    showFretNumbers?: boolean,
    fingerings?: Array<IFingering>,
    hideNoteNames?: boolean,
    handleNoteClicked: (stringNum:number, noteClicked: string[]) => void
}

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
        const {
            height,
            width,
            numStrings,
            numFrets,
            tuning,
            hideNoteNames,
            handleNoteClicked,
            fingerings
        } = this.props;

        const svgTopMargin = 20; // todo calc depending on title or not
        const svgBottomMargin = 20; // calc from dotInlays height
        const noteRadius = 15; // todo should calc from svg height/width
        const fretHeight = height - svgTopMargin - svgBottomMargin;
        const svgWidthBucket = Math.ceil(width / (numFrets + 2)); // evenly divide svg's width so the frets are even
        const stringSpacing = Math.ceil(fretHeight / numStrings); // evenly divide svg's height so the strings are spaced evenly
        const stringLength = svgWidthBucket + (svgWidthBucket * (numFrets)) // make sure that ends of the strings touch the ends of the frets
        const svgHeightBucket = Math.ceil(height / (numStrings + 1));

        return (
            <svg width={width} height={height}>

                <Frets 
                    startX={svgWidthBucket}
                    startY={svgTopMargin}
                    fretHeight={fretHeight}
                    fretSpacing={svgWidthBucket}
                    numFrets={numFrets}
                />

                <GuitarStrings
                    startX={svgWidthBucket}
                    startY={svgHeightBucket}
                    numStrings={numStrings}
                    spacing={stringSpacing}
                    stringLength={stringLength}
                />

                <FretNotes 
                    stringStartX={svgWidthBucket}
                    stringStartY={svgHeightBucket}
                    numStrings={numStrings}
                    numFrets={numFrets}
                    stringSpacing={stringSpacing}
                    fretSpacing={svgWidthBucket}
                    noteRadius={noteRadius}
                    guitarTuning={tuning}
                    hideNoteNames={hideNoteNames}
                    onNoteClicked={handleNoteClicked}
                    fingering={fingerings}
                />

                {
                    fingerings
                    ? (
                        <FretBarres
                            stringStartX={svgWidthBucket}
                            stringStartY={svgHeightBucket}
                            numStrings={numStrings}
                            numFrets={numFrets}
                            stringSpacing={stringSpacing}
                            fretSpacing={svgWidthBucket}
                            fingerings={fingerings}
                        />
                    )
                    : (
                        '' // don't render 
                    )
                }

            </svg>
        )
    }
}

interface FretsProps {
    startX: number,
    startY: number,
    fretHeight: number,
    fretSpacing: number,
    numFrets: number,
}

function Frets(props: FretsProps) {

    const {
        startX, 
        startY,
        fretHeight,
        fretSpacing,
        numFrets
    } = props;

    const fretWidth = 5; // todo maybe make this configurable?

    return (
        <g>
            {/* draw the nut */}
            <rect x={startX} y={startY} width={fretWidth} height={fretHeight} style={{
                stroke: 'gray',
                fill: 'black',
                strokeWidth: 1
            }} />
            {
                // draw the rest of the frets
                (Array.from(Array(numFrets).keys())).map((_, i) => {
                    return <rect key={i} x={startX + (fretSpacing * (i+1))} y={startY} width={fretWidth} height={fretHeight} style={{
                        stroke: 'gray',
                        fill: 'white',
                        strokeWidth: 1
                    }} />
                })
            }
        </g>
    )
}

interface FretBarresProps {
    stringStartX: number,
    stringStartY: number,
    numFrets: number,
    numStrings: number,
    stringSpacing: number,
    fretSpacing: number,
    fingerings: Array<IFingering>
}

interface BarreDimensions {
    x: number,
    y: number,
    width: number,
    height: number
}

function FretBarres(props: FretBarresProps) {

    const {
        // stringStartX,
        stringStartY,
        // numFrets,
        // numStrings,
        stringSpacing,
        fretSpacing,
        fingerings
    } = props;

    const barreWidth = 10;

    // generate a list of barres to render, with their dimensions

    let fingeredBarres = fingerings.filter((fingering) => {
        return fingering.barre;
    });
    console.log(fingeredBarres);

    let barreDimensions: Array<BarreDimensions> = [];
    fingeredBarres.map((barreObj) => {
        let { fret, barre } = barreObj;
        if (barre) {
            let { fromStr, toStr } = barre;

            console.log(`fromStr=${fromStr} toStr=${toStr}`)

            // should go from top string to bottom string so flip them if it's the opposite
            if (fromStr > toStr) {
                let tmp = fromStr;
                fromStr = toStr;
                toStr = tmp;
            }

            // next, switch from string numbers to array indexes
            fromStr -= 1;
            toStr -= 1;

            const startXPos = (fret + 0.5) * fretSpacing - (barreWidth/2); //account for open note and we want barre in the middle
            const startYPos = stringStartY + (fromStr * stringSpacing);
            const height = (stringStartY + (toStr * stringSpacing) - startYPos);

            barreDimensions.push({
                'x': startXPos,
                'y': startYPos,
                'width': barreWidth,
                'height': height
            })
        }
        else {
            throw Error("Barre does't exist");
        }
        
    });

    console.log(barreDimensions)
    

    return (
        <g>
        {
            barreDimensions.map(({x, y, height, width}, idx) => (       
                <React.Fragment>
                    <circle r={width/2} cx={x + width/2} cy={y} />
                    <rect key={idx} x={x} y={y} width={width} height={height} strokeWidth="2" fill="black" />
                    <circle r={width/2} cx={x + width/2} cy={y + height} strokeWidth="2" />
                </React.Fragment>
            ))
        }
        </g>
    )
}

interface FretNotesProps {
    stringStartX: number,
    stringStartY: number,
    numFrets: number,
    numStrings: number,
    stringSpacing: number,
    fretSpacing: number,
    noteRadius: number
    guitarTuning: string[],
    onNoteClicked?: (stringNum:number, noteClicked: string[]) => void,
    hideNoteNames?: boolean,
    fingering?: Array<IFingering>
}

function FretNotes(props: FretNotesProps) {

    const {
        stringStartX,
        stringStartY,
        numFrets,
        numStrings,
        stringSpacing,
        fretSpacing,
        noteRadius,
        guitarTuning,
        onNoteClicked,
        fingering
    } = props;

    const hideNoteNames = props.hideNoteNames || false;

    // calculate note start X (to account for open string's note, which is behind the nut)
    const noteStartX = stringStartX - (Math.ceil(fretSpacing / 2.25));

    // TODO calculate note radius from numfrets, fretboardWidth, fretboardHeight, and numStrings

    return (
        <g>
        {
            (Array.from(Array(numStrings).keys())).map((_, stringIdx) => {

                let noteSequence: Array<INote>;
                if (fingering) {
                    noteSequence = generateNoteSequenceFromFingering(stringIdx + 1, numFrets + 1, fingering);
                } else {
                    noteSequence = createChromaticSequence(guitarTuning[stringIdx], numFrets+1) // account for 12 frets + open string
                }

                return (
                    <g key={stringIdx} transform={`translate(${noteStartX},${stringStartY + (stringSpacing * stringIdx)})`}>
                    {
                        (Array.from(Array(numFrets+1).keys())).map((_, noteIdx) => {
                            return (
                                <g onClick={() => {onNoteClicked && onNoteClicked(stringIdx + 1, noteSequence[noteIdx].label)}} 
                                    key={noteIdx} 
                                    transform={`translate(${noteIdx * fretSpacing}, 0)`}
                                >
                                    {
                                        noteSequence[noteIdx].display
                                        ? (
                                            <circle r={noteRadius} style={{
                                                fill: 'white',
                                                stroke: 'gray',
                                                strokeWidth: 2
                                            }} />
                                        )
                                        : (
                                            ''
                                        )
                                    }
                                    {
                                        noteSequence[noteIdx].display && !hideNoteNames
                                        ? (
                                         
                                            noteSequence[noteIdx].enharmonic
                                            ? (
                                                <text x={-1 * noteRadius/2} y={noteRadius/2} fontSize="12">
                                                    <tspan x={-1 * noteRadius/2} dy={-1 * noteRadius/1.7}>{noteSequence[noteIdx].label[0]}</tspan>
                                                    <tspan x={-1 * noteRadius/2} dy={noteRadius/1.2}>{noteSequence[noteIdx].label[1]}</tspan>
                                                </text>
                                            )
                                            : (
                                                <text x={-1 * noteRadius/3.3} y={noteRadius/3.2} fontSize="14">
                                                    {noteSequence[noteIdx].label[0]}
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
                    </g>
                )
            })
        }
        </g>
    )
}

interface GuitarStringsProps {
    numStrings: number,
    startX: number,
    startY: number,
    stringLength: number,
    spacing: number,
    color?: string
}

function GuitarStrings(props: GuitarStringsProps) {

    const { 
        numStrings,
        startX,
        startY,
        spacing,
        color,
        stringLength
     } = props;

    return (
        <g>
        {
            Array.from(Array(numStrings).keys()).map((_, idx) => {
                return (
                    <line key={idx} x1={startX} y1={startY + (spacing * idx)} x2={stringLength} y2={startY + (spacing * idx)} style={{ 
                        stroke: color || 'black',
                        strokeWidth: 2
                    }} />
                )
            })
        }
        </g>
        
    )
}