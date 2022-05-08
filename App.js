
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KorisnikScreen from './app/screens/KorisnikScreen';
import AdminScreen from './app/screens/AdminScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignupScreen';
import DodavanjeKorisnika from './app/screens/DodavanjeKorisnikaScreen';
import ListaKorisnikaScreen from './app/screens/ListaKorisnikaScreen';
import KorisnkEditScreen from './app/screens/KorisnikEditScreen';
import KorisnikSifra from './app/screens/KorisnikSifra';
import AdminSScreen from './app/screens/AdminSScreen';
import ListaProizvodaScreen from './app/screens/ListaProizvodaScreen';
import DodavanjePoslovnicaScreen from './app/screens/DodavanjePoslovnicaScreen';
import UvodjenjeProizvodaUPoslovniceScreen from './app/screens/UvodjenjeProizvodaUPoslovniceScreen';
import ListaPoslovnicaScreen from './app/screens/ListaPoslovnicaScreen'
import {Provider as AuthProvider} from './app/context/AuthContext';
import { navigationRef } from './app/RootNavigation';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{contentStyle:{backgroundColor: 'transparent'},headerShown: false}}>
      
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Korisnik" component={KorisnikScreen} />

        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Dodaj" component={DodavanjeKorisnika} />

        <Stack.Screen name="ListaK" component={ListaKorisnikaScreen} />
        <Stack.Screen name="KorisnikEdit" component={KorisnkEditScreen} />
        <Stack.Screen name="KorisnikS" component={KorisnikSifra} />

        <Stack.Screen name="AdminS" component={AdminSScreen} />
        <Stack.Screen name="ListaP" component={ListaProizvodaScreen} />

        <Stack.Screen name="PoslovnicaDodaj" component={DodavanjePoslovnicaScreen} />
        <Stack.Screen name="PoslovnicaDodajProizvod" component={UvodjenjeProizvodaUPoslovniceScreen} />

        <Stack.Screen name="ListaPoslovnica" component={ListaPoslovnicaScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ()=>{

  return(

    <AuthProvider>

      <App/>

    </AuthProvider>

  )

};