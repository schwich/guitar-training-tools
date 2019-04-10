import * as React from 'react';
import { Paper, Fade } from '@material-ui/core';

export interface Props {
    isGameRunning: boolean,
    gameInstruction: string,
    gameStatusMsg: string,
    statusColor?: string,
    optSecondaryMsg?: string
}

export default class GameInfoPanel extends React.Component<Props, object> {

    render() {

        let {
            gameInstruction,
            gameStatusMsg,
            isGameRunning,
            optSecondaryMsg
        } = this.props;

        let statusColor = 'black';
        
        if (gameStatusMsg.toLowerCase().includes('wrong')) {
            statusColor = 'red';
        } else if (gameStatusMsg.toLowerCase().includes('correct')) {
            statusColor = 'green';
        }

        return (
            
            isGameRunning 
            ?  ( 
                <Paper style={{minWidth: 300, marginLeft: 10}}>
                    <div style={{display: 'flex', flexDirection: 'column', height: '100%', 
                        alignItems: 'center', justifyContent: 'space-around'
                    }}>
                        <div style={{minHeight: '50%'}}><h2>{gameInstruction}</h2></div>
                        <Fade in={Boolean(gameStatusMsg)} timeout={2000} >
                            <GameStatusMessage 
                            statusColor={statusColor}
                            gameStatusMsg={gameStatusMsg} 
                            optSecondaryMsg={optSecondaryMsg} />
                        </Fade>
                    </div>
                </Paper>
            )
            : ''
            
        )
    }
}

interface GameStatusMessageProps {
    gameStatusMsg: string,
    statusColor?: string,
    optSecondaryMsg?: string
}

function GameStatusMessage({gameStatusMsg, statusColor, optSecondaryMsg}: GameStatusMessageProps) {

    let color = statusColor || 'black';
    let msg = optSecondaryMsg || '';
    return (
        <React.Fragment>
            <div style={{color}}><h1>{gameStatusMsg}</h1></div>
            <div><h4><em>{msg}</em></h4></div>
        </React.Fragment>
    )
}