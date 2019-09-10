import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import BaseInput from './BaseInput';
import { DigitInputProps } from './Types';

const styles = StyleSheet.create({
  container: {
    height: scale(70),
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: moderateScale(24),
  },
});

class DigitInput extends React.PureComponent<DigitInputProps> {
  constructor(props: DigitInputProps) {
    super(props);

    this.textInputRef = null;
  }

  textInputRef: RNTextInput;

  focus() {
    if (this.textInputRef) { this.textInputRef.focus(); }
  }

  render() {
    const { value, onChange, ...props } = this.props;
    return (
      <BaseInput style={styles.container} {...props}>
        <RNTextInput
          ref={(ref: RNTextInput) => { this.textInputRef = ref; }}
          style={styles.input}
          value={value}
          onChangeText={onChange}
          keyboardType="number-pad"
          selectTextOnFocus
          maxLength={1}
          secureTextEntry
        />
    </BaseInput>
    );
  }
}

export default DigitInput;
