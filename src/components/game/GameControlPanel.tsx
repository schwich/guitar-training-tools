import * as React from 'react'

import Button from '@material-ui/core/Button'
import { List, ListItem, ListItemText, MenuItem, Menu, Checkbox } from '@material-ui/core'

import './GameControlPanel.css'

export interface Props {
    isGameRunning: boolean;
    startBtnClicked: () => void,
    endBtnClicked: () => void,
    handleNumFretsChanged: (numFrets: number) => void,
    handleStringsSelected: (stringsSelected: number[]) => void
}

export interface State {
    anchorElem: HTMLElement | null,
    selectedIdx: number,
    numFretsChosen: number,
    stringsEnabled: number[]
}

export default class GameControlPanel extends React.Component<Props, State> {

    private numFretsMenuOptions = [
        '12',
        '15'
    ]

    private guitarStrings = [
        {name: 'E', number: 1},
        {name: 'B', number: 2},
        {name: 'G', number: 3},
        {name: 'D', number: 4},
        {name: 'A', number: 5},
        {name: 'E', number: 6}
    ]

    constructor(props: Props) {
        super(props)

        this.state = {
            anchorElem: null,
            selectedIdx: 0,
            numFretsChosen: 12,
            stringsEnabled: [0, 1, 2, 3, 4, 5] // array indexes
        }
    }

    handleNumFretListClick = (e: React.MouseEvent) => {
        this.setState({ anchorElem: e.currentTarget as HTMLElement });
    }

    handleNumFretMenuClick = (idx: number) => {
        this.setState({ selectedIdx: idx, anchorElem: null});
        this.props.handleNumFretsChanged(Number(this.numFretsMenuOptions[idx]));
    }

    handleNumFretMenuClose = () => {
        this.setState({ anchorElem: null });
    }

    handleStringToggle = (idx: number) => {
        const { stringsEnabled } = this.state;
        const currentIdx = stringsEnabled.indexOf(idx);
        const newStringsEnabled = [...stringsEnabled];

        if (currentIdx === -1) {
            newStringsEnabled.push(idx); 
        } else {
            newStringsEnabled.splice(currentIdx, 1);
        }

        this.setState({ stringsEnabled: newStringsEnabled });
        let stringNumsEnabled = newStringsEnabled.map(idx => idx + 1);
        this.props.handleStringsSelected(stringNumsEnabled);
    }

    render() {

        let {
            isGameRunning,
            startBtnClicked,
            endBtnClicked
        } = this.props;

        let {
            anchorElem,
            selectedIdx
        } = this.state;

        return (
            <div id="gameControlPanelContainer">
                <div id="gameControlPanelNumFretsControl">
                    <List>
                        <ListItem onClick={this.handleNumFretListClick} button>
                            <ListItemText primary="Number of Frets" secondary={this.numFretsMenuOptions[selectedIdx]} />
                        </ListItem>
                    </List>
                    <Menu 
                        anchorEl={anchorElem} 
                        open={Boolean(anchorElem)} 
                        onClose={this.handleNumFretMenuClose}>
                    {
                        this.numFretsMenuOptions.map((option, idx) => (
                            <MenuItem 
                                key={option} 
                                selected={idx === selectedIdx}
                                onClick={() => this.handleNumFretMenuClick(idx)}>
                                {option}
                            </MenuItem>
                        ))
                    }
                    </Menu>
                </div>
                <div id="gameControlPanelStringsToGuessControl">
                    <List dense>
                    {
                        this.guitarStrings.map((_, idx) => (
                            <ListItem 
                                key={idx}
                                button
                                dense
                                onClick={() => this.handleStringToggle(idx)}>

                                <Checkbox
                                    checked={this.state.stringsEnabled.indexOf(idx) !== -1}
                                    tabIndex={-1}
                                    disableRipple 
                                />
                                <ListItemText primary={`${this.guitarStrings[idx].number} - ${this.guitarStrings[idx].name}`} />
                            </ListItem>
                        ))
                    }
                    </List>
                </div>
            {
                isGameRunning 
                ? (
                    <Button variant="contained" onClick={() => {endBtnClicked()}}>End</Button>
                    
                ) 
                : (
                    <Button variant="contained" onClick={() => {startBtnClicked()}}>Start</Button>
                )
            }
            </div>  
        )
    }
}