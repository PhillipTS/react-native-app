import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';
import { Style } from '../../lib/Types';
import { COLOURS } from '../../lib/Constants';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    marginVertical: scale(5),
    paddingHorizontal: scale(5),
    borderRadius: 12,
    backgroundColor: COLOURS.white,
    elevation: 5,
    shadowColor: COLOURS.black,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(50),
  },
  input: { minWidth: scale(150) },
  icon: { margin: scale(10) },
});

const Icon = (IconComponent: any, name: string) => (
  <View style={styles.icon}>
    <IconComponent name={name} size={scale(25)} color={COLOURS.primary} />
  </View>
);

function getIcon(iconName: string) {
  switch (iconName) {
    case 'email': return () => Icon(MaterialIcons, 'email');
    case 'password': return () => Icon(MaterialIcons, 'lock');
    default: return null;
  }
}

function getKeyboardType(inputType: string) {
  switch (inputType) {
    case 'email': return 'email-address';
    case 'password': default: return 'default';
  }
}

function getContentType(inputType: string) {
  switch (inputType) {
    case 'email': return 'username';
    case 'password': return 'password';
    default: return 'none';
  }
}

interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  iconName?: string;
  type?: string;
  style?: Style;
}

class TextInput extends React.PureComponent<TextInputProps> {
  static defaultProps = {
    placeholder: '',
    value: '',

    onChange: null,
    onSubmit: null,

    iconName: null,
    type: null,

    style: null,
  };

  render() {
    const {
      placeholder, value,
      onChange, onSubmit,
      iconName, type,
      style,
    } = this.props;

    const InLineIcon = getIcon(iconName);

    return (
      <View style={[styles.container, style]}>
        <View style={styles.inputContainer}>
          {InLineIcon && <InLineIcon />}
          <RNTextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
            returnKeyType={onSubmit ? 'go' : null}
            secureTextEntry={type === 'password'}
            keyboardType={getKeyboardType(type)}
            textContentType={getContentType(type)}
          />
        </View>
      </View>
    );
  }
}

export default TextInput;
