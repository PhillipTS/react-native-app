import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../Text';
import { COLOURS } from '../../../lib/Constants';
import { Style } from '../../../lib/Types';

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    margin: scale(10),
  },
  glowContainer: {
    shadowColor: COLOURS.white,
    shadowRadius: 10,
    shadowOpacity: 0.8,
    shadowOffset: { height: 1, width: 0 },
    elevation: 1, // Android
  },
  disabledContainer: {
    opacity: 0.4,
  },
  button: {
    width: '100%',
    minWidth: scale(150),
    height: scale(50),
    borderRadius: scale(8),
    padding: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    borderColor: COLOURS.primary,
    borderWidth: scale(2),
  },
  text: {
    color: COLOURS.white,
    fontSize: moderateScale(24),
  },
  secondaryText: {
    color: COLOURS.primary,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

interface RaisedButtonProps {
  label: string;
  onPress?: () => void;
  primary?: boolean;
  disabled?: boolean;
  glow?: boolean;
  leftInlineIcon?: React.ReactNode;
  rightInlineIcon?: React.ReactNode;
  backgroundColours?: [string, string];
  style?: Style;
  buttonStyle?: Style;
  textStyle?: Style;
}

class RaisedButton extends React.PureComponent<RaisedButtonProps> {
  static defaultProps = {
    onPress: null,
    primary: true,
    leftInlineIcon: <View />,
    rightInlineIcon: <View />,
  };

  render() {
    const {
      label, onPress, leftInlineIcon, rightInlineIcon,
      primary, glow, disabled,
      buttonStyle, style, textStyle, backgroundColours,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={!disabled ? onPress : null}
        style={[
          styles.buttonContainer,
          glow ? styles.glowContainer : null,
          disabled ? styles.disabledContainer : null,
          style,
        ]}
        accessibilityComponentType="button"
        accessibilityHint={label}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={backgroundColours ? backgroundColours
            : (primary ? [COLOURS.primary, COLOURS.secondary] : ['transparent', 'transparent'])}
          style={[styles.button, !primary ? styles.secondaryButton : null, buttonStyle]}
        >
          <View style={styles.row}>
            {leftInlineIcon}
            <Text title style={[styles.text, !primary ? styles.secondaryText : null, textStyle]}>
              {label}
            </Text>
            {rightInlineIcon}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default RaisedButton;
