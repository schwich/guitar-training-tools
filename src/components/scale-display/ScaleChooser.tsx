import * as React from 'react';

import { Paper, List, ListItem, ListItemText, Collapse, Theme, WithStyles } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { ScalePatternType } from 'src/music/guitar/ScalePattern';

export interface Props extends WithStyles<typeof styles> {
    handleScaleChosen: (scaleType: ScalePatternType) => void
}

export interface State {
    pentatonicOpen: boolean
}


enum DrawerType {
    Pentatonic,
    Major,
    Minor
}

const styles = (theme: Theme) => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    }
})

class ScaleChooser extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            pentatonicOpen: false
        }
    }

    handleDrawerOpen = (drawer: DrawerType) => {
        switch(drawer) {
            case DrawerType.Pentatonic:
                this.setState((prevState, props) => ({ pentatonicOpen: !prevState.pentatonicOpen }))
            break;

            default:
            break;
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper style={{maxWidth: 150}}> 
                <List>

                    <ListItem button onClick={() => {this.handleDrawerOpen(DrawerType.Pentatonic)}}>
                        <ListItemText primary="Pentatonic" />
                        {this.state.pentatonicOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.pentatonicOpen}>
                        <List>
                            <ListItem
                                onClick={() => {this.props.handleScaleChosen(ScalePatternType.Pentatonic_1)}} 
                                button className={classes.nested}>
                                <ListItemText primary="Pattern 1" />
                            </ListItem>
                            <ListItem 
                                onClick={() => {this.props.handleScaleChosen(ScalePatternType.Pentatonic_2)}} 
                                button className={classes.nested}>
                                <ListItemText primary="Pattern 2" />
                            </ListItem>
                            <ListItem 
                                onClick={() => {this.props.handleScaleChosen(ScalePatternType.Pentatonic_3)}} 
                                button className={classes.nested}>
                                <ListItemText primary="Pattern 3" />
                            </ListItem>
                            <ListItem 
                                onClick={() => {this.props.handleScaleChosen(ScalePatternType.Pentatonic_4)}} 
                                button className={classes.nested}>
                                <ListItemText primary="Pattern 4" />
                            </ListItem>
                            <ListItem 
                                onClick={() => {this.props.handleScaleChosen(ScalePatternType.Pentatonic_5)}} 
                                button className={classes.nested}>
                                <ListItemText primary="Pattern 5" />
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem button>
                        <ListItemText primary="Major" />
                    </ListItem>

                    <ListItem button>
                        <ListItemText primary="Minor" />
                    </ListItem>
                </List>
            </Paper>
        )
    }
}

export default withStyles(styles)(ScaleChooser);