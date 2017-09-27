import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//styles
import './App.scss';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <MuiThemeProvider>
        {this.props.children}
      </MuiThemeProvider>
    );
  }

}

export default App;
