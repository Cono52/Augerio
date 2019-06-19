// clear any existing cookies
import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';
import clearReactNativeCookies from './clear-cookies';

async function login(email, password) {
  /** Due react-native being not very good at handling cookies
   *  we need dump the one it stores so it doesnt conflict
   *  with the cookie we will manually manage and store in AsyncStorage */
  await clearReactNativeCookies();

  const res = await fetch('http://192.168.42.125:3001/user/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (res.status === 200) {
    await AsyncStorage.setItem('augerio-cookie', res.headers.map['set-cookie']);
    await Keychain.setGenericPassword(email, password);
    return true;
  }

  return { err: res };
}

export default login;
