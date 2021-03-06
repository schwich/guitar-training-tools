import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, 
        ListItemText, ListItemIcon, createStyles, WithStyles, Theme } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
// import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline'

import GuitarFretboardTrainer from './containers/GuitarFretboardTrainer'
import HomeContainer from './containers/Home'
import GuitarScaleDisplay from './containers/GuitarScaleDisplay';
import GuitarChordDisplay from './containers/GuitarChordDisplay';

const drawerWidth = 150;

const styles = ({ spacing, mixins, zIndex }: Theme) => createStyles({
  drawerPaper: {
    width: drawerWidth
  },
  appBar: {
    zIndex: zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    padding: spacing.unit
  },
  navLink: {
    textDecoration: 'none'
  },
  activeNavLink: {
    backgroundColor: 'blue'
  },
  toolbar: mixins.toolbar
});

export interface Props extends WithStyles<typeof styles> {
}

export interface State {
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  } 

  public render() {

    const { classes } = this.props;

    return (
      <div style={{display: 'flex'}}>
        <CssBaseline />

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Guitar Fretboard Trainer
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer 
          elevation={2}
          style={{flexShrink: 0, width: drawerWidth, minWidth: drawerWidth, maxWidth: drawerWidth}}
          variant="permanent"
          anchor="left"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List component="nav">
            <Link className={classes.navLink} to="/">
              <ListItem button>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />        
              </ListItem>
            </Link>

            <Link className={classes.navLink} to="guitar-fretboard-trainer">
              <ListItem button>
                <ListItemText primary="Fretboard Trainer" />
              </ListItem>
            </Link>

            <Link className={classes.navLink} to="guitar-scale-display">
              <ListItem button>
                <ListItemText primary="Scales Display" />
              </ListItem>
            </Link>

            <Link className={classes.navLink} to="guitar-chord-display">
              <ListItem button>
                <ListItemText primary="Chords Display" />
              </ListItem>
            </Link>
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          

          <Switch>
            
            <Route path="/guitar-scale-display" component={GuitarScaleDisplay} />
            <Route path="/guitar-chord-display" component={GuitarChordDisplay} />
            <Route path="/guitar-fretboard-trainer" component={GuitarFretboardTrainer} />
            <Route exact path="/" component={HomeContainer} />
          </Switch>

        </main>
        
      </div>
    )
  }
}

export default withStyles(styles)(App);
