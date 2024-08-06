// App.js
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/HomeScreen";
import FormScreen from "./src/screens/FormScreen";
import ProfilInstansi from "./src/screens/ProfilInstansi";
import LoginScreen from "./src/screens/LoginScreen";
import RegistrasiScreen from "./src/screens/RegistrasiScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ headerTitleAlign: 'center' }} >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Buat Pengaduan" component={FormScreen} options={{ headerTitleAlign: 'center' }}/>
        <Stack.Screen name="Profil Instansi" component={ProfilInstansi} />
        <Stack.Screen name="Registrasi" component={RegistrasiScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
