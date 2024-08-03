import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';

import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import HomeScreen from './screens/Homepage';


const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      {/* <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} /> */}
      {/* <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} /> */}
      <AuthStack.Screen name='HomePage' component={HomeScreen} options={{headerShown: false}}/>
    </AuthStack.Navigator>
  );
}

// function HomeNavigator() {
//   return (
//     <MainStack.Navigator>
//       <MainStack.Screen name="HomePage" component={HomeScreen} />
//       {/* <MainStack.Screen name="RecipeList" component={RecipeListScreen} /> */}
//       {/* <MainStack.Screen name="RecipeDetail" component={RecipeDetailScreen} /> */}
//       {/* <MainStack.Screen name="SearchResults" component={SearchResultsScreen} /> */}
//     </MainStack.Navigator>
//   );
// }


// function AppNavigator() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeNavigator} />
//       {/* <Tab.Screen name="Favorites" component={FavoritesScreen} /> */}
//       {/* <Tab.Screen name="AddRecipe" component={AddRecipeScreen} /> */}
//       {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
//       {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
//     </Tab.Navigator>
//   );
// }

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthNavigator/>
      </NavigationContainer>
    </PaperProvider>
  );
}


