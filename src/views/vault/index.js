import React from 'react';
import Auth from '../../auth/Auth';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { getAccessToken } from '../../auth/AuthService';
import AddSiteModal from '../components/add_site';

// styling
import './style.scss';

// auth connection
const auth = new Auth();

export default class Vault extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      data: [],
      vault: [],
      docId: '',
      authId: '',
      email: '',
      RpmID: '',
      recentSiteId: 0
    };

    this.addSiteToVault = this.addSiteToVault.bind(this);
  }

  componentDidMount() {
    this.getAuthStatus();
    this.setState({ profile: {} });
    const { userProfile, getProfile } = auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        this.setState({ authId: profile.sub.substr(6) });
        this.setState({ email: profile.email });
        this.getVault(profile.email);
        this.getVaultId(profile.email);

      });
    } else {
      this.setState({ profile: userProfile });
      this.setState({ authId: userProfile.sub.substr(6) });
      this.setState({ email: userProfile.email });
      this.getVault(userProfile.email);
      this.getVaultId(userProfile.email);
    }
  }

  getVault(email) {
    // fetch vault from database
    axios.get('api/getVaultByEmail', {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
      params: { email: email }
    })
      .then(({ data })=> {
        this.initSiteData(data);
      })
      .catch((err)=> {
        console.log(err);
      });
  }

  getVaultId(email) {
    // fetch doc id from database
    axios.get('api/getDocIdByEmail', {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
      params: { email: email }
    })
      .then(({ data })=> {
        console.log(data);
        data.map(function (m) {
          return(this.setState({ docId: m.id }));
        }, this)
      })
      .catch((err)=> {
        console.log(err);
      });
  }

  upsertVaultToDb(vault) {
    axios.post('api/save', {
      email: this.state.email,
      vault: vault,
      docId: this.state.docId
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getAuthStatus() {
    axios.get('api/authorized', {
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

  initSiteData(data) {
    data.map(function(m) {
      let bytes  = CryptoJS.AES.decrypt(m.retro.vault, this.state.authId);
      m.retro.vault = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      console.log(m.retro.vault);
      console.log(data);
      this.setRecentSiteId(m.retro.vault.sites);

      return(this.setState({ data: data }));
    }, this)
  }

  addSiteToVault(site) {
    this.state.data.map(function(m, i) {
      for (i = 0; i < m.retro.vault.sites.length; i++) {
        if (site.id === m.retro.vault.sites[i].id) {
          return false;
        }
      }
      m.retro.vault.sites.push(site);
      console.log(m.retro.vault.sites);
      console.log(m.retro.vault.sites.length);
      this.setRecentSiteId(m.retro.vault.sites);

      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(m.retro.vault), this.state.authId);
      console.log(ciphertext);
      let cipherstring = ciphertext.toString();
      console.log(cipherstring);
      this.upsertVaultToDb(cipherstring);

      return true;
    }, this);
  }


  setRecentSiteId(sites) {
    if (sites.length !== 0) {
      this.setState({ recentSiteId: sites[sites.length - 1].id });
    }
  }

  render() {

    const style = {
      paddingTop: 100,
      minHeight: 400,
      paddingLeft: 256
    };

    return (
      <div>
        <div style={style}>
          Vault -- Page
          {this.state.recentSiteId}
        </div>
        <AddSiteModal addSite={this.addSiteToVault} siteId={this.state.recentSiteId+1} docId={this.state.docId}/>
      </div>
    );
  }
}

