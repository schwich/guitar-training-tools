import * as React from 'react'
// import { createChromaticSequence } from 'src/music/Music';
// import Fingering from './Fingering';



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

    // const fretX = 50;
    // const fretY = 35;
    const fretWidth = 5;
    // const fretHeight = 210;

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

export interface IGuitarFingering {

}

export interface Props {
    height: number,
    width: number,
    title?: string,
    numStrings: number,
    numFrets: number,
    tuning: string[], // TODO Array<INote>
    showDotInlays?: boolean,
    showFretNumbers?: boolean,
    fingerings?: Array<IGuitarFingering>,
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
            // tuning,
            // hideNoteNames,
            // fingerings
        } = this.props;

        const svgTopMargin = 20;
        const svgBottomMargin = 20;

        // calculate note radius

        // fretHeight is derived from <svg>'s height
        const fretHeight = height - svgTopMargin - svgBottomMargin;
        console.log(`fretHeight=${fretHeight}`);

        const svgWidthBucket = Math.ceil(width / (numFrets + 2));
        console.log(`svgWidthBucket=${svgWidthBucket}`);
        // calculate where to start frets, derived from note radius

        // calculate how far to space frets

        // calc where to start strings

        // string Y
        const stringSpacing = Math.ceil(fretHeight / numStrings);
        console.log(`stringSpacing=${stringSpacing}`);

        // calc how long strings should be
        const stringWidth = svgWidthBucket + (svgWidthBucket * (numFrets)) 
        console.log(`stringWidth=${stringWidth}`);

      

        // calc how to 
        const svgHeightBucket = Math.ceil(height / (numStrings + 1));
        console.log(`svgHeightBucket=${svgHeightBucket}`);

        


        return (
            <svg style={{border: '1px solid black'}} width={width} height={height}>

                {/* draw frets */}
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
                    stringLength={stringWidth}
                />

                {/* {
                    // todo draw title of fretboard
                }

                <Frets numFrets={numFrets} />

                <DotInlays numInlays={5} />

                {
                    // draw the strings
                    (Array.from(Array(numStrings).keys())).map((_, stringIdx) => (
                        <GuitarString
                            numFrets={numFrets}
                            stringOffsetY={stringIdx}
                        >
                            {
                                // if there is a fingering, show it
                                fingerings
                                ? (
                                    <Fingering
                                        fingering={fingerings[stringIdx]}
                                        length={numFrets + 1} //acount for string root note
                                    />
                                )
                                // otherwise, show all notes on each string
                                : (     
                                    <StringOfNotes
                                        stringNum={stringIdx + 1} // zero-based index to string number (1-6)
                                        startNote={tuning[stringIdx]} 
                                        length={numFrets + 1} // account for the unfretted string note 
                                        onNoteClicked={this.onNoteClicked} 
                                        shouldDisplayNames={hideNoteNames || false}
                                    />
                                )
                            } 
                        </GuitarString>
                    ))
                } */}
            </svg>
        )
    }
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
                    <line x1={startX} y1={startY + (spacing * idx)} x2={stringLength} y2={startY + (spacing * idx)} style={{ 
                        stroke: color || 'black',
                        strokeWidth: 2
                    }} />
                )
            })
        }
        </g>
        
    )
}

// interface GuitarStringProps {
//     children: React.ReactNode,
//     numFrets: number,
//     stringOffsetY: number,
//     stringColor?: string
// }

// function GuitarString(props: GuitarStringProps) {

//     let { numFrets, stringOffsetY } = props;

//     return (
//         <g transform={`translate(0, ${20 + ((stringOffsetY)*40)})`}>

//             <line x1="55" y1="20" x2={72*(numFrets+1)} y2="20" style={{ //x2=1160
//                 stroke: 'black',
//                 strokeWidth: 2
//             }} />

//             {props.children}
                                    
//         </g>
//     )
// }

// interface FretsProps {
//     numFrets: number,
// }

// function Frets({numFrets}: FretsProps) {

//     const fretX = 50;
//     const fretY = 35;
//     const fretWidth = 5;
//     const fretHeight = 210;

//     return (
//         <g>
//             <rect x={fretX} y={fretY} width={fretWidth} height={fretHeight} style={{
//                 stroke: 'gray',
//                 fill: 'black',
//                 strokeWidth: 1
//             }} />
//             {
//                 (Array.from(Array(numFrets).keys())).map((_, i) => {
//                     return <rect key={i} x={fretX + (70 * (i+1))} y={fretY} width={fretWidth} height={fretHeight} style={{
//                         stroke: 'gray',
//                         fill: 'white',
//                         strokeWidth: 1
//                     }} />
//                 })
//             }
//         </g>
//     )
// }

// interface DotInlaysProps {
//     numInlays: number
// }

// function DotInlays(props: DotInlaysProps) {
//     const cx = 230;
//     const cy = 275;
//     const r = 10;

//     return (
//         <g>
//             {
//                 [0, 1, 2, 3].map((_, i) => {
//                     return <circle key={i} cx={cx + (140 * i)} cy={cy} r={r} style={{
//                         stroke: 'none',
//                         fill: 'lightgray',
//                     }} />
//                 })
//             }
//                 <circle cx={cx + (140*3) + 195} cy={cy} r={r} style={{
//                     stroke: 'none', 
//                     fill: 'lightgray'
//                 }} />
//                 <circle cx={cx + (140*3) + 225} cy={cy} r={r} style={{
//                     stroke: 'none', 
//                     fill: 'lightgray'
//                 }} />
//         </g>
//     )
// }


// interface StringOfNotesProps {
//     stringNum: number,
//     startNote: string,
//     length: number,
//     shouldDisplayNames: boolean,
//     onNoteClicked?: (stringNum: number, note?: string[]) => void
// }

// function StringOfNotes({stringNum, startNote, length, onNoteClicked, shouldDisplayNames}: StringOfNotesProps) {
//     const x = 4;
//     const y = 5;

//     const chromaticSequence = createChromaticSequence(startNote, length)

//     return (
//         <React.Fragment>
//         {
//             (Array.from(Array(length).keys())).map((_, i) => {
//                 return (
//                     <g key={i} transform={`translate(${x + (70 * i)}, ${y})`} onClick={() => {onNoteClicked && onNoteClicked(stringNum, chromaticSequence[i].label)}}>
//                         <circle cx="15" cy="15" r="15" style={{
//                             fill: 'white',
//                             stroke: 'gray',
//                             strokeWidth: 2
//                         }} />
//                         {
//                             shouldDisplayNames 
//                             ? (
//                                 chromaticSequence[i].enharmonic 
//                                 ? (
//                                     <text x="9.5" y="20" fontSize="11">
//                                         <tspan x="9.5" dy="-6">{chromaticSequence[i].label[0]}</tspan>
//                                         <tspan x="9.5" dy="10.5">{chromaticSequence[i].label[1]}</tspan>
//                                     </text>
//                                 )
//                                 : (
//                                     <text x="10.2" y="20" fontSize="12">
//                                         <tspan x="10" dy="0">
//                                             {chromaticSequence[i].label[0]}
//                                         </tspan>
//                                     </text>
//                                 )
//                             )
//                             : (
//                                 '' // don't display note names, return empty string
//                             )
//                         }
//                     </g>
//                 )
//             })
//         }
//         </React.Fragment>
//     )
// }