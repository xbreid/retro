import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import EyeIcon from 'react-icons/lib/md/remove-red-eye';
import IconButton from 'material-ui/IconButton';
import PassProgressBar from '../progress_bar';

export default class EditSiteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      error: '',
      disableSubmit: false,
      url: '',
      name: '',
      username: '',
      password: '',
      siteId: 0,
      showPassword: true,
      passTypeField: "password"

    };

    this.addSiteToVault = this.addSiteToVault.bind(this);
  }

  componentDidMount() {
    this.setState({ open: this.props.open });
    this.setState({ siteId: this.props.site.id });
    this.setState({ url: this.props.site.url });
    this.setState({ name: this.props.site.name });
    this.setState({ username: this.props.site.username });
    this.setState({ password: this.props.site.password });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });
    this.setState({ siteId: nextProps.site.id });
    this.setState({ url: nextProps.site.url });
    this.setState({ name: nextProps.site.name });
    this.setState({ username: nextProps.site.username });
    this.setState({ password: nextProps.site.password });
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
    this.props.closeModal();
  };

  _handleUrlField = (e) => {
    this.setState({ url: e.target.value });
  };

  _handleNameField = (e) => {
    if (this.state.name !== '') {
      this.setState({disableSubmit: false});
    } else {
      this.setState({disableSubmit: true});
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
      this.setState({ passTypeField: "" });
    } else {
      this.setState({ passTypeField: "password" });
    }
  }

  render() {
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
        keyboardFocused={true}
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
          <Dialog
            title="Edit site"
            actions={actions}
            modal={true}
            open={this.state.open}
            actionsContainerClassName="action-container"
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
            </Row>
          </Dialog>
      </div>
    );
  }
}