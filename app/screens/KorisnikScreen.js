import React, { useContext } from 'react';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'

function KorisnikScreen(){

  const {state, korisnikPod2, signout} = useContext(AuthContext);

  const getItem = () => {
 
    korisnikPod2();

  } 

  return (

    <SafeAreaView style={styles.container}>

        <Text style={styles.naslov}>KORISNIK</Text>

        <TouchableOpacity style={styles.sifra} onPress={getItem}>
        <Text style={styles.text}>PROMJENA SIFRE</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  sifra: {
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


export default KorisnikScreen;
