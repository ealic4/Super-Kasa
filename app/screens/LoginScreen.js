import React, { useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {TextInput} from 'react-native-paper';
import { Context as AuthContext } from '../context/AuthContext'


function LoginScreen({ navigation }){

  const {state, signin, clearErrorMessage} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      clearErrorMessage()
    }, [])
  );

  return (

    <SafeAreaView style={styles.container}>

      <TextInput autoCapitalize='none' label='Email' mode='outlined' style={styles.input} placeholder='Email' onChangeText={user => setEmail(user)}></TextInput>

      <TextInput autoCapitalize='none' label='Password' mode='outlined' style={styles.input} secureTextEntry placeholder='Password' onChangeText={pas => setPassword(pas)}></TextInput>

      {state.errorMessage ? <Text style={styles.errorMes}>{state.errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={()=>signin({email, password})}>
        <Text style={styles.text}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={()=>navigation.navigate('SignUp')}>
        <Text style={styles.link}>Nemate kreiran akaunt? Vratite se na prijavu</Text>
      </TouchableOpacity>

    </SafeAreaView>

    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor:'gray',
    borderRadius:20,
    margin: 10,
    fontSize: 22,
    justifyContent: 'center',
    width: '90%'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#46b4e7",
    width: '60%',
    height: 50,
    borderRadius:20,
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  errorMes: {
    color: 'red',
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "#4a4b44",
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link:{
    marginTop: 15,
    color: 'blue'
  }
});


export default LoginScreen;
