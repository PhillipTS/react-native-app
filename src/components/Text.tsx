import React from 'react';
import { Text as RNText, StyleSheet, StyleProp } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const getStyles = (title: boolean) => StyleSheet.create({
  text: {
    fontSize: moderateScale(title ? 32 : 16),
    fontWeight: title ? 'bold' : 'normal',
    textAlign: 'center',
  },
});

type TextProps = {
  title?: boolean;
  children: string;
  style?: StyleProp<any>;
};

class Text extends React.PureComponent<TextProps> {
  static defaultProps = {
    title: false,
  };

  render() {
    const { title, children, style, ...props } = this.props;

    const styles = getStyles(title);

    return <RNText style={[styles.text, style]} {...props}>{children}</RNText>;
  }
}

export default Text;
