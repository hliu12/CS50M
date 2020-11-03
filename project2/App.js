import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button, Settings } from 'react-native';
// Import icons from Ionicons
import Ionicons from 'react-native-vector-icons/Ionicons'
// Import navigation functionality from react-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import screens from screens folder
import SettingsScreen from './screens/SettingsScreen';
import MovieSearchScreen from './screens/MovieSearchScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';

// Creating stack and tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Represents the stack shown on the search screen
function SearchStack() {
  return (
    <Stack.Navigator 
    // This would remove the header
    // screenOptions={{
    //   header: ()=> null,
    // }} 
    initialRouteName="Movie Search">
      <Stack.Screen 
      options={{
        headerTitle: "Search",
      }} 
      name="Movie Search" 
      component={MovieSearchScreen}
      />
      <Stack.Screen 
      // This sets the header of the DetailsScreen to the movie name
      // options={({route}) => ({
      //   headerTitle: `${route.params.Title}`
      // })}
      name="Movie Details" 
      component={MovieDetailsScreen} 
      />
    </Stack.Navigator>
  )
}


// Contains the higher level navigation structure of the App
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          // Handles tab bar Icons and color
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Search') {
                iconName = 'ios-search'
              } else if (route.name === 'Settings') {
                iconName = 'ios-settings'
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />
            },
          })}
          tabBarOptions={{
            activeTintColor: '#FE7E7E',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
