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
        textAlign: 'center',
        display: 'inline-block',
        position: 'absolute',
        top: '18%',
        left: '35%'
      },
      topSection: {
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
            
          </div>
        </Paper>
      </div>
    );
  }
}