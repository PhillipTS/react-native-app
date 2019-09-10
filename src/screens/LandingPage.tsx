import React from 'react';
import Screen from '../components/Screen';
import Image from '../components/Image';
import Text from '../components/Text';
import RaisedButton from '../components/Buttons/RaisedButton';
import { Icon } from '../../assets';
import Strings from '../../lib/Strings';
import RouteNames from './Routes';
import { ScreenProps } from '../../lib/Types';

const strings = Strings.Landing;

interface LandingPageProps extends ScreenProps {}

class LandingPage extends React.PureComponent<LandingPageProps> {
  onSignIn = () => this.props.navigation.navigate(RouteNames.SignIn);

  onSignUp = () => this.props.navigation.navigate(RouteNames.SignUp);

  render() {
    return (
      <Screen>
        <Image source={Icon} />
        <Text title>{strings.title}</Text>
        <RaisedButton label={strings.signUp} onPress={this.onSignUp} />
        <RaisedButton label={strings.signIn} onPress={this.onSignIn} />
      </Screen>
    );
  }
}

export default LandingPage;
