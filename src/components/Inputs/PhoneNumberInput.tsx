import React from 'react';
import { StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import { MaterialIcons } from '@expo/vector-icons';
import BaseInput from './BaseInput';
import { PhoneNumberInputProps } from './Types';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLOURS, CONTENT_WIDTH } from '../../../lib/Constants';

const styles = StyleSheet.create({
  container: { marginHorizontal: scale(20) },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: COLOURS.black,
    fontSize: moderateScale(20),
    fontFamily: 'OrevEdge-Regular',
  },
  input: { maxWidth: CONTENT_WIDTH / 1.5 },
});

class PhoneNumberInput extends React.Component<PhoneNumberInputProps> {
  constructor(props: PhoneNumberInputProps) {
    super(props);

    this.phone = null;

    this.setCountryCode = this.setCountryCode.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
  }

  phone: PhoneInput;

  onChangePhoneNumber(number: string) {
    const { onChange } = this.props;
    onChange(number.toString());
  }

  setCountryCode() {
    const { onChangeCountryCode } = this.props;
    const countryCode = this.phone.getCountryCode();
    onChangeCountryCode(countryCode);
  }

  isValid = () : boolean => this.phone ? this.phone.isValidNumber() : false;

  render() {
    const { style, value, placeholder, ...props } = this.props;

    const isValid = this.isValid();

    return (
      <BaseInput style={[styles.container, style]} inputStyle={styles.inputContainer} {...props}>
        <PhoneInput
          ref={(ref: PhoneInput) => { this.phone = ref; }}
          style={styles.input}
          textProps={{ placeholder }}
          textStyle={styles.text}
          initialCountry="au"
          value={value}
          onSelectCountry={this.setCountryCode}
          onChangePhoneNumber={this.onChangePhoneNumber}
          autoFormat
        />

        <MaterialIcons
          name={isValid ? 'check' : 'close'}
          size={scale(30)}
          color={isValid ? 'green' : 'black'}
        />
      </BaseInput>
    );
  }
}

export default PhoneNumberInput;
