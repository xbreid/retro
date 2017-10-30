import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Generator from 'generate-password';
import Checkbox from 'material-ui/Checkbox';
import PassProgressBar from '../components/progress_bar';

// styling
import './style.scss';

export default class PassGen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      length: 10,
      hasNumbers: true,
      hasSymbols: true,
      useUppercase: true,
      excSimChars: false,
      isStrict: false,
      generatedPass: '',
      error: ''
    };

    this.handleGenClick = this.handleGenClick.bind(this);
  }

  generatePassword() {
    let initPass = Generator.generate({
      length: this.state.length,
      numbers: this.state.hasNumbers,
      symbols: this.state.hasSymbols,
      uppercase: this.state.useUppercase,
      excludeSimilarCharacters: this.state.excSimChars,
      strict: this.state.isStrict
    });
    this.setState({ generatedPass: initPass });
  }

  handleGenClick = () => {
    if (this.state.length === '') {
      this.setState({ error: 'not valid length between 0-256' });
    } else {
      if(parseInt(this.state.length, 10) > 256 || parseInt(this.state.length, 10) < 0) {
        this.setState({ error: 'not valid length between 0-256' });
      } else {
        this.generatePassword();
      }
    }
  };

  componentDidMount() {
    this.generatePassword();
  }

  _handleLengthField = (e) => {
    if(!isNaN(e.target.value)) {
      if(parseInt(e.target.value, 10) > 256 || parseInt(e.target.value, 10) < 0) {
        this.setState({ error: 'not valid length between 0-256' });
      } else {
        this.setState({ length: e.target.value });
        this.setState({ error: '' });
      }
    } else {
      this.setState({ error: 'not valid length between 0-256' });
    }

  };

  updateHasNumbers() {
    this.setState((oldState) => {
      return {
        hasNumbers: !oldState.hasNumbers,
      };
    });
  }

  updateHasSymbols() {
    this.setState((oldState) => {
      return {
        hasSymbols: !oldState.hasSymbols,
      };
    });
  }

  updateUseUppercase() {
    this.setState((oldState) => {
      return {
        useUppercase: !oldState.useUppercase,
      };
    });
  }

  updateExcSimChards() {
    this.setState((oldState) => {
      return {
        excSimChars: !oldState.excSimChars,
      };
    });
  }

  updateStrict() {
    this.setState((oldState) => {
      return {
        isStrict: !oldState.isStrict,
      };
    });
  }

  render() {

    const paperStyle = {
      genBtn: {
        margin: 30
      },
      passField: {
        fontSize: 20
      },
      checkbox: {
        marginBottom: 16,
      },
    };

    const progressStyle = {
      width: 250,
      left: '29%'
    };

    return (
      <div className="page-container">
        <Paper className="paper-container" zDepth={2} >
          <div className="top-section">
            <h1 className="heading">Generate a Password</h1>
            <TextField
              id="text-field-genpass"
              value={this.state.generatedPass}
              style={paperStyle.passField}
            />
            <PassProgressBar style={progressStyle} password={this.state.generatedPass}/>
            <div>
              <RaisedButton
                label="Generate"
                primary={true}
                style={paperStyle.genBtn}
                onClick={this.handleGenClick}
              />
            </div>
          </div>
          <div>
            <div className="advance-settings">
              <div className="length-field">
                <TextField
                  hintText="Length of Password"
                  floatingLabelText="Password length"
                  errorText={this.state.error}
                  defaultValue="10"
                  onChange={this._handleLengthField}
                />
              </div>
              <Checkbox
                label="include numbers (0-9)"
                checked={this.state.hasNumbers}
                onCheck={this.updateHasNumbers.bind(this)}
                style={paperStyle.checkbox}
              />
              <Checkbox
                label="include symbols (!$%@#)"
                checked={this.state.hasSymbols}
                onCheck={this.updateHasSymbols.bind(this)}
                style={paperStyle.checkbox}
              />
              <Checkbox
                label="include uppercase (A-Z)"
                checked={this.state.useUppercase}
                onCheck={this.updateUseUppercase.bind(this)}
                style={paperStyle.checkbox}
              />
              <Checkbox
                label="Exclude similar characters"
                checked={this.state.excSimChars}
                onCheck={this.updateExcSimChards.bind(this)}
                style={paperStyle.checkbox}
              />
              <Checkbox
                label="include at least one character from above"
                checked={this.state.isStrict}
                onCheck={this.updateStrict.bind(this)}
                style={paperStyle.checkbox}
              />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}