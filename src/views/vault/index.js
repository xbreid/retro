import React from 'react';
import Auth from '../../auth/Auth';
import RaisedButton from 'material-ui/RaisedButton';
import CryptoJS from 'crypto-js';
import KeyGen from 'generate-password';
import UUIDv4 from 'uuid/v4';
import axios from 'axios';

import { getAccessToken } from '../../auth/AuthService';

// styling
import './style.scss';

const auth = new Auth();
const REACTPM_ID_KEY = 'reactpm_id';

export default class Vault extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      authId: '',
      email: '',
      RpmID: '',
    }
  }

  configRpmID(email, email_verified) {
    const rpmId = localStorage.getItem(REACTPM_ID_KEY);
    if (!rpmId) {
      let rpmId = UUIDv4();

      // axios.post('http://localhost:3000/api/save', {
      //   //headers: { Authorization: `Bearer ${getAccessToken()}` },
      //   data: {
      //     email: email,
      //     email_verified: email_verified,
      //     document_id: rpmId
      //   }
      // });


      axios.get('http://localhost:3000/api/checkId', {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
        params: { id: rpmId }
      })
      .then(function(response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      })
      .catch(function (error) {
        console.log(error);
      });

      localStorage.setItem(REACTPM_ID_KEY, rpmId);
    }
    return rpmId;
  }

  componentDidMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        this.setState({ authId: profile.sub.substr(6) });
        this.setState({ email: profile.email });
        this.setState({ email_verified: profile.email });
        this.setState({ rpmId: this.configRpmID(profile.email, profile.email_verified )});
        console.log(profile);

        // if vault is empty create new vault

        let ciphertext = CryptoJS.AES.encrypt('password', profile.sub.substr(6));
        console.log(ciphertext.toString());
        let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), profile.sub.substr(6));
        let plaintext = bytes.toString(CryptoJS.enc.Utf8);
        console.log(plaintext);
      });
    } else {
      this.setState({ profile: userProfile });
    }

    // fetch vault from database
    axios.get('http://localhost:3000/api/getVaultByEmail', {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
      params: { email: 'user1@foo.com' }
    })
    .then(function(response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('http://localhost:3000/authorized', {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    })
    .then(function(response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });

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
          Vault --
          {this.state.authId}
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

