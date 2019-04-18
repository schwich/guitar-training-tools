import * as React from 'react'
import { Paper, Button } from '@material-ui/core';

export interface Props {

}

export interface State {

}

export default class PatternControl extends React.Component<Props, State> {

    render() {
        return (
            <Paper style={{padding: 10}}>
                <div>
                    <Button variant="contained">Prev Shape</Button>
                    <Button variant="contained">Next Shape</Button>
                </div>
            </Paper>
        )
    }
}