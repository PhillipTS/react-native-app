import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet, Alert } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Text from '../components/Text';
import Button from '../components/Buttons/Button';
import RaisedButton from '../components/Buttons/RaisedButton';
import SignInInput from '../components/SignInInput';
import STRINGS from '../../lib/Strings';
import RouteNames from './Routes';
import { Status, ScreenProps } from '../../lib/Types';
import { signIn, SignInResult } from '../../lib/Api';
import { COLOURS, CONTENT_WIDTH } from '../../lib/Constants';

const Strings = STRINGS.Login;

const styles = StyleSheet.create({
  textRow: { flexDirection: 'row' },
  item: { width: CONTENT_WIDTH },
  raisedButtonIcon: { alignSelf: 'flex-end' },
  text: { fontSize: moderateScale(16) },
  inLineButton: { marginHorizontal: scale(5) },
});

interface NavigationProps { isSignUp: boolean; }

interface LoginProps extends ScreenProps<NavigationProps> {
  onLogin: (username: string, password: string) => SignInResult;
}

interface LoginState {
  email: string;
  password: string;
  confirmPassword: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleLogin = async () => {
    const { navigation, onLogin } = this.props;
    const { email, password } = this.state;
    const { navigate } = navigation;

    const { status, error } = await onLogin(email, password);
    if (status === Status.SUCCESS) {
      navigate(RouteNames.Home);
    } else {
      Alert.alert('Error', error.message);
    }
  };

  handleChangeEmail = (val: string) => this.setState({ email: val });

  handleChangePassword = (val: string) => this.setState({ password: val });

  handleChangeConfirm = (val: string) => this.setState({ confirmPassword: val });

  handleOpenSignUp = () => this.props.navigation.push(RouteNames.SignUp);

  handleOpenSignIn = () => this.props.navigation.push(RouteNames.SignIn);

  render() {
    const { navigation } = this.props;
    const { email, password, confirmPassword } = this.state;

    const isSignUp = navigation.getParam('isSignUp', false);

    const screenStrings = Strings[isSignUp ? 'SignUp' : 'SignIn'];

    return (
      <Screen>

        <Text title>{screenStrings.title}</Text>
        <View>
          <SignInInput
            style={styles.item}
            placeholder={Strings.emailPlaceholder}
            type="email"
            iconName="email"
            value={email}
            onChange={this.handleChangeEmail}
          />
          <SignInInput
            style={styles.item}
            placeholder={Strings.passwordPlaceholder}
            type="password"
            iconName="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          {isSignUp && (
            <SignInInput
              style={styles.item}
              placeholder={Strings.confirmPasswordPlaceholder}
              type="password"
              iconName="password"
              value={confirmPassword}
              onChange={this.handleChangeConfirm}
            />
          )}
          <RaisedButton
            style={styles.item}
            label={screenStrings.buttonLabel}
            onPress={this.handleLogin}
            rightInlineIcon={(
              <Ionicons
                style={styles.raisedButtonIcon}
                name="ios-arrow-forward"
                color={COLOURS.white}
                size={scale(30)}
              />
            )}
          />
        </View>

        <View style={styles.textRow}>
          <Text>{screenStrings.Change.pretext}</Text>
          <Button
            style={styles.inLineButton}
            textStyle={styles.text}
            label={screenStrings.Change.button}
            onPress={isSignUp ? this.handleOpenSignIn : this.handleOpenSignUp}
          />
          <Text>{screenStrings.Change.posttext}</Text>
        </View>

      </Screen>
    );
  }
}

export default connect<LoginState, {}, LoginProps>(
  null,
  dispatch => bindActionCreators(
    {
      onLogin: (username: string, password: string) => signIn(username, password),
    },
    dispatch,
  ),
)(Login);
