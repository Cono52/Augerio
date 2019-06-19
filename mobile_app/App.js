import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import ImageUploader from './ImageUploader';
import Login from './Login';
import AuthLoadingScreen from './AuthLoadingScreen';

const AppStack = createStackNavigator({ Home: ImageUploader });
const AuthStack = createStackNavigator({ SignIn: Login });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
