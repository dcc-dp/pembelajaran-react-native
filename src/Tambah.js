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
    <View style={{ flex: 1, padding: 0, backgroundColor: '#d6d5d5ff' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffff',
          width: '100%',
          height: 100,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderColor: '#777',
          borderWidth: 1,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 10 }}>
            🔙
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 30, marginTop: 30 }}>🔍</Text>
      </View>
      <View
        style={{ width: '100%', height: '30%', backgroundColor: '#d6d5d5ff' }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ margin: 20 }}
        >
          <Text>asdasdasd</Text>
        </TouchableOpacity>
        <TextInput
          style={{ backgroundColor: '#e8eaecff', margin: 10, borderRadius: 5 }}
          onChangeText={setNama}
          value="Nama"
        />
        <TextInput
          style={{ backgroundColor: '#e8eaecff', margin: 10, borderRadius: 5 }}
          onChangeText={setEmail}
          value="Email"
        />
        <TextInput
          style={{ backgroundColor: '#e8eaecff', margin: 10, borderRadius: 5 }}
          onChangeText={setPassword}
          value="Password"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#fff',
          width: '100%',
          height: '100%',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderColor: '#777',
          borderWidth: 1,
        }}
      >
        <TouchableOpacity style={{ margin: 10 }} onPress={handleSave}>
          <View
            style={{
              backgroundColor: '#8396f5ff',
              padding: 5,
              paddingHorizontal: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Text>SIMPAN</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ margin: 10 }}
        >
          <View
            style={{
              backgroundColor: '#8396f5ff',
              padding: 5,
              paddingHorizontal: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Text>KEMBALI</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Edit;
