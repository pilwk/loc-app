import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'

const AddLocation = ({ navigation }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')

    const saveLocation = () => {
        if (name.trim() === '') {
            Alert.alert("Missing Name", "Please enter a name for the location")
            return
        }

        const newLocation = { name, description, rating }

        navigation.reset({
            index: 0,
            routes: [{
                name: 'Locations',
                params: { newLocation }
            }]
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name of Location</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Description of Location</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} />

            <Text style={styles.label}>Rating of Location (1-5)</Text>
            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={[styles.ratingButton, rating === num && styles.selectedRating]}
                        onPress={() => setRating(num)}
                    >
                        <Text style={[styles.ratingText, rating === num && styles.selectedRatingText]}>{num}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveLocation}>
                <Text style={styles.saveButtonText}>Save location</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f9fa',
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 15,
      fontSize: 16,
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    ratingButton: {
      backgroundColor: '#e0e0e0',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginHorizontal: 4,
    },
    selectedRating: {
      backgroundColor: '#ffb528',
    },
    ratingText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    selectedRatingText: {
      color: '#fff',
    },
    saveButton: {
      backgroundColor: '#4a1558',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    saveButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
  })


export default AddLocation
