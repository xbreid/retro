import React from 'react';
import Auth from '../../auth/Auth';

import RaisedButton from 'material-ui/RaisedButton';

// styling
import './style.scss';

const auth = new Auth();

export default class Vault extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  logout() {
    auth.logout();
  }

  render() {

    const style = {
      margin: 12,
    };

    return (
      <div>
        Vault
        {
          auth.isAuthenticated() && (
            <RaisedButton label="Logout" primary={true} style={style} onClick={this.logout.bind(this)} />
          )
        }
      </div>
    );
  }
}

