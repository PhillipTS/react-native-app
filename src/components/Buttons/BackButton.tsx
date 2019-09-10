import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { COLOURS } from '../../../lib/Constants';
import STRINGS from '../../../lib/Strings';

const Strings = STRINGS.Common;

const styles = StyleSheet.create({
  icon: { marginHorizontal: scale(5) },
});

interface BackButtonProps {
  onPress: () => void;
  label?: string;
  colour?: string;
}

class BackButton extends React.PureComponent<BackButtonProps> {
  static defaultProps = {
    label: Strings.backButtonLabel,
    colour: COLOURS.white,
  };

  render() {
    const { onPress, label, colour } = this.props;
    return (
      <Button
        textStyle={{ color: colour }}
        label={label}
        onPress={onPress}
        leftInlineIcon={(
          <Ionicons
            style={styles.icon}
            name="ios-arrow-back"
            color={colour}
            size={scale(30)}
          />
        )}
      />
    );
  }
}

export default BackButton;
