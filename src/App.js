import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Nav from './shared/nav';
import SiteHead from './shared/header'

//styles
import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {navOpen: true}
  }

  toggleNav = (e) => {
    this.setState({navOpen: !this.state.navOpen});
  };

  render() {
    let open = this.state.navOpen;

    return (
      <MuiThemeProvider>
        <div>
          <SiteHead/>
          <Nav open={open}/>
          {React.cloneElement(this.props.children, {navOpen: this.toggleNav})}
        </div>
      </MuiThemeProvider>
    );
  }
}
