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

export enum ScaleShapeType {
    Pentatonic,
    Major
}

export enum ScaleShape {
    Pentatonic_1,
    Pentatonic_2,
    Pentatonic_3,
    Pentatonic_4,
    Pentatonic_5,
    Major_1,
    Major_2,
    Major_3,
    Major_4,
    Major_5
}

export function getPatternFromIdx(shapeType: ScaleShapeType, patternIdx: number) {
    if (shapeType === ScaleShapeType.Pentatonic) {
        return PentatonicShapeGroup[patternIdx];
    } else if (shapeType === ScaleShapeType.Major) {
        return MajorScaleShapeGroup[patternIdx];
    } else {
        throw Error('Invalid Scale Shape Type')
    }
}

export function getScaleTypeFromShape(shape: ScaleShape): ScaleShapeType {
    switch (shape) {
        case ScaleShape.Pentatonic_1:
        case ScaleShape.Pentatonic_2:
        case ScaleShape.Pentatonic_3:
        case ScaleShape.Pentatonic_4:
        case ScaleShape.Pentatonic_5:
            return ScaleShapeType.Pentatonic;
        break;

        case ScaleShape.Major_1:
        case ScaleShape.Major_2:
        case ScaleShape.Major_3:
        case ScaleShape.Major_4:
        case ScaleShape.Major_5:
            return ScaleShapeType.Major;
        break;
        
    }
}

export function getPatternFromType(patternType: ScaleShape): IScalePattern {
    switch (patternType) {
        // pentatonic scales
        case ScaleShape.Pentatonic_1:
            return PentatonicPattern1;
        break;
        case ScaleShape.Pentatonic_2:
            return PentatonicPattern2;
        break;
        case ScaleShape.Pentatonic_3:
            return PentatonicPattern3;
        break;
        case ScaleShape.Pentatonic_4:
            return PentatonicPattern4;
        break;
        case ScaleShape.Pentatonic_5:
            return PentatonicPattern5;
        break;

        // major scales
        case ScaleShape.Major_1:
            return MajorScalePattern1;
        break;
        case ScaleShape.Major_2:
            return MajorScalePattern2;
        break;
        case ScaleShape.Major_3:
            return MajorScalePattern3;
        break;
        case ScaleShape.Major_4:
            return MajorScalePattern4;
        break;
        case ScaleShape.Major_5:
            return MajorScalePattern5;
        break;

        default:
            return PentatonicPattern1;
        break;
    }
}

// CAGED E Shape Pentatonic
export const MajorScalePattern1: IScalePattern = {
    minorRoot: {
        stringNum: -1,
        idxInScalePattern: -1,
        offsetFromBaseFret: -1
    },
    majorRoot: {
        stringNum: 6,
        idxInScalePattern: 2,
        offsetFromBaseFret: 1
    },
    pattern: [ // string 6 -> 1
        { patternIdx: 1, stringNum: 6, baseFretOffset: 0 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 1 },
        { patternIdx: 3, stringNum: 6, baseFretOffset: 3 },

        { patternIdx: 4, stringNum: 5, baseFretOffset: 0 },
        { patternIdx: 5, stringNum: 5, baseFretOffset: 1 },
        { patternIdx: 6, stringNum: 5, baseFretOffset: 3 },

        { patternIdx: 7, stringNum: 4, baseFretOffset: 0 },
        { patternIdx: 8, stringNum: 4, baseFretOffset: 2 },
        { patternIdx: 9, stringNum: 4, baseFretOffset: 3 },

        { patternIdx: 10, stringNum: 3, baseFretOffset: 0 },
        { patternIdx: 11, stringNum: 3, baseFretOffset: 2 },
        { patternIdx: 12, stringNum: 3, baseFretOffset: 3 },

        { patternIdx: 13, stringNum: 2, baseFretOffset: 1 },
        { patternIdx: 14, stringNum: 2, baseFretOffset: 3 },

        { patternIdx: 15, stringNum: 1, baseFretOffset: 0 },
        { patternIdx: 16, stringNum: 1, baseFretOffset: 1 },
        { patternIdx: 17, stringNum: 1, baseFretOffset: 3 },
    ]
}

