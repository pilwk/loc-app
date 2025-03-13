import { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = "savedLocations"

const MainView = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const storedLocations = await AsyncStorage.getItem(STORAGE_KEY)
                if (storedLocations){
                    setLocations(JSON.parse(storedLocations))
                }
            } catch (error) {
                console.error("Failed to load locations:", error)
            }
        }
        loadLocations()
    }, [])

    useEffect(() => {
        if (!isFocused) return

        const routes = navigation.getState()?.routes
        const lastRoute = routes?.[routes.length - 1]

        if (lastRoute?.params?.newLocation){
            const newLoc = lastRoute.params.newLocation
            console.log("New location received", newLoc)

            AsyncStorage.getItem(STORAGE_KEY).then((storedLocations) => {
                const prevLocations = storedLocations ? JSON.parse(storedLocations) : []
                console.log('Previous locations from storage', prevLocations)

                const updatedLocations = [...prevLocations, newLoc]
                setLocations(updatedLocations)

                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocations)).then(() => {
                    console.log("Saved locations to storage:", updatedLocations)
                })
            })
            navigation.setParams({ newLocation: null})
        }
    }, [isFocused])

    const removeLocation = async (index) => {
        try {
            const updatedLocations = locations.filter((_, i) => i !==index)
            setLocations(updatedLocations)
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocations))
        } catch (error) {
            console.error("Failed to remove location:", error)
        }
    }

    return (
        <View>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add Location')}>
                <Text style={styles.addButtonText}>Add New Location</Text>
            </TouchableOpacity>
            <FlatList
                data={locations}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                            <Text style={styles.itemRating}>⭐ {item.rating}/5</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.mapButton}
                            onPress={() => navigation.navigate('Location on map', { locationName: item.name })}
                        >
                            <FontAwesome name="map-marker" size={26} color="#FF3B30" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => removeLocation(index)}
                        >
                            <MaterialIcons name="delete" size={24} color="#bdb8b8" />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
      },
      addButton: {
        backgroundColor: '#4a1558',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      },
      addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
      },
      itemContainer: {
        flexDirection: 'row', // Align text & button in a row
        alignItems: 'center', // Vertically center items
        justifyContent: 'space-between', // Push text left & button right
        backgroundColor: '#ffffff',
        padding: 12,
        marginBottom: 8,
        marginHorizontal: 4,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative'
      },
      textContainer: {
        flex: 1, // Allow text to take remaining space
      },
      itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      itemDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
      },
      itemRating: {
        fontSize: 14,
        color: '#ff9800',
        marginTop: 4,
        fontWeight: 'bold',
      },
      mapButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#f9fafb',
        borderRadius: 20
      }, 
      deleteButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        padding: 5,
        backgroundColor: '#f9fafb',
        borderRadius: 20
      }
    })
  

export default MainView
