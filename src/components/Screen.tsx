import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { scale } from 'react-native-size-matters';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOURS, CONTENT_WIDTH, CONTENT_HEIGHT, DEFAULT_LOADING_STATE } from '../../lib/Constants';
import { Style, AppState } from '../../lib/Types';

const styles = StyleSheet.create({
  screenContainer: { flex: 1, alignItems: 'center' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeContainer: {
    paddingTop: getStatusBarHeight(),
    paddingBottom: getBottomSpace() + scale(15),
    width: CONTENT_WIDTH,
    height: CONTENT_HEIGHT,
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#F5FCFF88',
    zIndex: 20,
  },
});

interface ScreenProps {
  children?: React.ReactNode | [React.ReactNode];

  colours?: string[] | string;
  safeView?: boolean;

  style?: Style;
  contentStyle?: Style;

  loading: boolean;
}

class Screen extends React.PureComponent<ScreenProps> {
  static defaultProps: ScreenProps = {
    colours: [COLOURS.primary, COLOURS.secondary],
    safeView: true,
    loading: DEFAULT_LOADING_STATE['loading'],
  };

  render() {
    const {
      children,
      colours, safeView,
      style, contentStyle,
      loading,
    } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={typeof colours === 'string' ? [colours, colours] : colours}
        style={[styles.screenContainer, style]}
        pointerEvents={loading ? 'none' : null}
      >
        {loading && (
          <View style={styles.modal}>
            <ActivityIndicator size="large"  />
          </View>
        )}
        <View style={[styles.container, safeView ? styles.safeContainer : null, contentStyle]}>
          {children}
        </View>
      </LinearGradient>
    );
  }
}

export default connect<{}, {}, ScreenProps>(
  (state: AppState) => ({ loading: state.loading.loading }),
)(Screen);
