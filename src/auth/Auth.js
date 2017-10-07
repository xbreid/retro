import auth0 from 'auth0-js';

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: 'reactpm.auth0.com',
    clientID: 'aWZOYGdXcmJiFCJFEiLyM67HfFvuq03I',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://reactpm.com',
    responseType: 'token id_token',
    scope: 'openid profile email read:authstatus'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  userProfile;

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
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

  // an attempt to use a custom login form
  // was going to try to use this to hash password before they went to Auth0 server
  // but they already do that, so whats the point
  // login(email, password) {
  //   this.auth0.login({
  //     realm: 'Username-Password-Authentication',
  //     username: email,
  //     password: password,
  //     scope: 'openid profile email'
  //   }, (err, authResult) => {
  //     if (err){
  //       console.error(err);
  //     }else{
  //       console.log("authenticated");
  //       this.local.set('id_token', authResult.idToken);
  //
  //       // Fetch profile information
  //       this.auth0.getProfile(authResult.idToken, (error, profile) => {
  //         if (error) {
  //           console.error(error);
  //         }
  //         console.log(profile);
  //       });
  //     }
  //   });
  // }

}
