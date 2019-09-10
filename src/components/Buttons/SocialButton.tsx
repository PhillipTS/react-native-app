import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { FontAwesome } from '@expo/vector-icons';
import { COLOURS } from '../../../lib/Constants';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    margin: scale(5),
  },
  facebookButton: {
    backgroundColor: COLOURS.facebook,
  },
  googleButton: {
    backgroundColor: COLOURS.google,
  },
  button: {
    width: '100%',
    minWidth: scale(100),
    height: scale(50),
    borderRadius: scale(8),
    padding: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface SocialButtonProps {
  type: 'facebook' | 'google';
  onPress: () => void;
}

class SocialButton extends React.PureComponent<SocialButtonProps> {
  render() {
    const { type, onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.buttonContainer}
        accessibilityComponentType="button"
        accessibilityHint={`${type} Button`}
      >
        <View
          style={[
            styles.button,
            type === 'facebook' ? styles.facebookButton : styles.googleButton,
          ]}
        >
          <FontAwesome name={type} color={COLOURS.white} size={scale(20)} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default SocialButton;
