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

export default class GameController {

    private currentAnswer: string;
    private numCorrect: number;
    private totalGuesses: number;
    private lastRandomNote: string;

    constructor() {
        this.currentAnswer = '';
        this.lastRandomNote = '';
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

    public checkAnswer(submittedAnswer: string[]): boolean {
        this.totalGuesses++;

        console.log('in checkAnswer()');
        console.log(`currentAnswer=${this.currentAnswer}`)
        console.log(`submittedAnswer=${submittedAnswer}`);

        if (submittedAnswer.includes(this.currentAnswer)) {
            this.numCorrect++;
            return true;
        } else {
            return false;
        }
    }

    public getGameScore(): IGameScore {
        return {
            numCorrectAnswers: this.numCorrect,
            numTotalGuesses: this.totalGuesses,
            percentageCorrect: convertFractionToPercentage(this.numCorrect, this.totalGuesses)
        }
    }
}