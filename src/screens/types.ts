import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../navigation/stacks/types';

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};
