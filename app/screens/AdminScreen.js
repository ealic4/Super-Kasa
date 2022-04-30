import React, { useContext } from 'react';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'

function AdminScreen(){

  const {signout} = useContext(AuthContext);

  return (

    <SafeAreaView style={styles.container}>

        <Text style={styles.text} >ADMIN</Text>

        <Text style={styles.text} >ADMIN Funkcionalnosti</Text>

        <TouchableOpacity style={styles.button} onPress={signout}>
        <Text style={styles.text}>SIGN OUT</Text>
        </TouchableOpacity>

    </SafeAreaView>

    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89cff0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "#4a4b44",
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
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
});



export default AdminScreen;
