import { IFingering, NoteBackgroundSymbol, IKey, KeyType, createChromaticSequence } from '../Music';
import { IScalePattern } from './ScalePattern';

export const testFingering1: Array<IFingering> = [
    {
        fret: 1,
        barre: {fromStr: 1, toStr: 5}
    },
    {fret: 2, stringNum: 2, fingerNum: 2},
    {fret: 3, stringNum: 3, fingerNum: 3},
    {fret: 3, stringNum: 4, fingerNum: 4}
]

export const GMajorScale: Array<IFingering> = [
    { stringNum: 6, fret: 3, fingerNum: 2, noteBackgroundSymbol: NoteBackgroundSymbol.Diamond, majorRoot: true }, // G
    { stringNum: 6, fret: 5, fingerNum: 4 }, // A
    { stringNum: 5, fret: 2, fingerNum: 1 }, // B
    { stringNum: 5, fret: 3, fingerNum: 2 }, // C
    { stringNum: 5, fret: 5, fingerNum: 4 }, // D
    { stringNum: 4, fret: 2, fingerNum: 1 }, // E
    { stringNum: 4, fret: 4, fingerNum: 3 }, // F#
    { stringNum: 4, fret: 5, fingerNum: 4, majorRoot: true }, // G
    { stringNum: 3, fret: 2, fingerNum: 1}, // A
    { stringNum: 3, fret: 4, fingerNum: 3}, // B
    { stringNum: 3, fret: 5, fingerNum: 4}, // C
    { stringNum: 2, fret: 3, fingerNum: 2}, // D
    { stringNum: 2, fret: 5, fingerNum: 4}, // E
    { stringNum: 1, fret: 2, fingerNum: 1}, // F#
    { stringNum: 1, fret: 3, fingerNum: 2, majorRoot: true }, // G
    { stringNum: 1, fret: 5, fingerNum: 4}
]

export function generateFingeringFromKeyAndScalePattern(
    key: IKey, 
    scalePattern: IScalePattern, 
    stringTuning: string[],
    stringLength: number
    ): Array<IFingering> {
    let { minorRoot, majorRoot, pattern } = scalePattern;
    let { note, type } = key;

    // pivot off of major or minor root depending on key
    let rootString;
    if (type === KeyType.Major) {
        rootString = majorRoot.stringNum;
    } else if (type === KeyType.Minor) {
        rootString = minorRoot.stringNum;
    }

    // find the fret number on that string for the root note / tonic
    let stringNotes;
    switch (rootString) {
        case 6:
            stringNotes = createChromaticSequence(stringTuning[5], stringLength); // todo really need to create a tuning type
        break;

        case 5:
            stringNotes = createChromaticSequence(stringTuning[4], stringLength);
        break;

        case 4:
            stringNotes = createChromaticSequence(stringTuning[3], stringLength);
        break;

        default:
            throw Error(`Rootstring=${rootString}`)
    }

    // define fret baseline
    let fretBaseline = 0;
    for (let i = 0; i < stringNotes.length; i++) {
        if (stringNotes[i].label.includes(note)) {
            fretBaseline = i;
            break;
        }
    }

    switch (type) {
        case KeyType.Major:
            fretBaseline -= 4;
            if (fretBaseline < 0) {
                fretBaseline += 12;
            }
        break;

        case KeyType.Minor: 
        break;
    }
    
    
    let fingering: Array<IFingering> = [];
    for (let p of pattern) {
        fingering.push({
            stringNum: p.stringNum,
            fret: fretBaseline + p.baseFretOffset
        });
    }

    return fingering;
}
