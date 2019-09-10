import React from 'react';
import { Switch, Platform } from 'react-native';
import { SwitchInputProps } from './Types';
import { COLOURS } from '../../../lib/Constants';

class SwitchInput extends React.PureComponent<SwitchInputProps> {
  render() {
    const { value, onChange, disabled } = this.props;
    return (
      <Switch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ true: COLOURS.primary, false: null }}
        thumbColor={Platform.select({ ios: null, android: COLOURS.white })}
      />
    );
  }
}

export default SwitchInput;
