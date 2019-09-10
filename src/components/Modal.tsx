import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal as RNModal,
  StyleSheet,
  StyleProp,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  modal: {
    margin: scale(40),
    padding: scale(20),
    borderRadius: 16,
  },
  fullscreenModal: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  modalCloseButton: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    borderRadius: 20,
  },
  fullscreenModalCloseButton: {
    position: 'absolute',
    top: scale(60),
    right: scale(20),
    borderRadius: 20,
    zIndex: 5,
  },
});

interface ModalProps {
  visible: boolean;
  childern?: React.ReactNode;
  onRequestClose: () => void;
  fullscreen?: boolean;
  containerStyle?: StyleProp<any>;
}

class Modal extends React.PureComponent<ModalProps> {
  static defaultProps = {
    fullscreen: false,
    children: null,
    containerStyle: null,
  };

  render() {
    const {
      visible, children, onRequestClose, fullscreen, containerStyle,
    } = this.props;

    return (
      <RNModal visible={visible} onRequestClose={onRequestClose} transparent animationType="slide">
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRequestClose}
          style={styles.modalContainer}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={null}
            style={[fullscreen ? styles.fullscreenModal : styles.modal, containerStyle]}
          >
            <View style={fullscreen ? styles.fullscreenModalCloseButton : styles.modalCloseButton}>
              <MaterialIcons.Button
                name="close"
                color="white"
                size={scale(40)}
                borderRadius={100}
                activeOpacity={0.8}
                underlayColor="#ffffff33"
                backgroundColor="transparent"
                onPress={onRequestClose}
                accessibilityComponentType="button"
                accessibilityHint="Back"
                accessibilityLabel="Label"
              />
            </View>

            {children}

          </TouchableOpacity>
        </TouchableOpacity>
      </RNModal>
    );
  }
}

export default Modal;
