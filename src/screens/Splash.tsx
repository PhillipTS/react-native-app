import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import Screen from '../components/Screen';
import Logo from '../components/Logo';
import { AppState, User } from '../../lib/Types';
import { checkLoginStatus } from '../../lib/Api';

interface SplashProps {
  navigation?: NavigationScreenProp<{}>;
  loading?: boolean;
  authLoading?: boolean;
  user?: User;
}

class Splash extends React.PureComponent<SplashProps> {
  componentWillUpdate(newProps: SplashProps) {
    const { navigation, loading, authLoading } = newProps;

    if (!loading && !authLoading) {
      const userLoggedIn = checkLoginStatus();

      if (userLoggedIn) {
        // User is logged in
        navigation.navigate('Main');
        return;
      }
      // User is not logged in
      navigation.navigate('Onboarding');
    }
  }

  render() {
    return (
      <Screen>
        <Logo />
      </Screen>
    );
  }
}

export default connect<{}, {}, SplashProps>(
  (state: AppState) => ({
    loading: state.loading.loading,
    authLoading: state.loading.authLoading,
    user: state.user,
  }),
)(Splash);
