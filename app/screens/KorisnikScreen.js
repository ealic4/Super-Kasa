import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';

function KorisnikScreen({ navigation }){

  return (

    <SafeAreaView style={styles.container}>

        <Text style={styles.text} >KORISNIK</Text>
        
        <Text style={styles.text} >KORISNIK Funkcionalnosti</Text>


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
});


export default KorisnikScreen;
