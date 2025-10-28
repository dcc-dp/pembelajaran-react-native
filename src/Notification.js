import { View, Text, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';

async function setupNotificationChannel() {
  await notifee.createChannel({
    id: 'alarm_channel',
    name: 'Alarm Notifications',
    importance: 4,
    sound: 'default',
  });
}
const Notification = () => {
  const [toggle, setToggle] = useState(false); //Menyimpan status ON/OFF alarm
  const [date, setDate] = useState(new Date()); //Menyimpan waktu alarm yang dipilih user
  const [showPicker, setShowPicker] = useState(false); //Menentukan apakah tampilan jam ditampilkan di layar

  // bagian 2
  useEffect(() => {
    setupNotificationChannel();
  }, []);

  // bagian 3 mengatur waktu alarm
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowPicker(false);
    setToggle(false);
    notifee.cancelAllNotifications();
  };

  // bagian 4
  const showTimePicker = () => {
    setShowPicker(true);
  };

  // bagian 5
  const scheduleAlarmNotification = async () => {
    try {
      await notifee.requestPermission();
      const alarmTime = date.getTime();
      let timestamp = alarmTime;
      if (alarmTime < Date.now()) {
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        timestamp = tomorrow.getTime();
      }
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: timestamp,
        alarmManager: {
          allowWhileIdle: true,
        },
      };
      await notifee.createTriggerNotification(
        {
          title: 'Waktunya Alarm! ⏰',
          body: `Alarm berbunyi pada ${date.toLocaleTimeString().slice(0, 5)}`,
          android: {
            channelId: 'alarm_channel',
            smallIcon: 'ic_launcher',
            pressAction: {
              id: 'default',
              launchActivity: 'default',
            },
            importance: AndroidImportance.HIGH,
          },
        },
        trigger,
      );

      Alert.alert(
        'Alarm Dijadwalkan!',
        `Alarm akan berbunyi pada ${date
          .toLocaleTimeString()
          .slice(0, 5)}. Anda bisa menutup aplikasi ini.`,
      );
    } catch (error) {
      // ERROR HANDLING
      console.error('Error scheduling alarm:', error);
      Alert.alert(
        'Error',
        `Gagal menjadwalkan alarm: ${error.message || 'Unknown error'}`,
      );
    }
  };

  // bagian 6
  const cancelAllScheduledNotifications = async () => {
    try {
      // Batalkan semua notifikasi terjadwal
      await notifee.cancelAllNotifications();

      // Konfirmasi ke user
      Alert.alert(
        'Berhasil!',
        'Semua notifikasi dan alarm terjadwal Notifee telah dibatalkan.',
      );
    } catch (error) {
      // Error handling
      console.error('Error canceling notifications:', error);
      Alert.alert(
        'Error',
        `Gagal membatalkan alarm: ${error.message || 'Unknown error'}`,
      );
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          onPress={showTimePicker}
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Tambah</Text>
        </TouchableOpacity>
        <View
          style={{
            elevation: 5,
            backgroundColor: 'white',
            padding: 20,
            marginTop: 20,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: '400', marginLeft: 14 }}>
            {date.toLocaleTimeString().slice(0, 5)}{' '}
          </Text>
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'time'}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              if (!toggle) {
                scheduleAlarmNotification();
              } else {
                cancelAllScheduledNotifications();
              }
              setToggle(!toggle);
            }}
            style={{
              height: 30,
              width: 80,
              backgroundColor: toggle ? 'blue' : 'grey',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: toggle ? 'flex-end' : 'flex-start',
            }}
          >
            <View
              style={{
                height: 26,
                width: 26,
                backgroundColor: 'white',
                borderRadius: 15,
                marginLeft: 5,
                marginRight: 5,
              }}
            ></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Notification;
