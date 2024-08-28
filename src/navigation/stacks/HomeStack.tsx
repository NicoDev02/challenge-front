import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetailScreen from '../../screens/ProductDetail';
import {HomeStackParamList} from './types';
import AppNavigator from '../tabs/tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '../../hooks';
import apiClient from '../../axios';
import CreateProductScreen from '../../screens/CreateProduct';
import EditProductScreen from '../../screens/EditProduct';

const HomeStack = () => {
  const {token} = useAppSelector(state => state.user);
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={AppNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateProduct"
          component={CreateProductScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProductScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
