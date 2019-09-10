import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { Octicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Text from '../Text';
import { COLOURS } from '../../../lib/Constants';
import { BaseInputProps } from './Types';

const minSize = scale(50);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: minSize,
    minWidth: minSize,
    marginVertical: scale(5),
    padding: scale(10),
    borderRadius: moderateScale(6),
  },
  rowContainer: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { marginRight: scale(10), alignItems: 'flex-start' },
  labelText: { color: '#969FA2', fontSize: moderateScale(16) },
});

const Icon = (IconComponent: React.ComponentClass<any>, name: string) => (
  <View style={styles.iconContainer}>
    <IconComponent name={name} color={COLOURS.primary} size={scale(25)} />
  </View>
);

function getIcon(iconName: string) {
  switch (iconName) {
    case 'email': return () => Icon(Octicons, 'mail');
    case 'password': return () => Icon(MaterialIcons, 'lock-outline');
    case 'user': return () => Icon(AntDesign, 'user');
    default: return null;
  }
}

class BaseInput extends React.PureComponent<BaseInputProps> {
  static defaultProps = {
    onChange: null,
    onSubmit: null,

    iconName: null,
    type: null,
  };

  render() {
    const { children, label, iconName, style, inputStyle } = this.props;

    const InLineIcon = getIcon(iconName);

    return (
      <View style={[styles.container, style]}>
        {label && <Text style={styles.labelText}>{label}</Text>}
        <View style={inputStyle || styles.rowContainer}>
          {InLineIcon && <InLineIcon />}
          {children}
        </View>
      </View>
    );
  }
}

export default BaseInput;