// CAGED D Shape Pentatonic
export const MajorScalePattern2: IScalePattern = {
    minorRoot: {
        stringNum: -1,
        idxInScalePattern: -1,
        offsetFromBaseFret: -1
    },
    majorRoot: {
        stringNum: 4,
        idxInScalePattern: 7,
        offsetFromBaseFret: 1
    },
    pattern: [ // string 6 -> 1
        { patternIdx: 1, stringNum: 6, baseFretOffset: 1 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 3 },
        { patternIdx: 3, stringNum: 6, baseFretOffset: 4 },

        { patternIdx: 5, stringNum: 5, baseFretOffset: 1 },
        { patternIdx: 6, stringNum: 5, baseFretOffset: 3 },

        { patternIdx: 7, stringNum: 4, baseFretOffset: 0 },
        { patternIdx: 8, stringNum: 4, baseFretOffset: 1 },
        { patternIdx: 9, stringNum: 4, baseFretOffset: 3 },

        { patternIdx: 10, stringNum: 3, baseFretOffset: 0 },
        { patternIdx: 11, stringNum: 3, baseFretOffset: 1 },
        { patternIdx: 12, stringNum: 3, baseFretOffset: 3 },

        { patternIdx: 13, stringNum: 2, baseFretOffset: 1 },
        { patternIdx: 14, stringNum: 2, baseFretOffset: 3 },
        { patternIdx: 14, stringNum: 2, baseFretOffset: 4 },

        { patternIdx: 15, stringNum: 1, baseFretOffset: 1 },
        { patternIdx: 16, stringNum: 1, baseFretOffset: 3 },
        { patternIdx: 17, stringNum: 1, baseFretOffset: 4 },
    ]
}

// CAGED C Shape Pentatonic
export const MajorScalePattern3: IScalePattern = {
    minorRoot: {
        stringNum: -1,
        idxInScalePattern: -1,
        offsetFromBaseFret: -1
    },
    majorRoot: {
        stringNum: 5,
        idxInScalePattern: 6,
        offsetFromBaseFret: 3
    },
    pattern: [ // string 6 -> 1
        { patternIdx: 1, stringNum: 6, baseFretOffset: 0 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 1 },
        { patternIdx: 3, stringNum: 6, baseFretOffset: 3 },

        { patternIdx: 4, stringNum: 5, baseFretOffset: 0 },
        { patternIdx: 5, stringNum: 5, baseFretOffset: 2 },
        { patternIdx: 6, stringNum: 5, baseFretOffset: 3 },

        { patternIdx: 7, stringNum: 4, baseFretOffset: 0 },
        { patternIdx: 8, stringNum: 4, baseFretOffset: 2 },
        { patternIdx: 9, stringNum: 4, baseFretOffset: 3 },

        { patternIdx: 10, stringNum: 3, baseFretOffset: 0 },
        { patternIdx: 11, stringNum: 3, baseFretOffset: 2 },

        { patternIdx: 13, stringNum: 2, baseFretOffset: 0 },
        { patternIdx: 14, stringNum: 2, baseFretOffset: 1 },
        { patternIdx: 14, stringNum: 2, baseFretOffset: 3 },

        { patternIdx: 15, stringNum: 1, baseFretOffset: 0 },
        { patternIdx: 16, stringNum: 1, baseFretOffset: 1 },
        { patternIdx: 17, stringNum: 1, baseFretOffset: 3 },
    ]
}

