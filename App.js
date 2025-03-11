import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainView from './screens/MainView';
import AddLocation from './screens/AddLocation';
import MapView from './screens/MapView';

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='MainView'>
                <Stack.Screen name='MainView' component={MainView} />
                <Stack.Screen name='AddLocation' component={AddLocation} />
                <Stack.Screen name='Map' component={MapView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}