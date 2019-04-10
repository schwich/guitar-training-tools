import * as React from 'react'

import './GameDisplay.css'
import { convertFractionToPercentage } from 'src/util/Util';
import { Paper } from '@material-ui/core';

export interface Props {
    numCorrectAnswers: number,
    totalGuesses: number,
    time: number,
    instructionText: string,
    statusMsg: string
}

export interface State {
    gameMessageOpen: boolean
}

export default class GameDisplay extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            gameMessageOpen: false
        }
    }

    handleSnackbarClose = () => {
        this.setState({ gameMessageOpen: false });
    }

    render() {
        let {
            numCorrectAnswers,
            totalGuesses,
            time,
            instructionText,
            statusMsg
        } = this.props;

        return (
            <Paper elevation={1} style={{ maxWidth: 400, marginLeft: 10 }}>
                <div id="gameDisplayContainer">
                    <div id="statusInfoContainer" style={{}}>
                        <GameScore totalGuesses={totalGuesses} numCorrect={numCorrectAnswers} />
                        <GameTimer time={time} />
                    </div>
                    <div style={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                            minHeight: 85, minWidth: 200, 
                            paddingTop: 5, paddingBottom: 5, paddingRight: 15, paddingLeft: 15
                        }} 
                        id="gameInstructionContainer"
                    >
                        <GameInstructions instructionText={instructionText} />
                        <GameStatusMessage msg={statusMsg} />
                    </div>
                </div>
            </Paper>
        )
    }
}

interface GameScoreProps {
    totalGuesses: number,
    numCorrect: number
}

function GameScore({numCorrect, totalGuesses}: GameScoreProps) {
    
    let percentage = convertFractionToPercentage(numCorrect, totalGuesses);
    if (Number.isNaN(percentage)) percentage = 0; 

    return (
        <div id="gameScore">
            <h3>Score: {numCorrect}/{totalGuesses}</h3>
            <h3>{percentage}%</h3>
        </div>
    )
}

interface GameTimerProps {
    time: number
}

function GameTimer({time}: GameTimerProps) {

    return (
        <div id="gameTimer">
            <h3>Time: {time}s</h3>
        </div>
    )
}

interface GameInstructionsProps {
    instructionText: string
}

function GameInstructions({instructionText}: GameInstructionsProps) {

    return (    
        <div id="gameInstruction">
            <h2>{instructionText}</h2>
        </div>
    )
}

interface GameStatusMessageProps {
    msg?: string
}

function GameStatusMessage({msg}: GameStatusMessageProps) {

    return (
        <div id="gameStatusMessage">{msg}</div>
    )
}