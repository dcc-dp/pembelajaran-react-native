import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../env';

function Edit() {
  const navigation = useNavigation();
  const route = useRoute();
  const { dataUser } = route.params;
  console.log(dataUser);

  const [nama, setNama] = useState(dataUser.nama);
  const [email, setEmail] = useState(dataUser.email);

  const handleSave = async () => {};

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ margin: 20 }}
        >
          <Text>asdasdasd</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: -5 }}>
        <TextInput
          value={nama}
          onChangeText={setNama}
          style={{ backgroundColor: 'yellow', margin: 10 }}
        ></TextInput>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={{ backgroundColor: 'yellow', margin: 10 }}
        ></TextInput>
        <TouchableOpacity style={{ margin: 10 }}>
          <Text>SIMPAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Edit;
