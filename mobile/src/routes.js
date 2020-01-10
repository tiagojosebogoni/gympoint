import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import CheckIn from './pages/Checkin';
import HelpOrder from './pages/HelpOrder';

const Routes = createSwitchNavigator(
  {
    Sign: SignIn,
    App: createBottomTabNavigator(
      {
        CheckIn,
        HelpOrder,
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
