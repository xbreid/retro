import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';

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
      docId: '',
      siteId: 0,

    };

    this.addSiteToVault = this.addSiteToVault.bind(this);
  }

  componentDidMount() {
    this.setState({ siteId: this.props.siteId });
    this.setState({ docId: this.props.docId });
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
      docId: nextProps.docId,
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
  }

  handleClose = () => {
    this.setState({open: false});
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
        disabled={this.state.disableSubmit}
      />,
    ];

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
              floatingLabelFixed={true}
              value={this.state.url}
              onChange={this._handleUrlField}
            />
            </Col>
            <Col sm={6}>
            <TextField
              hintText="Site Name"
              floatingLabelText="Site Name Field"
              floatingLabelFixed={true}
              errorText={this.state.error}
              value={this.state.name}
              onChange={this._handleNameField}
            />
            </Col>
            <Col sm={6}>
            <TextField
              hintText="Username Field"
              floatingLabelText="Username"
              floatingLabelFixed={true}
              value={this.state.username}
              onChange={this._handleUsernameField}
            />
            </Col>
            <Col sm={6}>
            <TextField
              hintText="Password Field"
              floatingLabelText="Password"
              type="password"
              floatingLabelFixed={true}
              value={this.state.password}
              onChange={this._handlePasswordField}
            />
            </Col>
            </Row>
          </Dialog>
      </div>
    );
  }
}