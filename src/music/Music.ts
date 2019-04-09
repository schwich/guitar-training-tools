import { getRandomInt } from 'src/util/Util';

export interface INote {
    chromaticIdx: number,
    enharmonic: boolean,
    label: string[],
    color?: string
}

export interface INoteSPN extends INote {
    octaveNum: number
}

export const notes: INote[] = [
    {chromaticIdx: 1, enharmonic: false, label: ['A'], color: 'green'},
    {chromaticIdx: 2, enharmonic: true, label: ['A♯', 'B♭']},
    {chromaticIdx: 3, enharmonic: false, label: ['B'], color: 'blue'},
    {chromaticIdx: 4, enharmonic: false, label: ['C'], color: 'yellow'},
    {chromaticIdx: 5, enharmonic: true, label: ['C♯', 'D♭']},
    {chromaticIdx: 6, enharmonic: false, label: ['D'], color: 'orange'},
    {chromaticIdx: 7, enharmonic: true, label: ['D♯', 'E♭']},
    {chromaticIdx: 8, enharmonic: false, label: ['E'], color: 'red'},
    {chromaticIdx: 9, enharmonic: false, label: ['F'], color: 'aqua'},
    {chromaticIdx: 10, enharmonic: true, label: ['F♯', 'G♭']},
    {chromaticIdx: 11, enharmonic: false, label: ['G'], color: 'purple'},
    {chromaticIdx: 12, enharmonic: true, label: ['G♯', 'A♭']},
]

/**
 * The strings of the guitar (in standard tuning) represented in 
 * SPN = Scientific Pitch Notation
 */
export const standardGuitarTuningSPN = [
    'E4', 'B3', 'G3', 'D3', 'A2', 'E2'
]

export const standardGuitarTuning = [
    'E', 'B', 'G', 'D', 'A', 'E'
]

/**
 * 
 */
export function createChromaticSequenceSPN(startNote: string, startOctaveNum: number, length: number): INoteSPN[] {
    let nextIdx = getChromaticArrIdx(startNote);
    let notesIncluded = []
    let octaveNum = startOctaveNum;
    for (let i = 0; i < length; i++) {
        
        // make sure to create a new object
        let n = {
            ...notes[nextIdx],
            octaveNum
        }
        
        notesIncluded.push(n);

        // need to increment the octave number because we reached the end of the chromatic scale
        if (n.chromaticIdx === 12) {
            octaveNum++;
        }

        nextIdx = (nextIdx + 1) % 12;
    }

    return notesIncluded;
}

export function createChromaticSequence(startNote: string, length: number): INote[] {
    let nextIdx = getChromaticArrIdx(startNote);
    let notesIncluded = []
    for (let i = 0; i < length; i++) {
        let n = { ...notes[nextIdx] } // new object
        notesIncluded.push(n)
        nextIdx = (nextIdx + 1) % 12;
    }

    return notesIncluded
}

export function createScale(tonic: string, type: string) {
    switch(type) {
        case 'Major':
            return createNoteSequenceFromIntervalPattern(tonic, 'WWHWWWH')
        break;

        case 'Minor':
            return createNoteSequenceFromIntervalPattern(tonic, 'WHWWHWW')
        break;

        default:
            throw new Error();
    }
}

export function createNoteSequenceFromIntervalPattern(tonic: string, pattern: string) {
    let chromaticNoteIdx = getChromaticArrIdx(tonic);
    let scale = []
    scale.push(notes[chromaticNoteIdx])
    for (let step of pattern) {
        // whole step
        if (step === 'W') {
            chromaticNoteIdx = (chromaticNoteIdx + 2) % 12;
            
        } else if (step === 'H') { // half step
            chromaticNoteIdx = (chromaticNoteIdx + 1) % 12;
        }

        scale.push(notes[chromaticNoteIdx])
    }

    return scale
}

export function getNoteChromaticIndex(note: string) {
    return notes.filter( ({label}) => {
        return label.includes(note)
    })[0].chromaticIdx
}

export function getRandomChromaticNote() {
    let noteIdx = getRandomInt(0, 12);
    let randomNote = notes[noteIdx]
    if (randomNote.enharmonic) {
        return randomNote.label[getRandomInt(0, 2)]
    } else {
        return randomNote.label[0]
    }
}

function getChromaticArrIdx(note :string) {
    return getNoteChromaticIndex(note) - 1;
}
