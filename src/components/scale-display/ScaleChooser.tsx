import * as React from "react";

import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Theme,
  WithStyles,
} from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { ScaleShape } from "src/music/guitar/ScalePattern";

export interface Props extends WithStyles<typeof styles> {
  handleScaleChosen: (scaleType: ScaleShape) => void;
}

export interface State {
  pentatonicOpen: boolean;
  majorOpen: boolean;
}

enum DrawerType {
  Pentatonic,
  Major,
  Minor,
}

const styles = (theme: Theme) => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class ScaleChooser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pentatonicOpen: false,
      majorOpen: false,
    };
  }

  handleScaleChosen = (patternType: ScaleShape) => {
    this.setState({
      pentatonicOpen: false,
      majorOpen: false,
    });
    this.props.handleScaleChosen(patternType);
  };

  handleDrawerOpen = (drawer: DrawerType) => {
    switch (drawer) {
      case DrawerType.Pentatonic:
        this.setState((prevState, props) => ({
          pentatonicOpen: !prevState.pentatonicOpen,
        }));
        break;

      case DrawerType.Major:
        this.setState((prevState, props) => ({
          majorOpen: !prevState.majorOpen,
        }));
        break;

      default:
        break;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper style={{ maxWidth: 150 }}>
        <List>
          <ListItem
            button
            onClick={() => {
              this.handleDrawerOpen(DrawerType.Pentatonic);
            }}
          >
            <ListItemText primary="Pentatonic" />
            {this.state.pentatonicOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.pentatonicOpen}>
            <List>
              <ListItem
                onClick={() => {
                  this.handleScaleChosen(ScaleShape.Pentatonic_1);
                }}
                button
                className={classes.nested}
              >
                <ListItemText primary="1 - E Shape" />
              </ListItem>
              <ListItem
                onClick={() => {
                  this.handleScaleChosen(ScaleShape.Pentatonic_2);
                }}
                button
                className={classes.nested}
              >
                <ListItemText primary="2 - D Shape" />
              </ListItem>
              <ListItem
                onClick={() => {
                  this.handleScaleChosen(ScaleShape.Pentatonic_3);
                }}
                button
                className={classes.nested}
              >
                <ListItemText primary="3 - C Shape" />
              </ListItem>
              <ListItem
                onClick={() => {
                  this.handleScaleChosen(ScaleShape.Pentatonic_4);
                }}
                button
                className={classes.nested}
              >
                <ListItemText primary="4 - A Shape" />
              </ListItem>
              <ListItem
                onClick={() => {
                  this.handleScaleChosen(ScaleShape.Pentatonic_5);
                }}
                button
                className={classes.nested}
              >
                <ListItemText primary="5 - G Shape" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={() => {
              this.handleDrawerOpen(DrawerType.Major);
            }}
          >
            <ListItemText primary="Major" />
            {this.state.majorOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.majorOpen}>
            <List>
              <ListItem
                onClick={() => {
                  this.handleScaleChosen(ScaleShape.Major_1);
                }}
                button
                className={classes.nested}
              >
                <ListItemText primary="1 - E Shape" />
              </ListItem>
              <ListItem
                onClick={() => {
                  this.handleScaleChosen(ScaleShape.Major_2);
                }}
                button
                className={classes.nested}
              >
                <ListItemText primary="2 - D Shape" />
              </ListItem>
              <ListItem
                onClick={() => {
                  this.handleScaleChosen(ScaleShape.Major_3);
                }}
                button
                className={classes.nested}
              >
                <ListItemText primary="3 - C Shape" />
              </ListItem>
              <ListItem
                onClick={() => {
                  this.handleScaleChosen(ScaleShape.Major_4);
                }}
                button
                className={classes.nested}
              >
                <ListItemText primary="4 - A Shape" />
              </ListItem>
              <ListItem
                onClick={() => {
                  this.handleScaleChosen(ScaleShape.Major_5);
                }}
                button
                className={classes.nested}
              >
                <ListItemText primary="5 - G Shape" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button>
            <ListItemText primary="Minor" />
          </ListItem>
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(ScaleChooser);
