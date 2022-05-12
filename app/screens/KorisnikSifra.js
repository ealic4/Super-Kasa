import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView, View, Button} from 'react-native';
import {TextInput, RadioButton} from 'react-native-paper';
import { Context as AuthContext } from '../context/AuthContext'

function KorisnikSifra({ navigation }){

  const {state, izmjenaKorisnika2} = useContext(AuthContext);


  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  const [ime, setIme] = useState('');
  const [prezime, setPrezime ] = useState('');
  const [jmbg, setJmbg] = useState('');
  const [omiljenaBoja, setBoja ] = useState('');
  const [omiljenaZivotinja, setZivotinja ] = useState(''); 
  const [value, setValue] = useState('Korisnik');

  const [password2, setPassword2 ] = useState('');
  const [omiljenaBoja2, setBoja2 ] = useState('');
  const [omiljenaZivotinja2, setZivotinja2 ] = useState(''); 
  const [password3, setPassword3 ] = useState('');

  const [poruka, setPoruka] = useState('');

  const Provjera = () => {

    if( password2==password3 && omiljenaBoja2==omiljenaBoja && omiljenaZivotinja2==omiljenaZivotinja ){

        console.log("TACNI PODACI");
        setPoruka("");

        if(password==""){
            setPoruka("Unesite novi password");
        }
        else{

            setPassword3("password3");

            izmjenaKorisnika2({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja, value})
        }

    }
    else{

        console.log("NEEEETACNI PODACI");
        setPoruka("Netacni podaci");
    }

  } 

  useFocusEffect(
    React.useCallback(() => {

        setIme( state.edit.user.ime.trim() );
        setPrezime( state.edit.user.prezime.trim() );
        setJmbg( state.edit.user.jmbg.trim() );
  
        setEmail( state.edit.user.email.trim() );
        setPassword3( state.edit.user.password.trim() );
  
        setBoja( state.edit.user.omiljenaBoja );
        setZivotinja( state.edit.user.omiljenaZivotinja.trim() );

        setValue(state.edit.user.tip);

    }, [])
  );

  return (

    <SafeAreaView style={styles.container}>

      <TextInput autoCapitalize='none' label='Password' mode='outlined' style={styles.input} onChangeText={pas => setPassword2(pas.trim())}></TextInput>
      <TextInput autoCapitalize='none' label='Omiljena Boja' mode='outlined' style={styles.input} onChangeText={boja => setBoja2(boja.trim())}></TextInput>
      <TextInput autoCapitalize='none' label='Omiljena Zivotinja' mode='outlined' style={styles.input2} onChangeText={zivotinja => setZivotinja2(zivotinja.trim())}></TextInput>

      <TextInput autoCapitalize='none' label='Novi password' mode='outlined' style={styles.input2} onChangeText={pas => setPassword(pas.trim())}></TextInput>


      <Text style={styles.errorMes}>{poruka}</Text>

      <TouchableOpacity style={styles.button} onPress={Provjera} >
            <Text style={styles.text}>IZMIJENI</Text>
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
    margin: 5,
    fontSize: 12,
    justifyContent: 'center',
    width: '90%'
  },
  input2: {
    borderColor:'gray',
    height: 45,
    margin: 5,
    marginBottom: 20,
    fontSize: 12,
    justifyContent: 'center',
    width: '90%'
  },
  errorMes: {
    color: 'red',
    fontSize: 302,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#46b4e7",
    width: '60%',
    height: 45,
    padding: 11,
    borderRadius:20,
    marginTop: 18,
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


export default KorisnikSifra;