import { useState } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainView = () => {
  const navigation = useNavigation();
  const [locations, setLocations] = useState([]);

  return (
    <View>
      <Button
        title="Add New Location"
        onPress={() => navigation.navigate('AddLocation')}
      />
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <Text onPress={() => navigation.navigate('Map', { locationName: item.name })}>
            {item.name}
          </Text>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default MainView;
