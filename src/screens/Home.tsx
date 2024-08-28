import React from 'react';
import Home from '../components/home';
import {HomeScreenProps} from './types';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return <Home navigation={navigation} />;
};

export default HomeScreen;
