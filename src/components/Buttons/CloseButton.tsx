import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLOURS } from '../../../lib/Constants';
import { Style } from '../../../lib/Types';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: scale(20),
    right: scale(20),
    zIndex: 10,
  },
});

interface CloseButtonProps {
  onPress: () => void;
  size?: number;
  style?: Style;
  colour?: string;
}

class CloseButton extends React.PureComponent<CloseButtonProps> {
  static defaultProps = {
    size: 40,
    colour: COLOURS.black,
  };

  render() {
    const { size, onPress, style, colour } = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <MaterialCommunityIcons name="close" size={scale(size)} color={colour} />
      </TouchableOpacity>
    );
  }
}

export default CloseButton;
