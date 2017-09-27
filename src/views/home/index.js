import React from 'react';
import CryptoJS from 'crypto-js';
import KeyGen from 'generate-password';
import Auth from '../../auth/Auth';

import RaisedButton from 'material-ui/RaisedButton';

// styling
import './style.scss';

const auth = new Auth();

export default class Home extends React.Component {
   // constructor(props) {
   //   super(props);
   // }

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  message() {
    console.log(CryptoJS.SHA256("password").toString());

    let salt = CryptoJS.lib.WordArray.random(128/8);

    console.log(salt.toString());

    let password = KeyGen.generate({
      length: 64,
      numbers: true,
      symbols: true,
      uppercase: true,
      strict: true
    });

    console.log(password);

    let key = CryptoJS.PBKDF2("password", salt, {
      keySize: 256/32,
      iterations: 5000
    });

    console.log(key.toString());
  }

  render() {

    const style = {
      margin: 12,
    };

    return (
      <div>
        Home Page {this.message()}
        {
          !auth.isAuthenticated() && (
            <RaisedButton label="Login" primary={true} style={style} onClick={this.login.bind(this)} />
          )
        }
        {
          auth.isAuthenticated() && (
            <RaisedButton label="Logout" primary={true} style={style} onClick={this.logout.bind(this)} />
          )
        }
      </div>
    );
  }
}
