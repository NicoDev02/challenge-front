import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from '../../screens/Cart';
import Favorites from '../../screens/Favorites';
import HomeSVG from '../../assets/HomeIcon.svg';
import FavoriteSVG from '../../assets/FavoriteIcon.svg';
import CartSVG from '../../assets/CartIcn.svg';
import ProfileSVG from '../../assets/ProfileIcn.svg';
import HomeScreen from '../../screens/Home';
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
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
  );
}
