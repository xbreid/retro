import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Nav from './shared/nav';

//styles
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {navOpen: true}
  }

  toggleNav = (e) => {
    this.setState({navOpen: !this.state.navOpen});
  };

  hideNav = (e) => {
    this.setState({navOpen: true})
  };

  render() {
    let open = this.state.navOpen;

    return (
      <MuiThemeProvider>
        <div>
          <Nav open={open}/>
          {React.cloneElement(this.props.children, {navOpen: this.toggleNav})}
        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
