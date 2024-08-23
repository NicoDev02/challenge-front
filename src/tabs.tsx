import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/Home';
import Cart from './screens/Cart';
import Favorites from './screens/Favorites';
// import Profile from './Profile';
import HomeSVG from './assets/HomeIcon.svg';
import FavoriteSVG from './assets/FavoriteIcon.svg';
import CartSVG from './assets/CartIcn.svg';
import ProfileSVG from './assets/ProfileIcn.svg';
// import CreateProduct from './screens/CreateProduct';
import HomeStack from './navigation/stacks/HomeStack';
import {useAppSelector} from './hooks';
import apiClient from './axios';
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const {token} = useAppSelector(state => state.user);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: HomeSVG,
            tabBarActiveTintColor: '#00512D',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: CartSVG,
            tabBarActiveTintColor: '#00512D',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: FavoriteSVG,
            tabBarActiveTintColor: '#00512D',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Favorites}
          options={{
            tabBarIcon: ProfileSVG,
            tabBarActiveTintColor: '#00512D',
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
