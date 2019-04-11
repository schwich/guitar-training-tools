import * as React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, 
        ListItemText, ListItemIcon, createStyles, WithStyles, Theme } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline'

import Main from './containers/Main'

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
  toolbar: mixins.toolbar
});

export interface Props extends WithStyles<typeof styles> {
}

class App extends React.Component<Props, object> {

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
          style={{flexShrink: 0, width: drawerWidth, minWidth: drawerWidth, maxWidth: drawerWidth}}
          variant="permanent"
          anchor="left"
          classes={{
            paper: classes.drawerPaper
          }}
        >
        <div className={classes.toolbar} />
          <List>
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Main /> 
        </main>
        
      </div>
    )
  }
}

export default withStyles(styles)(App);
