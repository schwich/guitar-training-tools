import { getRandomInt } from 'src/util/Util';

export interface INote {
    chromaticIdx: number,
    enharmonic: boolean,
    label: string[],
    color?: string,
    display?: boolean,
    fingerNum ?: number
}

export interface IBarre {
    fromStr: number
    toStr: number
}

export enum NoteBackgroundSymbol {
    Circle,
    Diamond,
    Square
}

export interface IFingering {
    stringNum?: number,
    fret: number,
    fingerNum?: number,
    barre?: IBarre,
    majorRoot ?: boolean,
    minorRoot ?: boolean
    noteBackgroundSymbol?: NoteBackgroundSymbol,
    color ?: string
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

export enum KeyNote {
    F = 'F',
    C = 'C',
    G = 'G',
    D = 'D',
    A = 'A',
    E = 'E',
    B = 'B'
}

export enum Accidental {
    Sharp,
    Flat
}

export enum KeyType {
    Major,
    Minor
}

export interface IKey {
    note: KeyNote,
    accidental: Accidental,
    type: KeyType
}

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
 * Take a fingering and generate a note sequence for an entire string, including blank notes for non-fretted notes.
 * @param stringNum what string are we generating a sequence for
 * @param length number of notes to generate in the sequence, usually the total number of frets
 * @param fingering what notes to include in the sequence
 */
export function generateNoteSequenceFromFingering(
    stringNum: number, length: number, fingering: Array<IFingering>): Array<INote> {
    let notesInString = fingering.filter(note => {
        return stringNum === note.stringNum; 
    })

    let noteSequence = [];
    for (let i = 0; i < length; i++) { // push #(length) of notes to noteSequence
        let frettedNote = notesInString.find(note => {
            return note.fret === i;
        })

        if (frettedNote) {
            noteSequence.push({
                display: true,
                fingerNum: frettedNote.fingerNum,
                ...notes[i % 12] // make sure to create a new object from the notes
            })
        } else {
            noteSequence.push({
                display: false,
                ...notes[i % 12]
            })
        }
    }

    return noteSequence;
}

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

/**
 * 
 * @param startNote 
 * @param length 
 */
export function createChromaticSequence(startNote: string, length: number): INote[] {
    let nextIdx = getChromaticArrIdx(startNote);
    let notesIncluded = []
    for (let i = 0; i < length; i++) {
        let n = { ...notes[nextIdx], display: true } // new object
        notesIncluded.push(n)
        nextIdx = (nextIdx + 1) % 12;
    }
    return notesIncluded
}

/**
 * 
 * @param tonic 
 * @param type 
 */
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

/**
 * 
 * @param tonic 
 * @param pattern 
 */
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
