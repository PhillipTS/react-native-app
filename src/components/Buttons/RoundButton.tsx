import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import Text from '../Text';
import { COLOURS } from '../../../lib/Constants';

const getStyles = (active: boolean, size: number) => {
  const containerSize = size * 1.5;

  return StyleSheet.create({
    container: {
      width: containerSize,
      height: containerSize,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: active ? COLOURS.white : COLOURS.primary,
      borderWidth: 2,
      borderColor: COLOURS.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelText: {
      textAlign: 'center',
      marginTop: 5,
    },
  });
};

interface RoundButtonProps {
  onPress: () => void;
  active: boolean;
  label?: string;
  size?: number;
  iconName: string;
}

class RoundButton extends React.PureComponent<RoundButtonProps> {
  static defaultProps = {
    label: null,
    size: scale(60),
  };

  render() {
    const { onPress, active, label, size, iconName } = this.props;

    const styles = getStyles(active, size);

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <Feather
            name={iconName}
            size={size / 2}
            color={active ? COLOURS.primary : COLOURS.white}
          />
        </TouchableOpacity>
        {label && <Text style={styles.labelText}>{label}</Text>}
      </View>
    );
  }
}

export default RoundButton;
