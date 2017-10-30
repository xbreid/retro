import React from 'react';
import Auth from '../../auth/Auth';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { getAccessToken } from '../../auth/AuthService';
import AddSiteModal from '../components/add_site';
import {Card, CardActions, CardTitle } from 'material-ui/Card';
import EyeIcon from 'react-icons/lib/md/remove-red-eye';
import TrashIcon from 'react-icons/lib/fa/trash';
import IconButton from 'material-ui/IconButton';
import './style.scss';
import EditSiteModal from "../components/edit_site";
//import DeleteSiteAlert from "../components/delete_alert/index";

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
      recentSiteId: 0,
      editSiteOpen: false,
      editSite: {},
      deleteAlertOpen: false,
      isVaultEmpty: false
    };

    this.deleteSiteFromVault = this.deleteSiteFromVault.bind(this);
    this.addSiteToVault = this.addSiteToVault.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
    this.onTrashClick = this.onTrashClick.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
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
        data.map(function (doc) {
          return(this.setState({ docId: doc.id }));
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
    }, { headers: { Authorization: `Bearer ${getAccessToken()}` }})
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
    data.map(function(doc) {
      if (doc.retro.vault !== "empty") {
        let bytes = CryptoJS.AES.decrypt(doc.retro.vault, this.state.authId);
        doc.retro.vault = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.setRecentSiteId(doc.retro.vault.sites);
        this.setState({ isVaultEmpty: false });
      } else {
        this.setState({ isVaultEmpty: true });
        doc.retro.vault = { sites: [] };
      }
      return(this.setState({ data: data }));
    }, this)
  }

  addSiteToVault(site) {
    this.state.data.map(function(doc, index) {
      for (index = 0; index < doc.retro.vault.sites.length; index++) {
        if (site.id === doc.retro.vault.sites[index].id) {
          doc.retro.vault.sites[index] = site;
          this.setRecentSiteId(doc.retro.vault.sites);
          this.upsertVaultToDb(this.encryptedVault(doc.retro.vault, this.state.authId));
          this.setState({ editSiteOpen: false });
          this.setState({ editSite: {}});
          this.setState({ isVaultEmpty: false });
          return true;
        }
      }
      doc.retro.vault.sites.push(site);
      this.setRecentSiteId(doc.retro.vault.sites);
      this.upsertVaultToDb(this.encryptedVault(doc.retro.vault, this.state.authId));
      this.setState({ editSiteOpen: false });
      this.setState({ editSite: {}});
      this.setState({ isVaultEmpty: false });
      return true;
    }, this);
  }

  closeEditModal() {
    this.setState({editSiteOpen: false});
  }

  deleteSiteFromVault(doc, index) {
    doc.retro.vault.sites.splice(index, 1);
    this.setRecentSiteId(doc.retro.vault.sites);
    this.upsertVaultToDb(this.encryptedVault(doc.retro.vault, this.state.authId));
  }

  encryptedVault(vault, key) {
    let cipherText = CryptoJS.AES.encrypt(JSON.stringify(vault), key);
    return cipherText.toString();
  }

  setRecentSiteId(sites) {
    if (sites.length !== 0) {
      this.setState({ recentSiteId: sites[sites.length - 1].id });
    }
  }

  onViewClick(site) {
    this.setState({editSite: site});
    this.setState({editSiteOpen: true});
    this.forceUpdate();
  }

  onTrashClick(doc, index, cards) {
    cards.splice(index, 1);
    this.deleteSiteFromVault(doc, index);
    this.forceUpdate();
  }

  isVaultEmpty() {
    const imgStyle = {position: 'absolute', bottom: 0, right: 0, padding: 90};
    const welcome = { position: 'absolute', top: '40%', left: '45%',};
    const welcomeTitle = { textAlign: 'center', fontSize: 52, fontWeight: 100 };
    const subtext = { textAlign: 'center', fontSize: 18, marginTop: 30};

    if (this.state.isVaultEmpty) {
      return (
        <div>
          <div style={welcome}>
            <h1 style={welcomeTitle}><span  aria-label="wave" role="img">👋🏼</span> Welcome!</h1>
            <p style={subtext}>Thank you for using reactPM, start adding sites now.</p>
          </div>
          <img
            style={imgStyle}
            alt=""
            src="https://www.wpclipart.com/signs_symbol/arrows/angled_arrows/angled_arrows_2/arrow_angled_black_right_down.png"
          />
        </div>
      );
    } else {
      return false;
    }
  }

  render() {
    const cardTitle = { fontSize: 18 };
    const cardButtons = { margin: 0, float: 'right' };
    let cards = [];

    const cardSet = this.state.data.map(function (doc) {
      doc.retro.vault.sites.map(function (site, index) {
        let name = site.name;
        let username = site.username;

        if (username.length > 33) {
          username = username.substr(0, 33) + "...";
        }

        cards.push(
          <Card key={index} className="tile">
            <CardTitle className="cardTitle" titleStyle={cardTitle} title={name} subtitle={username}/>
            <CardActions className="cardActions">
              <div style={cardButtons}>
                <IconButton onClick={(e) => this.onViewClick(site)}><EyeIcon size="16"/></IconButton>
                <IconButton onClick={(e) => this.onTrashClick(doc, index, cards)}><TrashIcon size="16"/></IconButton>
              </div>
            </CardActions>
          </Card>
        );
        return true;
      }, this);
      return cards;
    }, this);

    return (
      <div>
        <div className="vault">
          {this.isVaultEmpty()}
          {cardSet}
        </div>
        <AddSiteModal addSite={this.addSiteToVault} siteId={this.state.recentSiteId+1} />
        <EditSiteModal addSite={this.addSiteToVault} closeModal={this.closeEditModal} open={this.state.editSiteOpen} site={this.state.editSite} />
      </div>
    );
  }
}

