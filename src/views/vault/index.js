import React from 'react';
import Auth from '../../auth/Auth';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { getAccessToken, isLoggedIn } from '../../auth/AuthService';
import AddSiteModal from '../components/add_site';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import EyeIcon from 'react-icons/lib/md/remove-red-eye';
import ControlIcon from 'react-icons/lib/md/keyboard-control';
import TrashIcon from 'react-icons/lib/fa/trash';
import IconButton from 'material-ui/IconButton';

// styling
import './style.scss';
import EditSiteModal from "../components/edit_site";
import DeleteSiteAlert from "../components/delete_alert/index";

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
      deleteAlertOpen: false
    };

    this.deleteSiteFromVault = this.deleteSiteFromVault.bind(this);
    this.addSiteToVault = this.addSiteToVault.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
    this.onTrashClick = this.onTrashClick.bind(this);
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
    console.log(email);
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
        console.log(doc.retro.vault);
        console.log(data);
        this.setRecentSiteId(doc.retro.vault.sites);
      } else {
        doc.retro.vault = { notes: [], sites: [] };
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
          return true;
        }
      }
      doc.retro.vault.sites.push(site);
      console.log(doc.retro.vault.sites);
      console.log(doc.retro.vault.sites.length);
      this.setRecentSiteId(doc.retro.vault.sites);
      this.upsertVaultToDb(this.encryptedVault(doc.retro.vault, this.state.authId));
      this.setState({ editSiteOpen: false });
      this.setState({ editSite: {}});
      return true;
    }, this);
  }

  deleteSiteFromVault(doc, index) {
    doc.retro.vault.sites.splice(index, 1);
    console.log(doc.retro.vault.sites);
    this.setRecentSiteId(doc.retro.vault.sites);
    this.upsertVaultToDb(this.encryptedVault(doc.retro.vault, this.state.authId));
  }

  encryptedVault(vault, key) {
    let cipherText = CryptoJS.AES.encrypt(JSON.stringify(vault), key);
    console.log(cipherText);
    let cipherString = cipherText.toString();
    console.log(cipherString);
    return cipherString;
  }

  setRecentSiteId(sites) {
    if (sites.length !== 0) {
      this.setState({ recentSiteId: sites[sites.length - 1].id });
    }
  }

  onViewClick(site) {
    console.log(site);
    this.setState({editSite: site});
    this.setState({editSiteOpen: true});
  }

  onTrashClick(doc, index, cards) {
    cards.splice(index, 1);
    this.deleteSiteFromVault(doc, index);
    this.forceUpdate();
  }

  render() {
    const cardTitle = { fontSize: 18 };
    const cardButtons = { float: 'right' };
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
          {cardSet}
        </div>
        <AddSiteModal addSite={this.addSiteToVault} siteId={this.state.recentSiteId+1} />
        <EditSiteModal addSite={this.addSiteToVault} open={this.state.editSiteOpen} site={this.state.editSite} />
      </div>
    );
  }
}

