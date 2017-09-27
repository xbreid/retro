import auth0 from 'auth0-js';
import history from '../history';

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: 'reactpm.auth0.com',
    clientID: 'pD1q0qTemM31jhJ-tUIOczFZaRjwyjZ2',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://reactpm.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  requireAuth() {
    if (!this.isAuthenticated()) {
      history.replace('/');
    }
  }

  handleAuthentication() {
    console.log("handle auth");
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        //history.replace('/vault');
      } else if (err) {
        window.location.href = "/";
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    console.log("session setup");
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    window.location.href = "/vault";
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    window.location.href = "/";
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  login() {
    this.auth0.authorize();
  }

}
