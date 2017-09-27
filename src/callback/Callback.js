import { Component } from 'react';
import {setIdToken, setAccessToken, setExpiresAt} from '../auth/AuthService';
import Auth from '../auth/Auth';

const auth = new Auth();

class Callback extends Component {

  componentDidMount() {
    // setAccessToken();
    // setIdToken();
    // setExpiresAt();
    auth.handleAuthentication();
  }

  render() {
    return null;
  }
}

export default Callback;