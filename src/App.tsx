import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline'

import Main from './containers/Main'

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>

        <CssBaseline />

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Guitar Fretboard Trainer
            </Typography>
          </Toolbar>
        </AppBar>

        <Main /> 
      </React.Fragment>
    )
  }
}

export default App;
