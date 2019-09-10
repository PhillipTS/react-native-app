import React from 'react';
import Screen from '../components/Screen';
import { ScreenProps } from '../../lib/Types';

interface HomeProps extends ScreenProps {}

class Home extends React.Component<HomeProps> {
  render() {
    return (
      <Screen />
    );
  }
}

export default Home;
