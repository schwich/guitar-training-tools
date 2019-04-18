export interface IRootNote {
    stringNum: number,
    idxInScalePattern: number,
    offsetFromBaseFret: number
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

export enum ScalePatternType {
    Pentatonic_1,
    Pentatonic_2,
    Pentatonic_3,
    Pentatonic_4,
    Pentatonic_5,
    Major
}

export const PentatonicPattern1: IScalePattern = {
    minorRoot: {
        stringNum: 6,
        idxInScalePattern: 1,
        offsetFromBaseFret: 0
    },
    majorRoot: {
        stringNum: 6,
        idxInScalePattern: 2,
        offsetFromBaseFret: 3
    },
    pattern: [ // string 6 -> 1
        { patternIdx: 1, stringNum: 6, baseFretOffset: 0 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 3 },
        { patternIdx: 3, stringNum: 5, baseFretOffset: 0 },
        { patternIdx: 4, stringNum: 5, baseFretOffset: 2 },
        { patternIdx: 5, stringNum: 4, baseFretOffset: 0 },
        { patternIdx: 6, stringNum: 4, baseFretOffset: 2 },
        { patternIdx: 7, stringNum: 3, baseFretOffset: 0 },
        { patternIdx: 8, stringNum: 3, baseFretOffset: 2 },
        { patternIdx: 9, stringNum: 2, baseFretOffset: 0 },
        { patternIdx: 10, stringNum: 2, baseFretOffset: 3 },
        { patternIdx: 11, stringNum: 1, baseFretOffset: 0 },
        { patternIdx: 12, stringNum: 1, baseFretOffset: 3 },
    ]
}

export const PentatonicPattern2: IScalePattern = {
    minorRoot: {
        stringNum: 4,
        idxInScalePattern: 5,
        offsetFromBaseFret: 0
    },
    majorRoot: {
        stringNum: 6,
        idxInScalePattern: 1,
        offsetFromBaseFret: 1
    }, 
    pattern: [
        { patternIdx: 1, stringNum: 6, baseFretOffset: 1 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 3 },
        { patternIdx: 1, stringNum: 5, baseFretOffset: 0 },
        { patternIdx: 3, stringNum: 5, baseFretOffset: 3 },
        { patternIdx: 4, stringNum: 4, baseFretOffset: 0 },
        { patternIdx: 5, stringNum: 4, baseFretOffset: 3 },
        { patternIdx: 6, stringNum: 3, baseFretOffset: 0 },
        { patternIdx: 7, stringNum: 3, baseFretOffset: 2 },
        { patternIdx: 8, stringNum: 2, baseFretOffset: 1 },
        { patternIdx: 9, stringNum: 2, baseFretOffset: 3 },
        { patternIdx: 10, stringNum: 1, baseFretOffset: 1 },
        { patternIdx: 11, stringNum: 1, baseFretOffset: 3 },
    ]
}

export const PentatonicPattern3: IScalePattern = {
    minorRoot: {
        stringNum: 5,
        idxInScalePattern: 4,
        offsetFromBaseFret: 3
    },
    majorRoot: {
        stringNum: 4,
        idxInScalePattern: 5,
        offsetFromBaseFret: 1
    }, 
    pattern: [
        { patternIdx: 1, stringNum: 6, baseFretOffset: 1 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 3 },
        { patternIdx: 1, stringNum: 5, baseFretOffset: 1 },
        { patternIdx: 3, stringNum: 5, baseFretOffset: 3 },
        { patternIdx: 4, stringNum: 4, baseFretOffset: 1 },
        { patternIdx: 5, stringNum: 4, baseFretOffset: 3 },
        { patternIdx: 6, stringNum: 3, baseFretOffset: 0 },
        { patternIdx: 7, stringNum: 3, baseFretOffset: 3 },
        { patternIdx: 8, stringNum: 2, baseFretOffset: 1 },
        { patternIdx: 9, stringNum: 2, baseFretOffset: 4 },
        { patternIdx: 10, stringNum: 1, baseFretOffset: 1 },
        { patternIdx: 11, stringNum: 1, baseFretOffset: 3 },
    ]
}

export const PentatonicPattern4: IScalePattern = {
    minorRoot: {
        stringNum: 5,
        idxInScalePattern: 3,
        offsetFromBaseFret: 0
    },
    majorRoot: {
        stringNum: 5,
        idxInScalePattern: 4,
        offsetFromBaseFret: 3
    }, 
    pattern: [
        { patternIdx: 1, stringNum: 6, baseFretOffset: 0 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 3 },
        { patternIdx: 1, stringNum: 5, baseFretOffset: 0 },
        { patternIdx: 3, stringNum: 5, baseFretOffset: 3 },
        { patternIdx: 4, stringNum: 4, baseFretOffset: 0 },
        { patternIdx: 5, stringNum: 4, baseFretOffset: 2 },
        { patternIdx: 6, stringNum: 3, baseFretOffset: 0 },
        { patternIdx: 7, stringNum: 3, baseFretOffset: 2 },
        { patternIdx: 8, stringNum: 2, baseFretOffset: 1 },
        { patternIdx: 9, stringNum: 2, baseFretOffset: 3 },
        { patternIdx: 10, stringNum: 1, baseFretOffset: 0 },
        { patternIdx: 11, stringNum: 1, baseFretOffset: 3 },
    ]
}

export const PentatonicPattern5: IScalePattern = {
    minorRoot: {
        stringNum: 6,
        idxInScalePattern: 2,
        offsetFromBaseFret: 3
    },
    majorRoot: {
        stringNum: 5,
        idxInScalePattern: 3,
        offsetFromBaseFret: 1
    }, 
    pattern: [
        { patternIdx: 1, stringNum: 6, baseFretOffset: 1 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 3 },
        { patternIdx: 1, stringNum: 5, baseFretOffset: 1 },
        { patternIdx: 3, stringNum: 5, baseFretOffset: 3 },
        { patternIdx: 4, stringNum: 4, baseFretOffset: 0 },
        { patternIdx: 5, stringNum: 4, baseFretOffset: 3 },
        { patternIdx: 6, stringNum: 3, baseFretOffset: 0 },
        { patternIdx: 7, stringNum: 3, baseFretOffset: 3 },
        { patternIdx: 8, stringNum: 2, baseFretOffset: 1 },
        { patternIdx: 9, stringNum: 2, baseFretOffset: 3 },
        { patternIdx: 10, stringNum: 1, baseFretOffset: 1 },
        { patternIdx: 11, stringNum: 1, baseFretOffset: 3 },
    ]
}