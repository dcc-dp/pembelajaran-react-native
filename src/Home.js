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
    } catch (error) {}
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
    } catch (error) {}
  };

  return (
    <View style={{ flex: 1, padding: 0 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffff',
        }}
      >
        <View
          style={{
            width: '50%',
            height: 100,
            backgroundColor: '#fff',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ marginTop: 38, fontWeight: 'bold', fontSize: 20 }}>
            Selamat Datang 
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: '#d1d1d1ff',
            paddingHorizontal: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Tambah');
            }}
          >
            <Text>TAMBAH</Text>
          </TouchableOpacity>
        </View>
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
