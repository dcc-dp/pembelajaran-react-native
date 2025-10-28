import React, { use, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './src/SplashScreen'; // tambahkan
import Home from './src/Home';
import Edit from './src/Edit';
import Tambah from './src/Tambah';
import notifee, {
  AndroidStyle,
  RepeatFrequency,
  TriggerType,
} from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import Notification from './src/Notification';

const Stack = createNativeStackNavigator();
// async function scheduleDailyNotification(hour, minute) {
//   // Tentukan waktu notifikasi
//   const now = new Date();
//   const date = new Date(now);
//   date.setHours(hour);
//   date.setMinutes(minute);
//   date.setSeconds(0);

//   // Kalau sudah lewat jamnya hari ini, jadwalkan besok
//   if (date.getTime() < now.getTime()) {
//     date.setDate(date.getDate() + 1);
//   }

//   const trigger = {
//     type: TriggerType.TIMESTAMP,
//     timestamp: date.getTime(),
//     repeatFrequency: RepeatFrequency.DAILY,
//     alarmManager: true,
//   };

//   await notifee.createTriggerNotification(
//     {
//       title: 'Pengingat Belajar 🚀',
//       body: 'Sekarang waktunya belajar React Native!',
//       android: {
//         channelId: 'default',
//         pressAction: {
//           id: 'default',
//         },
//         style: {
//           type: AndroidStyle.BIGPICTURE,
//           picture: require('./src/assets/download.jpg'), // Ganti dengan path gambarmu
//         },
//       },
//     },
//     trigger,
//   );

//   console.log('✅ Notifikasi dijadwalkan untuk:', date.toLocaleString());
// }
function RootStack() {
  // useEffect(() => {
  //   console.log('🚀 Aplikasi dimulai');

  //   async function setupNotifications() {
  //     try {
  //       // Minta izin di Android 13+
  //       if (Platform.OS === 'android' && Platform.Version >= 33) {
  //         await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //         );
  //       }

  //       const settings = await notifee.requestPermission();
  //       console.log('📋 Status izin notifikasi:', settings.authorizationStatus);

  //       // Buat channel notifikasi
  //       await notifee.createChannel({
  //         id: 'default',
  //         name: 'Default Channel',
  //         importance: 4,
  //       });
  //       const date = new Date(Date.now() + 15000); // 15 detik dari sekarang
  //       await scheduleDailyNotification(date.getHours(), date.getMinutes());
  //     } catch (error) {
  //       console.log('❌ Error setupNotifications:', error);
  //     }
  //   }
  //   setupNotifications();
  // }, []);

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="Tambah" component={Tambah} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
