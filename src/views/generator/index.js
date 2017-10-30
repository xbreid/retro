import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Generator from 'generate-password';
import Checkbox from 'material-ui/Checkbox';

// styling
import './style.scss';


export default class Tools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      length: 10,
      hasNumbers: true,
      hasSymbols: true,
      useUppercase: true,
      excSimChars: false,
      isStrict: false,
      generatedPass: ''
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
    //this.forceUpdate();
  }

  handleGenClick = () => {
    this.generatePassword();
  };

  componentDidMount() {
    this.generatePassword();
  }

  _handleLengthField = (e) => {
    this.setState({ length: e.target.value });
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
    const style = {
      paddingTop: 100,
      minHeight: 400,
      paddingLeft: 256
    };

    const paperStyle = {
      paper: {
        height: 700,
        width: 600,
        margin: 20,
        display: 'inline-block',
        position: 'absolute',
        top: '18%',
        left: '35%'
      },
      topSection: {
        textAlign: 'center',
        backgroundColor: 'whitesmoke'
      },
      heading: {
        fontWeight: 100,
        padding: 40
      },
      genBtn: {
        margin: 30
      },
      passField: {
        fontSize: 20
      },
      checkbox: {
        marginBottom: 16,
      },
      advSettings: {
        border: '1px solid grey',
        borderRadius: 2,
        position: 'absolute',
        margin: 'auto',
        padding: 20,
        top: '41%',
        left: '18%'
      },
      advSettingsHead: {
        padding: 25,
        fontSize: 20,
        fontWeight: 100,
      },
      lengthField: {
        textAlign: 'center',
        marginBottom: 25
      }
    };

    return (
      <div style={style}>
        <Paper style={paperStyle.paper} zDepth={2} >
          <div style={paperStyle.topSection}>
            <h1 style={paperStyle.heading}>Generate a Password</h1>
            <TextField
              id="text-field-genpass"
              value={this.state.generatedPass}
              style={paperStyle.passField}
            />
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
            {/*<h3 style={paperStyle.advSettingsHead}>Advanced settings:</h3>*/}
            <div style={paperStyle.advSettings}>
              <div style={paperStyle.lengthField}>
                <TextField
                  hintText="Length of Password"
                  floatingLabelText="Password length"
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