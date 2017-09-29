import React from 'react';
import Auth from '../../auth/Auth';

import RaisedButton from 'material-ui/RaisedButton';

// styling
//import './style.scss';

const auth = new Auth();

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    localStorage.removeItem('reactpm_id');
    localStorage.removeItem('ReactPM_ID');
    localStorage.removeItem('dk');
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
      <div style={style}>
        Notes
        {
          auth.isAuthenticated() && (
            <RaisedButton label="Logout" primary={true} style={button} onClick={this.logout.bind(this)} />
          )
        }
      </div>
    );
  }
}