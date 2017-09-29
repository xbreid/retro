import React from 'react';
import Auth from '../../auth/Auth';
import RaisedButton from 'material-ui/RaisedButton';
import CryptoJS from 'crypto-js';
import KeyGen from 'generate-password';
import UUIDv4 from 'uuid/v4';

// styling
import './style.scss';

const auth = new Auth();
const REACTPM_ID_KEY = 'reactpm_id';
const REACTPM_DK_KEY = 'reactpm_dk';

export default class Vault extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      authId: '',
      email: '',
      rpmId: '',
    }
  }

  // TODO: how does the decryption key go comp to comp?
  getRpmId(userId) {
    const rpmId = localStorage.getItem(REACTPM_ID_KEY);
    if (!rpmId) {
      let rpmId = UUIDv4();
      localStorage.setItem(REACTPM_ID_KEY, rpmId);

      // let salt = CryptoJS.lib.WordArray.random(128/8);
      // console.log(salt.toString());

      // let key = CryptoJS.PBKDF2(password + username, salt, {
      //   keySize: 256/32,
      //   iterations: 5000
      // });
      // console.log(key.toString());
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
        //this.setState({ rpmId: this.getRpmId(profile.sub.substr(6)) });
        console.log(profile);
        console.log(profile.user_metadata);

        // fetch vault from database
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

    // let password = KeyGen.generate({
    //   length: 64,
    //   numbers: true,
    //   symbols: true,
    //   uppercase: true,
    //   strict: true
    // });
    //
    // console.log(password);

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
          {this.state.authId} ---
          {this.state.rpmId}
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

