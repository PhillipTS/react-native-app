import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Text from '../Text';
import { COLOURS } from '../../../lib/Constants';
import { Style } from '../../../lib/Types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: COLOURS.primary,
    fontSize: moderateScale(22),
  },
});

interface ButtonProps {
  onPress?: () => void;
  label: string;
  title?: boolean;
  leftInlineIcon?: React.ReactNode;
  rightInlineIcon?: React.ReactNode;
  style?: Style;
  textStyle?: Style;
}

class Button extends React.PureComponent<ButtonProps> {
  static defaultProps = {
    onPress: null,
    title: false,
    style: {},
    textStyle: {},
  };

  render () {
    const {
      onPress, label, title,
      leftInlineIcon, rightInlineIcon,
      style, textStyle,
    } = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        {leftInlineIcon}
        <Text title={title} style={{ ...styles.text, ...textStyle }}>{label}</Text>
        {rightInlineIcon}
      </TouchableOpacity>
    );
  }
}

export default Button;
