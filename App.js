import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainView from './screens/MainView';
import AddLocation from './screens/AddLocation';
import MapViewScreen from './screens/MapViewScreen';

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Locations'>
                <Stack.Screen name='Locations' component={MainView} />
                <Stack.Screen name='Add Location' component={AddLocation} />
                <Stack.Screen name='Location on map' component={MapViewScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}