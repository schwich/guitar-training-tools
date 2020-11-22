import * as React from 'react'

import { 
    Paper, ListItemText, MenuItem, Checkbox, 
    FormControl, FormControlLabel, InputLabel, Select, Input,
    Switch
} from '@material-ui/core'

export interface Props {
    handleNumFretsChanged: (numFrets: number) => void,
    handleStringsSelected: (stringsSelected: number[]) => void,
    handleDisplayInlaysToggle: (checked: boolean) => void,
    handleDisplayFretNumbersToggle: (checked: boolean) => void
    handleIncludeAccidentals: (checked: boolean) => void
}

export interface State {
    anchorElem: HTMLElement | null,
    selectedIdx: number,
    numFretsChosen: number,
    stringsEnabled: number[],
    showFretLabels: boolean,
    showFretInlays: boolean,
    includeAccidentals: boolean,
}

export default class FretboardControlPanel extends React.Component<Props, State> {

    private numFretsMenuOptions = [
        '12',
        '15',
        '22',
        '24'
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
            stringsEnabled: [0, 1, 2, 3, 4, 5], // array indexes
            showFretInlays: true,
            showFretLabels: false,
            includeAccidentals: true
        }
    }

    handleDisplayInlaysToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleDisplayInlaysToggle(event.target.checked);
        this.setState({ showFretInlays: event.target.checked })
    }

    handleDisplayFretLabelsToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleDisplayFretNumbersToggle(event.target.checked);
        this.setState({ showFretLabels: event.target.checked });
    }

    handleStringSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target && event.target.value) {
            let newStringsEnabled = [];

            for (let num of event.target.value) { // typescript doesn't like this object, it's an array but it seems to thing it's a string
                newStringsEnabled.push(Number(num))
            }

            this.setState({ stringsEnabled: newStringsEnabled })
            this.props.handleStringsSelected(newStringsEnabled.map(idx => idx + 1)) // convert from arr index to string number
        }
        
    }

    handleIncludeAccidentals = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleIncludeAccidentals(event.target.checked);
        this.setState({ includeAccidentals: event.target.checked });
    }

    handleNumFretsSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ numFretsChosen: Number(event.target.value) })
        this.props.handleNumFretsChanged(Number(event.target.value));
    }

    selectDisplay = (selected: number[]): React.ReactNode => {
        let stringsSelected = []
        for (let idx of selected) {
            if (idx === 0) {
                stringsSelected.push("high E");
            } else if (idx === 5) {
                stringsSelected.push("low E");
            } else {
                stringsSelected.push(this.guitarStrings[idx].name);
            }
        }

        return stringsSelected.join(", ");
    }

    render() {

        return (
            <Paper elevation={1} style={{maxWidth: 300, marginLeft: 10}}>
                <div id="gameControlPanelContainer" style={{
                    display: 'flex', flexDirection: 'column', maxWidth: 500, 
                    justifyContent: 'space-between', 
                    padding: 15, height: '100%'
                }}>

                    <div id="gameControlPanelNumFretsControl">
                        <FormControl>
                            <InputLabel htmlFor="num-frets-select">Number of Frets</InputLabel>
                            <Select
                                style={{minWidth: 150, maxWidth: 200}}
                                value={this.state.numFretsChosen}
                                onChange={this.handleNumFretsSelect}
                                inputProps={{name: 'num-frets-select'}}
                            >
                                {
                                    this.numFretsMenuOptions.map(fretOption => (
                                        <MenuItem key={fretOption} value={fretOption}>{`${fretOption} frets`}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControlLabel
                            label="Show Inlays"
                            control={
                                <Switch
                                checked={this.state.showFretInlays}
                                onChange={this.handleDisplayInlaysToggle}
                                />
                            }
                        />
                        <FormControlLabel
                            label="Show Fret Labels"
                            control={
                                <Switch
                                checked={this.state.showFretLabels}
                                onChange={this.handleDisplayFretLabelsToggle}
                            />
                            }
                        />                  

                    </div>

                   <div id="gameControlPanelIncludeAccidentals">
                       <FormControlLabel control={
                           <Switch
                               checked={this.state.includeAccidentals}
                               onChange={this.handleIncludeAccidentals}
                           />
                       } label="Include Accidentals" />
                   </div>

                    <div id="gameControlPanelStringsToGuessControl">
                    
                        <FormControl style={{minWidth: 200, maxWidth: 300}}>
                            <InputLabel htmlFor="multiple-string-checkbox">Strings to Guess for</InputLabel>
                            <Select
                                multiple
                                renderValue={this.selectDisplay}
                                value={this.state.stringsEnabled} // arr index to string num
                                onChange={this.handleStringSelect}
                                input={<Input id="multiple-string-checkbox" />}
                            >
                            {
                                this.guitarStrings.map((_, idx) => (
                                    <MenuItem key={idx} value={idx}>
                                        <Checkbox checked={this.state.stringsEnabled.indexOf(idx) > -1} />
                                        <ListItemText primary={`${this.guitarStrings[idx].number} - ${this.guitarStrings[idx].name}`} />
                                    </MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>
                    </div>
                </div>  
            </Paper>
        )
    }
}