import { getRandomChromaticNote } from 'src/music/Music';
import { convertFractionToPercentage } from 'src/util/Util';

export interface IGameScore {
    numCorrectAnswers: number,
    numTotalGuesses: number,
    percentageCorrect: number
}

export interface IGameQuestion {
    instructionTxt: string,
    answer: string
}

export interface IGameAnswerResponse {
    answerCorrect: boolean,
    optSecondaryTxt?: string
}

export default class GameController {

    private currentAnswer: string;
    private numCorrect: number;
    private totalGuesses: number;
    private lastRandomNote: string;
    private stringsEnabled: number[];

    constructor() {
        this.currentAnswer = '';
        this.lastRandomNote = '';
        this.stringsEnabled = [1, 2, 3, 4, 5, 6];
    }

    public startNewGame(): void {
        this.totalGuesses = 0;
        this.numCorrect = 0;
    }
    
    public getNextQuestion(): IGameQuestion {
        let randomNote;
        do {
            randomNote = getRandomChromaticNote();
        } while (this.lastRandomNote === randomNote); // make sure not to ask the same question twice in a row
        this.lastRandomNote = randomNote; 

        this.currentAnswer = randomNote; // keep track of the answer to the current question
        return {
            instructionTxt: `Find ${randomNote}`,
            answer: randomNote
        }
    }

    public checkAnswer(stringNum: number, submittedAnswer: string[]): IGameAnswerResponse {
        this.totalGuesses++;

        if (this.stringsEnabled.includes(stringNum)) {

            if (submittedAnswer.includes(this.currentAnswer)) {
                this.numCorrect++;
                return { answerCorrect: true}
            } else {
                return { answerCorrect: false }
            }

        } else {
            return {
                answerCorrect: false,
                optSecondaryTxt: 'Wrong String! Try again.'
            }
        }
    }

    public setStringsEnabled(stringsEnabled: number[]) {
        this.stringsEnabled = stringsEnabled;
    }

    public getGameScore(): IGameScore {
        return {
            numCorrectAnswers: this.numCorrect,
            numTotalGuesses: this.totalGuesses,
            percentageCorrect: convertFractionToPercentage(this.numCorrect, this.totalGuesses)
        }
    }
}