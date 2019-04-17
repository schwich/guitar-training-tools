import { IFingering, NoteBackgroundSymbol, IKey } from '../Music';
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

// export function generateFingeringFromScalePattern(key: IKey, scalePattern: IScalePattern): Array<IFingering> {
//     let { minorRoot, majorRoot, pattern } = scalePattern;
//     let { keyType, chromaticNote } = key;

//     let fingering = [];
//     for (let p of pattern) {

//     }
// }
