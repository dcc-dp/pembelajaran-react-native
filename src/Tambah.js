import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../env';

function Edit() {
  const navigation = useNavigation();

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/crud_api/api/users/create.php`,
        {
          nama: nama,
          email: email,
          password: password,
        },
      );
      if (response.data.status === 'success') {
        Alert.alert('Berhasil');
        navigation.goBack();
      }
    } catch (error) {}
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ margin: 20 }}
      >
        <Text>asdasdasd</Text>
      </TouchableOpacity>
      <TextInput
        style={{ backgroundColor: 'yellow', margin: 10 }}
        onChangeText={setNama}
      />
      <TextInput
        style={{ backgroundColor: 'yellow', margin: 10 }}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ backgroundColor: 'yellow', margin: 10 }}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={{ margin: 10 }} onPress={handleSave}>
        <Text>SIMPAN</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Edit;
