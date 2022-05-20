import React, { useContext } from 'react';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'

function AdminScreen({ navigation }){

  const {signout} = useContext(AuthContext);

  const {state, listaKorisnika} = useContext(AuthContext);

  const listaK = ()=>{

    listaKorisnika()  
  }

  return (

    <SafeAreaView style={styles.container}>

        <Text style={styles.naslov}>ADMIN</Text>


        <TouchableOpacity style={styles.edit} onPress={listaK}>
        <Text style={styles.text}>PREGLED KORISNIKA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dodaj} onPress={()=>navigation.navigate('Dodaj')}>
        <Text style={styles.text}>DODAJ NOVOG KORISNIKA</Text>
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
    fontSize: 10,
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
  dodaj: {
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
  edit: {
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
    bottom: "28%",
  },
  dodPosl: {
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
    bottom: "38%",
  }
});



export default AdminScreen;
