import * as React from 'react';

import Fretboard from '../components/guitar/Fretboard'
import GameDisplay from '../components/game/GameDisplay'

import FretboardControlPanel from 'src/components/game/FretboardControlPanel';
import GameController, { IGameQuestion } from 'src/game/GameController';
import GameInfoPanel from 'src/components/game/GameInfoPanel';
import { standardGuitarTuning } from 'src/music/Music';

// import { testFingering1 } from 'src/music/guitar/Fingering';

export interface Props {

}

export interface State {
    numFrets: number,
    numStrings: number,
    guitarTuning: string[],
    shouldShowNoteNames: boolean,
    gameRunning: boolean,
    time: number,
    totalGuesses: number,
    numCorrect: number,
    nextGameStatusMsg: string,
    optSecondaryGameStatusMsg: string,
    gameInstructionTxt: string,
    showFretLabels: boolean,
    showInlays: boolean
}

export default class GuitarFretboardTrainer extends React.Component<Props, State> {

    private timer: NodeJS.Timeout;
    private gameController: GameController;
    private currentGameQuestion: IGameQuestion;

    constructor(props: Props) {
        super(props)

        this.state = {
            shouldShowNoteNames: true,
            numStrings: 6,
            numFrets: 12,
            guitarTuning: standardGuitarTuning,
            gameRunning: false,
            time: 0,
            totalGuesses: 0,
            numCorrect: 0,
            nextGameStatusMsg: '',
            optSecondaryGameStatusMsg: '',
            gameInstructionTxt: '',
            showFretLabels: false,
            showInlays: true
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
                nextGameStatusMsg: '',
                optSecondaryGameStatusMsg: ''
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
            nextGameStatusMsg: '',
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
    }

    handleDisplayInlaysToggle = (checked: boolean) => {
        this.setState({ showInlays: checked });
    }

    handleDisplayFretLabelsToggle = (checked: boolean) => {
        this.setState({ showFretLabels: checked });
    }

    handleNoteClicked = (stringNum: number, noteClicked: string[]) => {
        if (!this.state.gameRunning) return; // don't do anything if the game isn't running

        if (this.gameController) {
            let answerResponse = this.gameController.checkAnswer(stringNum, noteClicked); // update game state

            // display the score
            let score = this.gameController.getGameScore(); 
            if (answerResponse.answerCorrect) {
                this.setState({
                    numCorrect: score.numCorrectAnswers,
                    totalGuesses: score.numTotalGuesses,
                    nextGameStatusMsg: 'Correct!',
                    optSecondaryGameStatusMsg: ''
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
                    nextGameStatusMsg: 'Wrong!',
                    optSecondaryGameStatusMsg: answerResponse.optSecondaryTxt || ''
                })

                // wasn't correct, so try again
            }
        }
    }

    handleClearScore = () => {
        this.setState({
            numCorrect: 0,
            totalGuesses: 0
        })
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
            numFrets,
            numStrings,
            guitarTuning,
            optSecondaryGameStatusMsg
        } = this.state;

        return (
            <div id="mainContainer">
                
                <div style={{display: 'flex'}}>
                
                    <GameDisplay 
                        startBtnClicked={this.handleStartGameBtn}
                        endBtnClicked={this.handleEndGameBtn}
                        isGameRunning={gameRunning}
                        numCorrectAnswers={numCorrect}
                        totalGuesses={totalGuesses}
                        time={time}
                        handleClearScore={this.handleClearScore}
                    />

                    <FretboardControlPanel 
                        handleDisplayFretNumbersToggle={this.handleDisplayFretLabelsToggle}
                        handleDisplayInlaysToggle={this.handleDisplayInlaysToggle}
                        handleNumFretsChanged={this.handleNumFretsChanged}
                        handleStringsSelected={this.handleStringsSelected}                         
                    />

                    <GameInfoPanel 
                        isGameRunning={gameRunning}
                        gameStatusMsg={nextGameStatusMsg}
                        gameInstruction={gameInstructionTxt}
                        optSecondaryMsg={optSecondaryGameStatusMsg}
                    />
                </div>
                
                <div style={{marginTop: 20}}>
                    <Fretboard 
                        width={1200}
                        height={300}
                        numStrings={numStrings}
                        numFrets={numFrets}
                        tuning={guitarTuning}
                        hideNoteNames={!this.state.shouldShowNoteNames} 
                        handleNoteClicked={this.handleNoteClicked} 
                        showFretNumbers={this.state.showFretLabels}
                        showDotInlays={this.state.showInlays}
                        // fingerings={testFingering1}
                    />
                </div>
            </div>
        )
    }
}