import * as React from 'react'

import { convertFractionToPercentage } from 'src/util/Util';
import { Paper, Button } from '@material-ui/core';

export interface Props {
    numCorrectAnswers: number,
    totalGuesses: number,
    time: number,
    handleClearScore: () => void,
    startBtnClicked: () => void,
    endBtnClicked: () => void,
    isGameRunning: boolean
}

export default class GameDisplay extends React.Component<Props, object> {

    render() {
        let {
            numCorrectAnswers,
            totalGuesses,
            time,
            startBtnClicked,
            endBtnClicked,
            isGameRunning
        } = this.props;

        return (
            <Paper elevation={1} style={{ minWidth: 200, maxWidth: 400, marginLeft: 10, padding: 15 }}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <GameScore totalGuesses={totalGuesses} numCorrect={numCorrectAnswers} />
                    <GamePercentageCorrect totalGuesses={totalGuesses} numCorrect={numCorrectAnswers} />
                    <GameTimer time={time} />
                    <Button style={{marginTop: 10}} variant="contained" onClick={() => this.props.handleClearScore()}>Clear Score</Button>
                    {
                        isGameRunning 
                        ? (
                            <Button style={{maxWidth: 150, alignSelf: 'center'}} variant="contained" onClick={() => {endBtnClicked()}}>End Game</Button>
                            
                        ) 
                        : (
                            <Button style={{maxWidth: 150, alignSelf: 'center'}} variant="contained" onClick={() => {startBtnClicked()}}>Start Game</Button>
                        )
                    }
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
    
    return (
        <h4>Score: {numCorrect}/{totalGuesses}</h4>
    )
}

interface GamePercentageProps {
    numCorrect: number,
    totalGuesses: number
}

function GamePercentageCorrect({numCorrect, totalGuesses}: GamePercentageProps) {

    let percentage = convertFractionToPercentage(numCorrect, totalGuesses);
    if (Number.isNaN(percentage)) percentage = 0; 

    return (
        <h4>{percentage}%</h4>
    )
}

interface GameTimerProps {
    time: number
}

function GameTimer({time}: GameTimerProps) {

    // todo format time into minutes:seconds

    return (
        <div id="gameTimer">
            <h4>Time: {time}s</h4>
        </div>
    )
}