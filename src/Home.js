import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { BASE_URL } from '../env';

function Home() {
  const [datas, setDatas] = useState([]);
  const navigation = useNavigation();

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/crud_api/api/users/read.php`,
      );
      setDatas(response.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();

      return () => {};
    }, []),
  );

  const hapus = async id => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/crud_api/api/users/delete.php`,
        {
          data: {
            id: id,
          },
        },
      );

      fetchUser();
      if (response.data.status === 'success') {
        Alert.alert('Berhasil', 'Data berhasil dihapus');
      }
      console.log('hapus: ', response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Tambah');
          }}
        >
          <Text>TAMBAH</Text>
        </TouchableOpacity>
      </View>
      {datas.map((item, index) => {
        return (
          <ScrollView key={index}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ margin: 10 }}>
                <Text>{item.nama}</Text>
                <Text>{item.email}</Text>
              </View>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: '#f5f500',
                  padding: 13,
                }}
                onPress={() => {
                  navigation.navigate('Edit', { dataUser: item });
                }}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: '#f5f500',
                  padding: 13,
                }}
                onPress={() => {
                  hapus(item.id);
                }}
              >
                <Text>Hapus</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );
      })}
    </View>
  );
}
export default Home;
