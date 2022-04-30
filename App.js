
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KorisnikScreen from './app/screens/KorisnikScreen';
import AdminScreen from './app/screens/AdminScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignupScreen';
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