// CAGED A Shape Pentatonic
export const MajorScalePattern4: IScalePattern = {
    minorRoot: {
        stringNum: -1,
        idxInScalePattern: -1,
        offsetFromBaseFret: -1
    },
    majorRoot: {
        stringNum: 5,
        idxInScalePattern: 5,
        offsetFromBaseFret: 2
    },
    pattern: [ // string 6 -> 1
        { patternIdx: 1, stringNum: 6, baseFretOffset: 0 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 2 },
        { patternIdx: 3, stringNum: 6, baseFretOffset: 4 },

        { patternIdx: 4, stringNum: 5, baseFretOffset: 1 },
        { patternIdx: 5, stringNum: 5, baseFretOffset: 2 },
        { patternIdx: 6, stringNum: 5, baseFretOffset: 4 },

        { patternIdx: 7, stringNum: 4, baseFretOffset: 1 },
        { patternIdx: 8, stringNum: 4, baseFretOffset: 2 },
        { patternIdx: 9, stringNum: 4, baseFretOffset: 4 },

        { patternIdx: 10, stringNum: 3, baseFretOffset: 1 },
        { patternIdx: 11, stringNum: 3, baseFretOffset: 3 },
        { patternIdx: 12, stringNum: 3, baseFretOffset: 4 },

        { patternIdx: 13, stringNum: 2, baseFretOffset: 2 },
        { patternIdx: 14, stringNum: 2, baseFretOffset: 4 },
        { patternIdx: 14, stringNum: 2, baseFretOffset: 5 },

        { patternIdx: 15, stringNum: 1, baseFretOffset: 2 },
        { patternIdx: 16, stringNum: 1, baseFretOffset: 4 },
    ]
}

// CAGED G Shape Pentatonic
export const MajorScalePattern5: IScalePattern = {
    minorRoot: {
        stringNum: -1,
        idxInScalePattern: -1,
        offsetFromBaseFret: -1
    },
    majorRoot: {
        stringNum: 6,
        idxInScalePattern: 3,
        offsetFromBaseFret: 4
    },
    pattern: [ // string 6 -> 1
        { patternIdx: 1, stringNum: 6, baseFretOffset: 1 },
        { patternIdx: 2, stringNum: 6, baseFretOffset: 3 },
        { patternIdx: 3, stringNum: 6, baseFretOffset: 4 },

        { patternIdx: 4, stringNum: 5, baseFretOffset: 1 },
        { patternIdx: 5, stringNum: 5, baseFretOffset: 3 },
        { patternIdx: 6, stringNum: 5, baseFretOffset: 4 },

        { patternIdx: 7, stringNum: 4, baseFretOffset: 1 },
        { patternIdx: 8, stringNum: 4, baseFretOffset: 3 },

        { patternIdx: 10, stringNum: 3, baseFretOffset: 0 },
        { patternIdx: 11, stringNum: 3, baseFretOffset: 1 },
        { patternIdx: 12, stringNum: 3, baseFretOffset: 3 },

        { patternIdx: 13, stringNum: 2, baseFretOffset: 1 },
        { patternIdx: 14, stringNum: 2, baseFretOffset: 2 },
        { patternIdx: 14, stringNum: 2, baseFretOffset: 4 },

        { patternIdx: 15, stringNum: 1, baseFretOffset: 1 },
        { patternIdx: 16, stringNum: 1, baseFretOffset: 3 },
        { patternIdx: 17, stringNum: 1, baseFretOffset: 4 },
    ]
}

export const MajorScaleShapeGroup = [
    MajorScalePattern1,
    MajorScalePattern2,
    MajorScalePattern3,
    MajorScalePattern4,
    MajorScalePattern5,
]

// CAGED E Shape Pentatonic
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

// CAGED D Shape Pentatonic
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

// CAGED C Shape Pentatonic
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

// CAGED A Shape Pentatonic
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

// CAGED G Shape Pentatonic
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

export const PentatonicShapeGroup = [
    PentatonicPattern1,
    PentatonicPattern2,
    PentatonicPattern3,
    PentatonicPattern4,
    PentatonicPattern5,
]