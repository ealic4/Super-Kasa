import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput, FlatList, View} from 'react-native';
import UvodjenjeProizvodaUPoslovniceScreen from './UvodjenjeProizvodaUPoslovniceScreen';
import { Context as AuthContext } from '../context/AuthContext'

function DodavanjePoslovnicaScreen({navigation,route}){


  const { poruka, nazivPro, kolicina, jedinica } = route?.params || {};
  const {state, dodavanjePoslovnice, clearErrorMessage, listaProizvodaPos} = useContext(AuthContext);

  const [naziv, setNaziv] = useState('');
  const [grad, setGrad ] = useState('');
  const [adresa, setAdresa] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      clearErrorMessage()
    }, [])
  );

  const listaPro = ()=>{

    listaProizvodaPos()  
  }

  return (

    <SafeAreaView style={styles.container}>

      <TextInput autoCapitalize='none' label='Naziv' mode='outlined'  style={styles.input} placeholder='Naziv' onFocus={()=>clearErrorMessage()} onChangeText={naz => setNaziv(naz)}></TextInput>
      <TextInput autoCapitalize='none' label='Grad' mode='outlined'  style={styles.input} placeholder='Grad' onFocus={()=>clearErrorMessage()} onChangeText={gra => setGrad(gra)}></TextInput>
      <TextInput autoCapitalize='none' label='Adresa' mode='outlined'  style={styles.input} placeholder='Adresa' onFocus={()=>clearErrorMessage()} onChangeText={adr => setAdresa(adr)}></TextInput>
  

      {state.errorMessage ? <Text style={styles.errorMes}>{state.errorMessage}</Text> : null}
      {state.dodan ? <Text style={styles.dodan}>{state.dodan}</Text> : null}
        

      <TouchableOpacity style={styles.button} onPress={()=>dodavanjePoslovnice({naziv,grad,adresa})}>
        <Text style={styles.text}>DODAJ POSLOVNICU</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={listaPro}>
        <Text style={styles.text}>DODAJ PROIZVOD</Text>
      </TouchableOpacity>

      <View style={styles.errorMes}>
          <Text>{poruka} {nazivPro} {kolicina} {jedinica}</Text>
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
    height: 40,
    borderRadius:20,
    margin: 5,
    marginTop:8,
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


export default DodavanjePoslovnicaScreen;