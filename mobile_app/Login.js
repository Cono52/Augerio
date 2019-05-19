import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <View>
        <Input value={email} onChange={this.handleEmailChange} />
        <Input secureTextEntry value={password} onChange={this.handlePasswordChange} />
        <Button title="Login" />
      </View>
    );
  }
}

export default Login;
