import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import CheckIn from './pages/Checkin';

const Routes = createSwitchNavigator(
  {
    Sign: SignIn,
    App: createBottomTabNavigator(
      {
        CheckIn,
      },
      {
        tabBarOptions: {
          keyboardHidesTabBar: true,
          activeTintColor: '#ee4e62',
          inactiveTintColor: 'rgba(255,255,255,0.6)',
        },
      }
    ),
  },
  {
    initialRouteName: 'Sign',
  }
);

export default createAppContainer(Routes);
