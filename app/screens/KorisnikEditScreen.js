import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'

function KorisnkEditScreen({ navigation }){

  const {state, izmjenaKorisnika, obrisiKorisnika, clearErrorMessage} = useContext(AuthContext);

  const [emailS, setSEmail] = useState('');
  const [passwordS, setSPassword ] = useState('');
  const [imeS, setSIme] = useState('');
  const [prezimeS, setSPrezime ] = useState('');
  const [jmbgS, setSJmbg] = useState('');
  const [omiljenaBojaS, setSBoja ] = useState('');
  const [omiljenaZivotinjaS, setSZivotinja ] = useState(''); 

  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  const [ime, setIme] = useState('');
  const [prezime, setPrezime ] = useState('');
  const [jmbg, setJmbg] = useState('');
  const [omiljenaBoja, setBoja ] = useState('');
  const [omiljenaZivotinja, setZivotinja ] = useState(''); 

  useFocusEffect(
    React.useCallback(() => {

        setSIme( state.edit.user.ime.trim() );
        setSPrezime( state.edit.user.prezime.trim() );
        setSJmbg( state.edit.user.jmbg.trim() );
  
        setSEmail( state.edit.user.email.trim() );
        setSPassword( state.edit.user.password.trim() );
  
        setSBoja( state.edit.user.omiljenaBoja.trim() );
        setSZivotinja( state.edit.user.omiljenaZivotinja.trim() );


        setIme( state.edit.user.ime.trim() );
        setPrezime( state.edit.user.prezime.trim() );
        setJmbg( state.edit.user.jmbg.trim() );
  
        setEmail( state.edit.user.email.trim() );
        setPassword( state.edit.user.password.trim() );
  
        setBoja( state.edit.user.omiljenaBoja );
        setZivotinja( state.edit.user.omiljenaZivotinja.trim() );

    }, [])
  );

  
  const getItem = () => {

    console.log("|sss"+"sss|")

    console.log("|"+ime+"|")
 
  }

  return (

    <SafeAreaView style={styles.container}>

      <TextInput autoCapitalize='none' style={styles.input} placeholder='Ime' onFocus={()=>clearErrorMessage()} onChangeText={im => setIme(im.trim())}> {imeS} </TextInput>
      <TextInput autoCapitalize='none' style={styles.input} placeholder='Prezime' onFocus={()=>clearErrorMessage()} onChangeText={pre => setPrezime(pre.trim())}> {prezimeS} </TextInput>
      <TextInput autoCapitalize='none' style={styles.input} placeholder='Jmbg' editable = {false} onFocus={()=>clearErrorMessage()} onChangeText={jmbg => setJmbg(jmbg.trim())}> {jmbgS} </TextInput>

      <TextInput autoCapitalize='none' style={styles.input} placeholder='Email' onFocus={()=>clearErrorMessage()} onChangeText={user => setEmail(user.trim())}> {emailS} </TextInput>
      <TextInput autoCapitalize='none' style={styles.input} placeholder='Password' onFocus={()=>clearErrorMessage()} onChangeText={pas => setPassword(pas.trim())}> {passwordS} </TextInput>

      <TextInput autoCapitalize='none' style={styles.input} placeholder='Omiljena Boja' onFocus={()=>clearErrorMessage()} onChangeText={boja => setBoja(boja.trim())}> {omiljenaBojaS} </TextInput>
      <TextInput autoCapitalize='none' style={styles.input} placeholder='Omiljena Zivotinja' onFocus={()=>clearErrorMessage()} onChangeText={zivotinja => setZivotinja(zivotinja.trim())}> {omiljenaZivotinjaS} </TextInput>

      <TouchableOpacity style={styles.button} onPress={()=>izmjenaKorisnika({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja})} >
        <Text style={styles.text}>IZMIJENI</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>obrisiKorisnika(email)} >
      <Text style={styles.text}>OBRISI KORISNIKA</Text>
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


export default KorisnkEditScreen;