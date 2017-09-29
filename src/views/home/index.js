import React from 'react';
import CryptoJS from 'crypto-js';
import KeyGen from 'generate-password';
import Auth from '../../auth/Auth';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// styling
import './style.scss';

const auth = new Auth();

export default class Home extends React.Component {
   constructor(props) {
     super(props);
     props.navOpen();
   }

  login() {
    auth.login();
  }

  render() {

    const style = {
      margin: 12,
    };

    return (
      <div>
        Home Page --
        <RaisedButton label="Login" primary={true} style={style} onClick={this.login.bind(this)} />
      </div>
    );
  }
}
