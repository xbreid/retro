import { Component } from 'react';
import Auth from '../auth/Auth';

const auth = new Auth();

class Callback extends Component {

  componentDidMount() {
    auth.handleAuthentication();
  }

  render() {
    return null;
  }
}

export default Callback;