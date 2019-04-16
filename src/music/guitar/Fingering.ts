import { IFingering, NoteBackgroundSymbol } from '../Music';

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
    { stringNum: 6, fret: 3, fingerNum: 2, noteBackgroundSymbol: NoteBackgroundSymbol.Diamond }, // G
    { stringNum: 6, fret: 5, fingerNum: 4 }, // A
    { stringNum: 5, fret: 2, fingerNum: 1 }, // B
    { stringNum: 5, fret: 3, fingerNum: 2 }, // C
    { stringNum: 5, fret: 5, fingerNum: 4 }, // D
    { stringNum: 4, fret: 2, fingerNum: 1 }, // E
    { stringNum: 4, fret: 4, fingerNum: 3 }, // F#
    { stringNum: 4, fret: 5, fingerNum: 5 } // G
]