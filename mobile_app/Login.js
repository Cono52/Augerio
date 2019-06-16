import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 200
  },
  title: {
    fontSize: 36,
    margin: 36,
    fontWeight: 'bold'
  },
  input: {
    width: 200,
    paddingLeft: 20,
    borderRadius: 3,
    paddingRight: 20,
    margin: 10,
    backgroundColor: '#EEE'
  },
  button: {
    width: 200,
    height: 45,
    marginTop: 20,
    backgroundColor: '#3498db',
    display: 'flex',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  forgotPassword: {
    width: '100%',
    display: 'flex',
    color: 'blue',
    alignItems: 'flex-start'
  }
});

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

  submit = () => {
    const { email, password } = this.state;
    console.log(email, password);
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.loginForm} behavior="padding" enabled>
          <Text style={styles.title}>Augerio</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={this.handleEmailChange}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChange={this.handlePasswordChange}
          />
          <Text style={styles.forgotPassword}>Forgot password?</Text>
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Login;
