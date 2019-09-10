import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import { COLOURS, CONTENT_WIDTH } from '../../../lib/Constants';
import { Style } from '../../../lib/Types';
import { scale, moderateScale } from 'react-native-size-matters';

const labelHeight = scale(20);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  label: {
    position: 'absolute',
    top: -(labelHeight / 2),
    left: scale(10),
    height: labelHeight,
    paddingHorizontal: scale(2),
    backgroundColor: COLOURS.white,
    alignItems: 'center',
  },
  labelText: {
    fontSize: moderateScale(16),
    color: COLOURS.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  divider: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: CONTENT_WIDTH - scale(2),
    height: 1,
    backgroundColor: COLOURS.secondary,
  },
});

interface StyledContainerProps {
  label?: string;
  style?: Style;
  dividerStyle?: Style;
}

class StyledContainer extends React.PureComponent<StyledContainerProps> {
  render() {
    const { label, children, style, dividerStyle } = this.props;

    return (
      <View style={[styles.container, style]}>
        {label && <View style={styles.label}><Text style={styles.labelText}>{label}</Text></View>}
        {Array.isArray(children) ? children.map((child: React.ReactChild, i: number) => (
          i !== 0 ? (
            <View key={i}>
              <View style={[styles.divider, dividerStyle]} />
              {child}
            </View>
          ) : child
        )) : children}
      </View>
    );
  }
}

export default StyledContainer;
