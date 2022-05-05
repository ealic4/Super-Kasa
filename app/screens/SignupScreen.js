import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {TextInput} from 'react-native-paper';
import { Context as AuthContext } from '../context/AuthContext'

function SignUpScreen({ navigation }){

  const {state, signup, clearErrorMessage, tryLocalSignin} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  const [ime, setIme] = useState('');
  const [prezime, setPrezime ] = useState('');
  const [jmbg, setJmbg] = useState('');
  const [omiljenaBoja, setBoja ] = useState('');
  const [omiljenaZivotinja, setZivotinja ] = useState('');


  useEffect(()=>{

    tryLocalSignin();

  }, []);

   useFocusEffect(
    React.useCallback(() => {
      clearErrorMessage()
    }, [])
  );
  
 

  return (

    <SafeAreaView style={styles.container}>

      <TextInput autoCapitalize='none' label='Ime' mode='outlined' style={styles.input} placeholder='Ime' onChangeText={im => setIme(im)}></TextInput>
      <TextInput autoCapitalize='none' label='Prezime' mode='outlined' style={styles.input} placeholder='Prezime' onChangeText={pre => setPrezime(pre)}></TextInput>
      <TextInput autoCapitalize='none' label='Jmbg' mode='outlined' style={styles.input} placeholder='Jmbg' onChangeText={jmbg => setJmbg(jmbg)}></TextInput>

      <TextInput autoCapitalize='none' label='Email' mode='outlined' style={styles.input} placeholder='Email' onChangeText={user => setEmail(user)}></TextInput>
      <TextInput autoCapitalize='none' label='Password' mode='outlined' style={styles.input} secureTextEntry placeholder='Password' onChangeText={pas => setPassword(pas)}></TextInput>

      <TextInput autoCapitalize='none' label='Omiljena Boja' mode='outlined' style={styles.input} placeholder='Omiljena Boja' onChangeText={boja => setBoja(boja)}></TextInput>
      <TextInput autoCapitalize='none' label='Omiljena Zivotinja' mode='outlined' style={styles.input} placeholder='Omiljena Zivotinja' onChangeText={zivotinja => setZivotinja(zivotinja)}></TextInput>


      {state.errorMessage ? <Text style={styles.errorMes}>{state.errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={()=>signup({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja})}>
        <Text style={styles.text}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.link}>Imate kreiran akaunt? Prijavite se</Text>
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
    height: 45,
    margin: 2,
    fontSize: 12,
    justifyContent: 'center',
    width: '90%'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#46b4e7",
    width: '60%',
    height: 45,
    padding: 11,
    borderRadius:20,
    margin: 5,
    marginTop: 12,
    justifyContent: 'center',
  },
  text: {
    color: "#4a4b44",
    fontSize: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMes: {
    color: 'red',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link:{
    marginTop: 10,
    color: 'blue'
  }
 
});


export default SignUpScreen;
