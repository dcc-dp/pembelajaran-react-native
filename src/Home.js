import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { BASE_URL } from '../env';

function Home() {
  const [datas, setDatas] = useState(null);
  const navigation = useNavigation();

  const fetchUser = async () => {};

  useFocusEffect(
    useCallback(() => {
      fetchUser();

      return () => {};
    }, []),
  );

  const hapus = async () => {};

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
                <Text>NAMA</Text>
                <Text>EMAIL</Text>
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
