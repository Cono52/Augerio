import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text
} from 'react-native';

import { login } from './credentials-utilities';

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
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.nativeEvent.text });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.nativeEvent.text });
  };

  submit = async () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    this.setState({ error: null });
    const result = await login(email, password);

    if (result.error) {
      this.setState({ error: result.error });
      return;
    }

    navigation.navigate('Home');
  };

  render() {
    const { email, password, error } = this.state;
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
          {error ? <Text>{error}</Text> : null}
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
