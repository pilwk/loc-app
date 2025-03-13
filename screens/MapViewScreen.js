import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'


const MapViewScreen = ({ route }) => {
    const { locationName } = route.params
    const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 })
    const [loading, setLoading] = useState(true)
    //fallback coordinates set to Oulu
    const fallBack = { latitude: 65.0121, longitude: 25.4651 }

    useEffect(() => {
        const getCoordinates = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync()
                console.log("Permission status:",status)
                if (status !== 'granted') {
                    Alert.alert("Permission Denied", "Location permissions is required to fetch coordinates.")
                    setCoordinates(fallBack)
                    setLoading(false)
                    return
                }

                if (!locationName || locationName.trim() === ''){
                    console.log("Invalid location name.")
                    setLoading(false)
                    return
                }

                console.log("Fetching geocode for:", locationName)

                const geocodeResult = await Location.geocodeAsync(locationName)
                if (geocodeResult.length > 0) {
                    setCoordinates({
                        latitude: geocodeResult[0].latitude,
                        longitude: geocodeResult[0].longitude
                    })
                    console.log('Location found:',geocodeResult[0])
                } else {
                    console.log('Location not found')
                    setCoordinates(fallBack)
                }
            } catch (error) {
                console.error(error)
                setCoordinates(fallBack)
            } finally {
                setLoading(false)
            }
        }

        getCoordinates()
    }, [locationName])

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading map...</Text>
            </View>
        )
    }

    return (
        <MapView 
            style={styles.map}
            region={{ 
                latitude: coordinates.latitude, 
                longitude: coordinates.longitude,
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MapViewScreen
