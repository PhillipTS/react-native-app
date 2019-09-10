import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import BaseInput from './BaseInput';
import { CONTENT_WIDTH } from '../../../lib/Constants';
import { TextInputProps } from './Types';

const styles = StyleSheet.create({
  input: {
    minWidth: CONTENT_WIDTH / 2,
    fontSize: moderateScale(20),
    fontFamily: 'OrevEdge-Regular',
  },
});

function getKeyboardType(inputType: string) {
  switch (inputType) {
    case 'email': return 'email-address';
    case 'phone': return 'phone-pad';
    case 'password': default: return 'default';
  }
}

function getContentType(inputType: string) {
  switch (inputType) {
    case 'email': return 'username';
    case 'password': return 'password';
    case 'phone': return 'telephoneNumber';
    default: return 'none';
  }
}

class TextInput extends React.PureComponent<TextInputProps> {
  static defaultProps = {
    onChange: null,
    onSubmit: null,

    iconName: null,
    lines: 1,
    type: null,
  };

  render() {
    const {
      placeholder, value,
      onChange, onSubmit,
      type, lines,
      inputStyle, baseInputStyle,
      ...props
    } = this.props;

    return (
      <BaseInput inputStyle={baseInputStyle} {...props}>
        <RNTextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          textAlignVertical="center"
          onSubmitEditing={onSubmit}
          returnKeyType={onSubmit ? 'go' : null}
          secureTextEntry={type === 'password'}
          keyboardType={getKeyboardType(type)}
          textContentType={getContentType(type)}
          numberOfLines={lines}
          multiline={lines > 1}
          autoFocus={false}
        />
      </BaseInput>
    );
  }
}

export default TextInput;
