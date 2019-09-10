import React from 'react';
import { TouchableOpacity, Picker, StyleSheet, Platform } from 'react-native';
import BaseInput from './BaseInput';
import Modal from '../Modal';
import Text from '../Text';
import { SelectInputProps, SelectInputState } from './Types';

const styles = StyleSheet.create({ inputContainerAndroid: { } });

class SelectInput extends React.PureComponent<SelectInputProps, SelectInputState> {
  constructor(props: SelectInputProps) {
    super(props);
    this.state = { modalOpen: false };
  }

  static defaultProps = {
    onChange: null,
    onSubmit: null,

    options: [],

    iconName: null,
    type: null,
  };

  onOpenModal = () => this.setState({ modalOpen: true });

  onCloseModal = () => this.setState({ modalOpen: false });

  render() {
    const {
      placeholder, value,
      onChange, onSubmit,
      options, ...props
    } = this.props;
    const { modalOpen } = this.state;

    const CommonInput = (
      <Picker mode="dialog" selectedValue={value} onValueChange={onChange}>
        {options.map((option: string) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    );

    return Platform.OS === 'ios' ? [
      (
        <Modal key="Select Modal" visible={modalOpen} onRequestClose={this.onCloseModal}>
          {CommonInput}
        </Modal>
      ),
      (
        <TouchableOpacity key="Input" onPress={this.onOpenModal}>
          <BaseInput {...props}>
            <Text>{value}</Text>
          </BaseInput>
        </TouchableOpacity>
      ),
    ] : <BaseInput inputStyle={styles.inputContainerAndroid} {...props}>{CommonInput}</BaseInput>;
  }
}

export default SelectInput;
