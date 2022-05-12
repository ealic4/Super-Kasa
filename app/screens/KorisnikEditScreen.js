import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView, View, Button} from 'react-native';
import {TextInput, RadioButton} from 'react-native-paper';
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
  const [value, setValue] = useState('Korisnik');


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

        setValue(state.edit.user.tip);

    }, [])
  );

  return (

    <SafeAreaView style={styles.container}>

      <TextInput autoCapitalize='none' label='Ime' mode='outlined' style={styles.input} value={ime} onChangeText={im => setIme(im.trim())}></TextInput>
      <TextInput autoCapitalize='none' label='Prezime' mode='outlined' style={styles.input} value={prezime} onChangeText={pre => setPrezime(pre.trim())}></TextInput>
      <TextInput autoCapitalize='none' label='Jmbg' mode='outlined' editable = {false} style={styles.input} value={jmbg} onChangeText={jmbg => setJmbg(jmbg.trim())}></TextInput>

      <TextInput autoCapitalize='none' label='Email' mode='outlined' style={styles.input} value={email} onChangeText={user => setEmail(user.trim())}></TextInput>
      <TextInput autoCapitalize='none' label='Password' mode='outlined' style={styles.input} value={password} onChangeText={pas => setPassword(pas.trim())}></TextInput>

      <TextInput autoCapitalize='none' label='Omiljena Boja' mode='outlined' style={styles.input} value={omiljenaBoja} onChangeText={boja => setBoja(boja.trim())}></TextInput>
      <TextInput autoCapitalize='none' label='Omiljena Zivotinja' mode='outlined' style={styles.input} value={omiljenaZivotinja} onChangeText={zivotinja => setZivotinja(zivotinja.trim())}></TextInput>

      <View style={{ flexDirection: "row", height:50 }}>
        
        <View width="40%" >
        <RadioButton.Group onValueChange={value => setValue(value)} value={value} >

        <RadioButton.Item  color='#46b4e7' label="Korisnik" value="Korisnik" />

        </RadioButton.Group>
        </View>

        <View width="40%">
        <RadioButton.Group onValueChange={value => setValue(value)}  value={value}>

        <RadioButton.Item color='#46b4e7' label="Napredni korisnik" value="Napredni korisnik" />

        </RadioButton.Group>
        </View>
        
      </View>

      <View style={{ flexDirection: "row" }}>
        <View width="40%">

        <TouchableOpacity style={styles.button} onPress={()=>izmjenaKorisnika({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja, value})} >
          <Text style={styles.text}>IZMIJENI</Text>
        </TouchableOpacity>      

        </View>

        <View width="40%">

        <TouchableOpacity style={styles.button} onPress={()=>obrisiKorisnika(email)} >
          <Text style={styles.text}>OBRISI</Text>
        </TouchableOpacity>

        </View>
        
    </View>

    


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
    width: '90%',
    height: 45,
    padding: 11,
    borderRadius:20,
    marginTop: 8,
    justifyContent: 'center',
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#46b4e7",
    height: 45,
    width: '90%',
    padding: 11,
    borderRadius:20,
    fontSize: 5,
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