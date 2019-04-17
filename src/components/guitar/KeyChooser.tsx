import * as React from 'react';

import { Paper, Button } from '@material-ui/core';
import { KeyType, KeyNote } from 'src/music/Music';

export interface Props {
    keyTypeChanged: (keyType: KeyType) => void,
    keyNoteChanged: (keyNote: KeyNote) => void
}

export interface State {
    keyType: KeyType,
    keyNote: KeyNote
}

export default class KeyChooser extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            keyType: KeyType.Major,
            keyNote: KeyNote.C
        }
    }

    handleKeyNoteChanged = (keyNote: KeyNote) => {
        this.setState({ keyNote });
    }

    handleKeyTypeChanged = (keyType: KeyType) => {
        this.setState({ keyType });
    }

    render() {
        return (
            <Paper style={{ maxWidth: 200, padding: 5}}>
                <div>
                    <Button 
                        style={{ margin: 5 }}
                        color={ this.state.keyType === KeyType.Major ? 'primary' : 'default'} 
                        variant="contained" 
                        onClick={() => this.handleKeyTypeChanged(KeyType.Major)}
                    >
                        Major
                    </Button>
                    <Button 
                        style={{ margin: 5 }}
                        color={ this.state.keyType === KeyType.Minor ? 'primary' : 'default'}
                        variant="contained" 
                        onClick={() => this.handleKeyTypeChanged(KeyType.Minor)}
                    >
                        Minor
                    </Button>
                </div>
                <div style={{padding: 5}}>
                    <Button 
                        color={ this.state.keyNote === KeyNote.F ? 'primary' : 'default'}
                        style={{margin: 2}} variant="contained" 
                        onClick={() => this.handleKeyNoteChanged(KeyNote.F)}>F</Button>
                    <Button 
                        color={ this.state.keyNote === KeyNote.C ? 'primary' : 'default'}
                        style={{margin: 2}} variant="contained" 
                        onClick={() => this.handleKeyNoteChanged(KeyNote.C)}>C</Button>
                    <Button 
                        color={ this.state.keyNote === KeyNote.G ? 'primary' : 'default'}
                        style={{margin: 2}} variant="contained" 
                        onClick={() => this.handleKeyNoteChanged(KeyNote.G)}>G</Button>
                    <Button 
                        color={ this.state.keyNote === KeyNote.D ? 'primary' : 'default'}
                        style={{margin: 2}} variant="contained" 
                        onClick={() => this.handleKeyNoteChanged(KeyNote.D)}>D</Button>
                    <Button 
                        color={ this.state.keyNote === KeyNote.A ? 'primary' : 'default'}
                        style={{margin: 2}} variant="contained" 
                        onClick={() => this.handleKeyNoteChanged(KeyNote.A)}>A</Button>
                    <Button 
                        color={ this.state.keyNote === KeyNote.E ? 'primary' : 'default'}
                        style={{margin: 2}} variant="contained" 
                        onClick={() => this.handleKeyNoteChanged(KeyNote.E)}>E</Button>
                    <Button 
                        color={ this.state.keyNote === KeyNote.B ? 'primary' : 'default'}
                        style={{margin: 2}} variant="contained" 
                        onClick={() => this.handleKeyNoteChanged(KeyNote.B)}>B</Button>
                </div>
            </Paper>
        )
    }

}