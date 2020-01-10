import React from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn';
import CheckIn from './pages/Checkin';
import HelpOrder from './pages/HelpOrder';
import New from './pages/Question/New';
import Answer from './pages/Question/Answer';

const Routes = createSwitchNavigator(
  {
    Sign: SignIn,
    App: createBottomTabNavigator(
      {
        CheckIn,

        HelpOrder,
        New,
        Answer,
      },
      {
        tabBarOptions: {
          keyboardHidesTabBar: true,
          activeTintColor: '#ee4e62',
          inactiveBackgroundColor: 'rgba(255,255,255,0.1)',
        },
      }
    ),
  },
  {
    initialRouteName: 'Sign',
  }
);

export default createAppContainer(Routes);
