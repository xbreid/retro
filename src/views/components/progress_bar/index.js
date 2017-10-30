import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
let passwordValidator = require('password-validator');

export default class PasswordProgressBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 10,
      color: "red",
      style: {},
      password: ''
    };
  }

  componentDidMount() {
    console.log(this.props.password);
    this.setState({
      style: this.props.style,
      password: this.props.password
    });
  }

  componentWillReceiveProps(nextProps) {
    this.validatePassword(nextProps.password);
    this.setState({
      style: nextProps.style,
      password: nextProps.password
    });
  }

  validatePassword(password) {
    let format = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]/;
    let numFormat = /^\d+$/;
    let lcFormat = /^[a-z]+$/;
    let symFormat = /^[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]+$/;

    let schema = new passwordValidator();
    schema
      .is().min(6)
      .is().max(256)
      .has().uppercase()
      .has().digits()
      .has().not().spaces();

    if (password.length === 0) {
      this.setState({ color: "red", completed: 10 });
    } else if (password.length <= 5) {
      if (schema.validate(password) && (format.test(password))) {
        this.setState({ color: "lightgreen", completed: 75 });
      } else if (schema.validate(password)) {
        this.setState({ color: "yellow", completed: 50 });
      } else {
        this.setState({ color: "red", completed: 25 });
      }
    } else if(password.length >= 6 && (password.length <= 8)) {
      if (schema.validate(password) && (format.test(password))) {
        this.setState({ color: "lightgreen", completed: 85 });
      } else if (schema.validate(password)) {
        this.setState({ color: "lightgreen", completed: 75 });
      } else if (numFormat.test(password)) {
        this.setState({ color: "yellow", completed: 50 });
      } else if (symFormat.test(password)) {
        this.setState({ color: "yellow", completed: 50 });
      } else if (lcFormat.test(password)) {
        this.setState({ color: "yellow", completed: 50 });
      } else {
        this.setState({ color: "yellow", completed: 50 });
      }
    } else if(password.length >= 9 && (password.length <= 11)){
      if (schema.validate(password) && (format.test(password))) {
        this.setState({ color: "green", completed: 100 });
      } else if (schema.validate(password)) {
        this.setState({ color: "lightgreen", completed: 85 });
      } else if (numFormat.test(password)) {
        console.log('test1');
        this.setState({ color: "yellow", completed: 50 });
      } else if (symFormat.test(password)) {
        console.log('test2');
        this.setState({ color: "yellow", completed: 50 });
      } else if (lcFormat.test(password)) {
        console.log('test3');
        this.setState({ color: "yellow", completed: 50 });
      } else {
        this.setState({ color: "lightgreen", completed: 75 });
      }
    } else {
      if (schema.validate(password) && (format.test(password))) {
        this.setState({ color: "green", completed: 100 });
      } else if (schema.validate(password)) {
        this.setState({ color: "lightgreen", completed: 90 });
      } else if (numFormat.test(password)) {
        this.setState({ color: "yellow", completed: 50 });
      } else if (symFormat.test(password)) {
        this.setState({ color: "lightgreen", completed: 75 });
      } else if (lcFormat.test(password)) {
        this.setState({ color: "lightgreen", completed: 75 });
      } else {
        this.setState({ color: "lightgreen", completed: 85 });
      }
    }
  }

  render() {
    return (
      <LinearProgress
        style={this.state.style}
        color={this.state.color}
        mode="determinate"
        value={this.state.completed}
      />
    );
  }
}