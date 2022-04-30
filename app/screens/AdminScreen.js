import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';

function AdminScreen({ navigation }){

  return (

    <SafeAreaView style={styles.container}>

        <Text style={styles.text} >ADMIN</Text>

        <Text style={styles.text} >ADMIN Funkcionalnosti</Text>


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


export default AdminScreen;
