import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class DeleteSiteAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.deleteSiteFromVault = this.deleteSiteFromVault.bind(this);
  }

  componentDidMount() {
    this.setState({ open: this.props.open });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });
  }

  deleteSiteFromVault() {
    //this.props.deleteSite(site);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleDelete = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton label="Delete" primary={true} onClick={this.handleDelete} />,
    ];

    return (
      <div>
        <RaisedButton label="Alert" onClick={this.handleOpen} />
        <Dialog actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
          Delete site from vault? This cannot be undone.
        </Dialog>
      </div>
    );
  }
}