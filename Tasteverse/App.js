import React, { useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import HomeScreen from './screens/Homepage';
import DetailsScreen from './screens/RecipeDetails';
import Favourites from './screens/Favourites';
import CategoryFavourites from './screens/CategoryFavourites';
import Settings from './screens/Settings';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false, 
}

const BottomTab = () => {
  return(
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name='HomeTab' component={HomeScreen} />
      <Tab.Screen name='FavouritesTab' component={Favourites} />
      <Tab.Screen name='SettingsTab' component={Settings} />
    </Tab.Navigator>
  )
}


export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false}}
        initialRouteName='Login'
      >
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name='HomePage' component={BottomTab} />
        <Stack.Screen name='RecipeDetail' component={DetailsScreen} />
        <Stack.Screen name="CategoryFavouritesScreen" component={CategoryFavourites} options={{headerShown: true, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}







