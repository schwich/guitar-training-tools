import * as React from 'react'

import './GameDisplay.css'
import { convertFractionToPercentage } from 'src/util/Util';

export interface Props {
    numCorrectAnswers: number,
    totalGuesses: number,
    time: number,
    instructionText: string,
    statusMsg: string
}

export default class GameDisplay extends React.Component<Props, object> {

    constructor(props: Props) {
        super(props)
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
            <div id="gameDisplayContainer">
                <div id="statusInfoContainer">
                    <GameScore totalGuesses={totalGuesses} numCorrect={numCorrectAnswers} />
                    <GameStatusMessage msg={statusMsg} />
                    <GameTimer time={time} />
                </div>
                <div id="gameInstructionContainer">
                    <GameInstructions instructionText={instructionText} />
                </div>
            </div>
        )
    }
}

interface GameScoreProps {
    totalGuesses: number,
    numCorrect: number
}

function GameScore({numCorrect, totalGuesses}: GameScoreProps) {
    return (
        <div id="gameScore">
            <h3>Score: {numCorrect}/{totalGuesses} {convertFractionToPercentage(numCorrect, totalGuesses)}%</h3>
        </div>
    )
}

interface GameTimerProps {
    time: number
}

function GameTimer({time}: GameTimerProps) {

    // convert time to human readable format

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