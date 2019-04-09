import * as React from 'react';

import Fretboard from '../components/guitar/Fretboard'
import GameDisplay from '../components/game/GameDisplay'

import './Main.css'
import GameControlPanel from 'src/components/game/GameControlPanel';
import GameController, { IGameQuestion } from 'src/game/GameController';

export interface Props {

}

export interface State {
    shouldShowNoteNames: boolean,
    gameRunning: boolean,
    time: number,
    totalGuesses: number,
    numCorrect: number,
    nextGameStatusMsg: string,
    gameInstructionTxt: string
}

export default class Main extends React.Component<Props, State> {

    private timer: NodeJS.Timeout;
    private gameController: GameController;
    private currentGameQuestion: IGameQuestion;

    constructor(props: Props) {
        super(props)

        this.state = {
            shouldShowNoteNames: true,
            gameRunning: false,
            time: 0,
            totalGuesses: 0,
            numCorrect: 0,
            nextGameStatusMsg: '',
            gameInstructionTxt: ''
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

    handleNoteClicked = (noteClicked: string[]) => {
        if (this.gameController) {
            let isCorrect = this.gameController.checkAnswer(noteClicked); // update game state

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
            gameRunning
        } = this.state;

        return (
            <div id="mainContainer">
                <div id="gameDisplaysContainer">
                    <GameDisplay 
                        numCorrectAnswers={numCorrect}
                        totalGuesses={totalGuesses}
                        time={time}
                        statusMsg={nextGameStatusMsg}
                        instructionText={gameInstructionTxt}
                    />
                    <GameControlPanel 
                        isGameRunning={gameRunning}
                        startBtnClicked={this.handleStartGameBtn}
                        endBtnClicked={this.handleEndGameBtn} />
                </div>
                
                <Fretboard shouldDisplayNoteNames={this.state.shouldShowNoteNames} handleNoteClicked={this.handleNoteClicked} />
            </div>
        )
    }
}