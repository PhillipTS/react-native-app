import React from 'react';
import { Image as RNImage, ImageProps } from 'react-native';

// TODO: Scaling for tablet images
class Image extends React.PureComponent<ImageProps> {
  render() {
    return <RNImage {...this.props} />;
  }
}

export default Image;
