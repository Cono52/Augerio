import React from 'react';
import {
  ActivityIndicator, StatusBar, View, Text
} from 'react-native';

import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';

import { login } from './credentials-utilities';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const { navigation } = this.props;

    // remove the old cookie
    await AsyncStorage.removeItem('augerio-cookie');

    try {
      /** uncomment line below to dump creds each reload, handy for testing login flows. */
      // await Keychain.resetGenericPassword();

      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(`Credentials successfully loaded for user ${credentials.username}`);
        const result = await login(credentials.username, credentials.password);
        console.log('re-login result: ', result);
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }

    // the login should have put in the new cookie
    const cookie = await AsyncStorage.getItem('augerio-cookie');
    navigation.navigate(cookie ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <Text>WAAIIT!!!</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
