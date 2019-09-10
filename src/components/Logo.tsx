import React from 'react';
import { View } from 'react-native';
import { Icon } from '../../assets';
import Image from './Image';
import { Style } from '../../lib/Types';

interface LogoProps {
  style?: Style;
  imageStyle?: Style;
}

class Logo extends React.PureComponent<LogoProps> {
  render() {
    const { style, imageStyle } = this.props;
    return <View style={style}><Image style={imageStyle} source={Icon} /></View>;
  }
}

export default Logo;
