import * as React from 'react';

import Fretboard from '../components/guitar/Fretboard'
import GameDisplay from '../components/game/GameDisplay'

export interface Props {

}

export interface State {
    shouldShowNotes: boolean
}

export default class Main extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            shouldShowNotes: true
        };
    }

    handleToggleNotes = () => {
        this.setState((state, props) => ({ shouldShowNotes: !state.shouldShowNotes }))
    }

    render() {
        return (
            <div id="mainContainer">
                <button onClick={this.handleToggleNotes}>Toggle Notes</button>
                <GameDisplay />
                <Fretboard shouldDisplayNotes={this.state.shouldShowNotes} />
            </div>
        )
    }
}