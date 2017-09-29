import { Component } from 'react';
import Auth from '../auth/Auth';

const auth = new Auth();

export default class Callback extends Component {

  componentDidMount() {
    auth.handleAuthentication();
  }

  render() {
    return null;
  }
}