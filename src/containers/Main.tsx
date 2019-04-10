import * as React from 'react';

import Fretboard from '../components/guitar/Fretboard'
import GameDisplay from '../components/game/GameDisplay'

import './Main.css'
import GameControlPanel from 'src/components/game/GameControlPanel';
import GameController, { IGameQuestion } from 'src/game/GameController';

export interface Props {

}

export interface State {
    numFrets: number,
    shouldShowNoteNames: boolean,
    gameRunning: boolean,
    time: number,
    totalGuesses: number,
    numCorrect: number,
    nextGameStatusMsg: string,
    gameInstructionTxt: string,
    // stringsSelected: number[]
}

export default class Main extends React.Component<Props, State> {

    private timer: NodeJS.Timeout;
    private gameController: GameController;
    private currentGameQuestion: IGameQuestion;

    constructor(props: Props) {
        super(props)

        this.state = {
            shouldShowNoteNames: true,
            numFrets: 12,
            gameRunning: false,
            time: 0,
            totalGuesses: 0,
            numCorrect: 0,
            nextGameStatusMsg: '',
            gameInstructionTxt: '',
            // stringsSelected: [1, 2, 3, 4, 5, 6]
        };
    }

    handleStartGameBtn = () => {

        this.timer = setInterval(() => {
            this.setState((prevState, props) => ({
                time: prevState.time + 1
            }))
        }, 1000)

        if (this.gameController) {
            this.gameController.startNewGame();
            this.currentGameQuestion = this.gameController.getNextQuestion();

            this.setState({ 
                gameRunning: true,
                shouldShowNoteNames: false,
                gameInstructionTxt: this.currentGameQuestion.instructionTxt,
            })
        } else {
            throw new Error('Game cannot be started');
        }
    }

    handleEndGameBtn = () => {
        this.setState({ 
            gameRunning: false, 
            time: 0,
            gameInstructionTxt: '',
            shouldShowNoteNames: true
        })

        // stop and reset game timer
        clearInterval(this.timer);
    }

    handleNumFretsChanged = (numFrets: number) => {
        this.setState({ numFrets })
    }
    
    handleStringsSelected = (stringsSelected: number[]) => {
        stringsSelected.sort((first, second) => first - second);
        if (this.gameController) {
            this.gameController.setStringsEnabled(stringsSelected);
        }
        // console.log(stringsSelected);
        // this.setState({ stringsSelected });
    }

    handleNoteClicked = (stringNum: number, noteClicked: string[]) => {
        if (!this.state.gameRunning) return; // don't do anything if the game isn't running

        console.log(`stringNum=${stringNum}`)

        if (this.gameController) {
            let isCorrect = this.gameController.checkAnswer(stringNum, noteClicked); // update game state

            // display the score
            let score = this.gameController.getGameScore(); 
            if (isCorrect) {
                this.setState({
                    numCorrect: score.numCorrectAnswers,
                    totalGuesses: score.numTotalGuesses,
                    nextGameStatusMsg: 'Correct!'
                })

                // was correct, so ask next question
                let nextQuestion = this.gameController.getNextQuestion()

                // set a timeout for next question
                setTimeout(() => {
                    this.setState({
                        nextGameStatusMsg: '',
                        gameInstructionTxt: nextQuestion.instructionTxt
                    })
                }, 2000)

            } else {
                this.setState({
                    numCorrect: score.numCorrectAnswers,
                    totalGuesses: score.numTotalGuesses,
                    nextGameStatusMsg: 'Wrong!'
                })

                // wasn't correct, so try again
            }
        }
    }

    componentDidMount() {
        this.gameController = new GameController();
    }

    render() {
        let {
            numCorrect,
            totalGuesses,
            time,
            nextGameStatusMsg,
            gameInstructionTxt,
            gameRunning,
            numFrets
        } = this.state;

        return (
            <div id="mainContainer">
                
                <GameDisplay 
                    numCorrectAnswers={numCorrect}
                    totalGuesses={totalGuesses}
                    time={time}
                    statusMsg={nextGameStatusMsg}
                    instructionText={gameInstructionTxt}
                />
                    
                
                <Fretboard 
                    numFrets={numFrets}
                    shouldDisplayNoteNames={this.state.shouldShowNoteNames} 
                    handleNoteClicked={this.handleNoteClicked} 
                />

                <GameControlPanel 
                    handleNumFretsChanged={this.handleNumFretsChanged}
                    handleStringsSelected={this.handleStringsSelected}
                    isGameRunning={gameRunning}
                    startBtnClicked={this.handleStartGameBtn}
                    endBtnClicked={this.handleEndGameBtn} 
                />
            </div>
        )
    }
}