import * as React from 'react'

export interface Props {
    isGameRunning: boolean;
    startBtnClicked: () => void,
    endBtnClicked: () => void
}

export default class GameControlPanel extends React.Component<Props, object> {

    constructor(props: Props) {
        super(props)
    }

    render() {

        let {
            isGameRunning,
            startBtnClicked,
            endBtnClicked
        } = this.props;

        return (
            <div id="gameControlPanelContainer">
            {
                isGameRunning 
                ? (
                    <button onClick={() => {endBtnClicked()}}>End</button>
                    
                ) 
                : (
                    <button onClick={() => {startBtnClicked()}}>Start</button>
                )
            }
            </div>  
        )
    }
}