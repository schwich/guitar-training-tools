export interface IRootNote {
    stringNum: number,
    idxInScalePattern: number
}


export interface IPatternNote {
    patternIdx: number,
    stringNum: number,
    baseFretOffset: number
}

export interface IScalePattern {
    minorRoot: IRootNote,
    majorRoot: IRootNote,
    pattern: Array<IPatternNote>
}

export const PentatonicPattern1: IScalePattern = {
    minorRoot: {
        stringNum: 6,
        idxInScalePattern: 1
    },
    majorRoot: {
        stringNum: 6,
        idxInScalePattern: 2
    },
    pattern: [ // string 6 -> 1
        { patternIdx: 1, stringNum: 6, baseFretOffset: 0 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 4 },
        { patternIdx: 3, stringNum: 5, baseFretOffset: 0 },
        { patternIdx: 4, stringNum: 5, baseFretOffset: 3 },
        { patternIdx: 5, stringNum: 4, baseFretOffset: 0 },
        { patternIdx: 6, stringNum: 4, baseFretOffset: 3 },
        { patternIdx: 7, stringNum: 3, baseFretOffset: 0 },
        { patternIdx: 8, stringNum: 3, baseFretOffset: 3 },
        { patternIdx: 9, stringNum: 2, baseFretOffset: 0 },
        { patternIdx: 10, stringNum: 2, baseFretOffset: 4 },
        { patternIdx: 11, stringNum: 1, baseFretOffset: 0 },
        { patternIdx: 12, stringNum: 1, baseFretOffset: 4 },
    ]
}