import React, { useContext, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'

function AdminSScreen({ navigation }){

  const {signout} = useContext(AuthContext);

  const {state, listaProizvoda} = useContext(AuthContext);


  const listaK = ()=>{

    listaProizvoda()  
  }

  return (

    <SafeAreaView style={styles.container}>

        <Text style={styles.naslov}>ADMIN SKLADISTA</Text>

        <TouchableOpacity style={styles.pregled} onPress={listaK}>
        <Text style={styles.text}>PREGLED KORISNIKA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={signout}>
        <Text style={styles.text}>SIGN OUT</Text>
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
  text: {
    color: "#4a4b44",
    fontSize: 22,
    textAlign: 'center',
  },
  naslov: {
    color: "#4a4b44",
    fontSize: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top:"15%"
  },
  button: {
    backgroundColor: "#46b4e7",
    width: '60%',
    height: 55,
    padding: 14,
    borderRadius:20,
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: "8%",
  },
  pregled: {
    backgroundColor: "#46b4e7",
    width: '60%',
    height: 55,
    padding: 14,
    borderRadius:20,
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: "18%",
  },
});



export default AdminSScreen;
