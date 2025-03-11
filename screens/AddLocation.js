import { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native';

const AddLocation = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const saveLocation = () => {
    // Save the location data (could be saved to state or a database)
    navigation.goBack();
  };

  return (
    <View>
      <Text>Name of Location</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Description of Location</Text>
      <TextInput value={description} onChangeText={setDescription} />
      <Text>Rating of Location (1-5)</Text>
      <TextInput value={rating} onChangeText={setRating} keyboardType="numeric" />
      <Button title="Save Location" onPress={saveLocation} />
    </View>
  );
};

export default AddLocation;
