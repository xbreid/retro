import React from 'react';
import Auth from '../../auth/Auth';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import RaisedButton from 'material-ui/RaisedButton';

// styling
import './style.scss';

const auth = new Auth();

export default class Vault extends React.Component {
  constructor(props) {
    super(props);

  }



  logout() {
    auth.logout();
  }

  render() {

    const style = {
      paddingTop: 64,
      minHeight: 400,
      paddingLeft: 256
    };

    const button = {
      margin: 12
    };

    return (
      <div>
        <div style={style}>
          Vault
        {
          auth.isAuthenticated() && (
            <RaisedButton label="Logout" primary={true} style={button} onClick={this.logout.bind(this)} />
          )
        }
        </div>
      </div>
    );
  }
}

