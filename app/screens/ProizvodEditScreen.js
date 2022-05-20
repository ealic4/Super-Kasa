import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView, View, Button} from 'react-native';
import {TextInput, RadioButton} from 'react-native-paper';
import { Context as AuthContext } from '../context/AuthContext'

function ProizvodEditScreen({ navigation }){

  const {state, izmjenaProizvoda, obrisiProizvod, preuzimanjeProizvoda, clearErrorMessage} = useContext(AuthContext);

  const [nazivS, setSNaziv] = useState('');
  const [kolicinaS, setSKolicina ] = useState('');
  const [jedinicaS, setSJedinica] = useState('');
  const[pressed,setPressed]=React.useState(false); 

  const [naziv, setNaziv] = useState('');
  const [kolicina, setKolicina ] = useState('');
  const [jedinica, setJedinica] = useState(''); 
  const [stanje, setStanje] = useState("poslan");


  useFocusEffect(
    React.useCallback(() => {

        setSNaziv( state.edit.proizvod.naziv.trim() );
        setSKolicina( state.edit.proizvod.kolicina.trim() );
        setSJedinica( state.edit.proizvod.jedinica.trim() );
  


        setNaziv( state.edit.proizvod.naziv.trim() );
        setKolicina( state.edit.proizvod.kolicina.trim() );
        setJedinica( state.edit.proizvod.jedinica.trim() );
  

    }, [])
  );

  return (

    <SafeAreaView style={styles.container}> 
      <TextInput autoCapitalize='none' label='Naziv' mode='outlined' style={styles.input} value={naziv} onChangeText={im => setNaziv(im.trim())} onPress={im => setSNaziv(im)}></TextInput>
      <TextInput autoCapitalize='none' label='Količina' mode='outlined' style={styles.input} value={kolicina} onChangeText={pre => setKolicina(pre.trim())} onPress={im => setSNaziv(im)}></TextInput>
      <TextInput autoCapitalize='none' label='Jedinica' mode='outlined' style={styles.input} value={jedinica} onChangeText={jmbg => setJedinica(jmbg.trim())} onPress={im => setSNaziv(im)}></TextInput>

      <View style={{ flexDirection: "row" }}>
        <View width="40%">

        <TouchableOpacity style={styles.buttonPrimi} onPress={()=>preuzimanjeProizvoda(nazivS)}>
          <Text style={styles.text}>Primljeno</Text>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.button} onPress={()=> izmjenaProizvoda({nazivS,naziv,kolicina,jedinica})}>
          <Text style={styles.text}>IZMIJENI</Text>
        </TouchableOpacity>      

        </View>

        <View width="40%">


        <TouchableOpacity style={styles.button} onPress={()=> obrisiProizvod(nazivS)}>

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
  buttonPrimi: {
    alignItems: "center",
    width: '90%',
    backgroundColor: 'green',
    height: 45,
    padding: 11,
    borderRadius:20,
    marginTop: 8,
    justifyContent: 'center',
  },
  buttonPrimljen: {
    alignItems: "center",
    backgroundColor: "red",
    width: '90%',
    height: 45,
    padding: 11,
    borderRadius:20,
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


export default ProizvodEditScreen;