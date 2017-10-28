import React from 'react';
import Auth from '../../auth/Auth';
import RaisedButton from 'material-ui/RaisedButton';
import './style.scss';

const auth = new Auth();

export default class Home extends React.Component {
   constructor(props) {
     super(props);
     props.navOpen();

     this.login = this.login.bind(this);
   }

  login() {
    auth.login();
  }

  render() {

    const style = {
      marginTop: 60
    };

    return (
      <div style={style}>
        Home Page --
        <RaisedButton label="Login" primary={true} style={style} onClick={this.login.bind(this)} />
      </div>
    );
  }
}
