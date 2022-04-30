import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'

function DodavanjeKorisnika({ navigation }){

  const {state, dodavanje, clearErrorMessage} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  const [ime, setIme] = useState('');
  const [prezime, setPrezime ] = useState('');
  const [jmbg, setJmbg] = useState('');
  const [omiljenaBoja, setBoja ] = useState('');
  const [omiljenaZivotinja, setZivotinja ] = useState(''); 

  useFocusEffect(
    React.useCallback(() => {
      clearErrorMessage()
    }, [])
  );

  const dodajKorisika = () =>{


    
  }

  return (

    <SafeAreaView style={styles.container}>

      <TextInput autoCapitalize='none' style={styles.input} placeholder='Ime' onFocus={()=>clearErrorMessage()} onChangeText={im => setIme(im)}></TextInput>
      <TextInput autoCapitalize='none' style={styles.input} placeholder='Prezime' onFocus={()=>clearErrorMessage()} onChangeText={pre => setPrezime(pre)}></TextInput>
      <TextInput autoCapitalize='none' style={styles.input} placeholder='Jmbg' onFocus={()=>clearErrorMessage()} onChangeText={jmbg => setJmbg(jmbg)}></TextInput>

      <TextInput autoCapitalize='none' style={styles.input} placeholder='Email' onFocus={()=>clearErrorMessage()} onChangeText={user => setEmail(user)}></TextInput>
      <TextInput autoCapitalize='none' style={styles.input} secureTextEntry placeholder='Password' onFocus={()=>clearErrorMessage()} onChangeText={pas => setPassword(pas)}></TextInput>

      <TextInput autoCapitalize='none' style={styles.input} placeholder='Omiljena Boja' onFocus={()=>clearErrorMessage()} onChangeText={boja => setBoja(boja)}></TextInput>
      <TextInput autoCapitalize='none' style={styles.input} placeholder='Omiljena Zivotinja' onFocus={()=>clearErrorMessage()} onChangeText={zivotinja => setZivotinja(zivotinja)}></TextInput>

      {state.errorMessage ? <Text style={styles.errorMes}>{state.errorMessage}</Text> : null}
      {state.dodan ? <Text style={styles.dodan}>{state.dodan}</Text> : null}


      <TouchableOpacity style={styles.button} onPress={()=>dodavanje({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja})}>
        <Text style={styles.text}>DODAJ</Text>
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
    borderWidth:0.5,
    borderRadius:20,
    padding: 5,
    margin: 10,
    fontSize: 18,
    alignItems: 'center',
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
    marginTop: 8,
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
  },
  dodan: {
    color: 'black',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
 
});


export default DodavanjeKorisnika;
