import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import RouteNames from './Routes';

import Splash from './Splash';

import LandingPage from './LandingPage';
import Login from './Login';
import Home from './Home';

const Onboarding = createStackNavigator(
  {
    [RouteNames.LandingPage]: LandingPage,
    [RouteNames.SignIn]: { screen: Login, params: { isSignUp: false } },
    [RouteNames.SignUp]: { screen: Login, params: { isSignUp: true } },
  },
  { headerMode: 'none' },
);

const Main = createStackNavigator(
  {
    [RouteNames.Home]: Home,
  },
  { headerMode: 'none' },
);

export default createAppContainer(createSwitchNavigator(
  {
    [RouteNames.Splash]: Splash,
    Onboarding,
    Main,
  },
));
