// screens/MapView.js
import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { MapView, Marker } from 'react-native-maps'

const MapViewScreen = ({ route }) => {
    const { locationName } = route.params
    const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 })

    // Function to calculate geolocation coordinates by location name
    useEffect(() => {
        // Replace with actual geolocation calculation
        // Example: Use a geocoding API like Google Maps Geocoding API
        setCoordinates({ latitude: 37.7749, longitude: -122.4194 }) // Example coordinates
    }, [locationName])

    return (
        <MapView 
            style={styles.map}
            region={{ 
                ...coordinates, 
                latitudeDelta: 0.0922, 
                longitudeDelta: 0.0421 
            }}
        >
            <Marker coordinate={coordinates} title={locationName} />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})

export default MapViewScreen;
