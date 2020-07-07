import React from 'react';
import { StatusBar } from 'react-native';
import { InputName, Home, Game, Finish, Creator } from './screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PlayNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Input Name" component={InputName} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="Finish" component={Finish} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
          tabBarOptions={{
            activeTintColor: '#4856fe',
          }}>
          <Tab.Screen
            name="Home"
            component={PlayNavigator}
            options={{
              tabBarLabel: 'Play',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="gamepad-square"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Creator"
            component={Creator}
            options={{
              tabBarLabel: 'Creator',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
