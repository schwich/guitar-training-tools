import * as React from 'react';
import { Paper } from '@material-ui/core';

export interface Props {
    isGameRunning: boolean,
    gameInstruction: string,
    gameStatusMsg: string
}

export default class GameInfoPanel extends React.Component<Props, object> {

    render() {

        let {
            gameInstruction,
            gameStatusMsg,
            isGameRunning
        } = this.props;

        return (
            
            isGameRunning 
            ?  ( 
                <Paper style={{minWidth: 300, marginLeft: 10}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div>{gameInstruction}</div>
                        <div>{gameStatusMsg}</div>
                    </div>
                </Paper>
            )
            : ''
            
        )
    }
}