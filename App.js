import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Edit from './src/Edit';
import Tambah from './src/Tambah';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="Tambah" component={Tambah} />
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
