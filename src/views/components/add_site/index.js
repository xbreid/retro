import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import EyeIcon from 'react-icons/lib/md/remove-red-eye';
import IconButton from 'material-ui/IconButton';
import PassProgressBar from '../progress_bar';

import './style.scss';

export default class AddSiteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      error: '',
      disableSubmit: true,
      url: '',
      name: '',
      username: '',
      password: '',
      siteId: 0,
      showPassword: false,
      passTypeField: "",
      keyboardFocused: false

    };

    this.addSiteToVault = this.addSiteToVault.bind(this);
  }

  componentDidMount() {
    this.setState({ siteId: this.props.siteId });
  }

  addSiteToVault() {
    let site = {
      "id": this.state.siteId,
      "url": this.state.url,
      "name": this.state.name,
      "username": this.state.username,
      "password": this.state.password
    };
    this.props.addSite(site);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      siteId: nextProps.siteId
    });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    if (this.state.name === '') {
      this.setState({error: 'This field is required'});
    } else {
      this.addSiteToVault();
      this.clearStates();
      this.setState({open: false});
    }
  };

  clearStates() {
    this.setState({ url: '' });
    this.setState({ name: '' });
    this.setState({ username: '' });
    this.setState({ password: '' });
    this.setState({ error: '' });
  }

  handleClose = () => {
    this.clearStates();
    this.setState({open: false});
  };

  _handleUrlField = (e) => {
    this.setState({ url: e.target.value });
  };

  _handleNameField = (e) => {
    if (this.state.name !== '') {
      this.setState({disableSubmit: false, keyboardFocused: false });
    } else {
      this.setState({disableSubmit: true, keyboardFocused: true });
    }
    this.setState({ name: e.target.value });
  };

  _handleUsernameField = (e) => {
    this.setState({ username: e.target.value });
  };

  _handlePasswordField = (e) => {
    this.setState({ password: e.target.value });
  };

  handleEyeClick() {
    this.setState({ showPassword: !this.state.showPassword });
    if(!this.state.showPassword) {
      this.setState({ passTypeField: "password" });
    } else {
      this.setState({ passTypeField: "" });
    }
  }

  render() {
    const fab = {
      marginRight: 30,
      marginBottom: 30,
      position: 'absolute',
      right:    0,
      bottom:   0
    };

    const rowStyle = {
      marginLeft: 10
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
        keyboardFocused={this.state.keyboardFocused}
        disabled={this.state.disableSubmit}
      />,
    ];

    const eyeStyle = {
      marginLeft: -40
    };

    const progressStyle = {
      width: 250,
    };

    return (
      <div>
        <FloatingActionButton onClick={this.handleOpen} style={fab}>
          <ContentAdd />
        </FloatingActionButton>
          <Dialog
            title="Add new site"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <Row style={rowStyle}>
            <Col sm={6}>
            <TextField
              hintText="Site URL"
              floatingLabelText="Site URL Field"
              value={this.state.url}
              onChange={this._handleUrlField}
            />
            </Col>
            <Col sm={6}>
            <TextField
              hintText="Site Name"
              floatingLabelText="Site Name Field"
              errorText={this.state.error}
              value={this.state.name}
              onChange={this._handleNameField}
            />
            </Col>
            <Col sm={6}>
            <TextField
              hintText="Username Field"
              floatingLabelText="Username"
              value={this.state.username}
              onChange={this._handleUsernameField}
            />
            </Col>
            <Col sm={6}>
            <TextField
              hintText="Password Field"
              floatingLabelText="Password"
              type={this.state.passTypeField}
              value={this.state.password}
              onChange={this._handlePasswordField}
              className="password-field"
            />
              <IconButton style={eyeStyle} onClick={(e) => this.handleEyeClick()}><EyeIcon size="15"/></IconButton>
              <div>
                <PassProgressBar style={progressStyle} password={this.state.password}/>
              </div>
            </Col>
            <Col sm={12}>

            </Col>
            </Row>
          </Dialog>
      </div>
    );
  }
}