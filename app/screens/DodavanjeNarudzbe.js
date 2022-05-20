import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList, View} from 'react-native';
import {TextInput, RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { Context as AuthContext } from '../context/AuthContext'

function DodavanjeNarudzbeScreen({navigation,route}){

    const {state, dodavanjeNarudzbe, DropListaPoslovnica} = useContext(AuthContext);
  
    const [naziv, setNaziv] = useState('');
    const [poslovnica, setPoslovnica] = useState("");
    const [stol, setStol] = useState("");

  
    useFocusEffect(
      React.useCallback(() => {
            DropListaPoslovnica();
            setPoslovnica(state.list2[0].poslovnica.naziv);
            //setStol("Stol1")
      }, [])
    );

    const renderProductList = () => {
        return state.list2.map((poslovnica) => {
          return <Picker.Item label={poslovnica.poslovnica.naziv} value={poslovnica.poslovnica.naziv} key={poslovnica.poslovnica.id} />
        })
      }
  
    return (
  
      <SafeAreaView style={styles.container}>
  
        <TextInput autoCapitalize='none' label='Naziv narudzbe' mode='outlined' style={styles.input} onChangeText={na => setNaziv(na.trim())} ></TextInput>
        <Picker
        style={styles.picker}
        selectedValue={poslovnica}
        onValueChange={(itemValue) =>
            setPoslovnica(itemValue)
        }>
        {renderProductList()}
        </Picker>

        <Picker
        style={styles.picker}
        selectedValue={stol}
        onValueChange={(itemValue) =>
            setStol(itemValue)
        }>
          <Picker.Item label="Stol1" value="Stol1" />
          <Picker.Item label="Stol2" value="Stol2" />
          <Picker.Item label="Stol3" value="Stol3" />
          <Picker.Item label="Stol4" value="Stol4" />
          <Picker.Item label="Stol5" value="Stol5" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={()=>dodavanjeNarudzbe({naziv, poslovnica, stol})}>
        <Text style={styles.text}>DODAJ</Text>
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
      margin: 2,
      fontSize: 12,
      justifyContent: 'center',
      width: '90%'
    },
    button: {
      alignItems: "center",
      backgroundColor: "#46b4e7",
      width: '60%',
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
    },
    picker: {
        width:"40%",
        alignItems: 'center',
        justifyContent: 'center',
    },

   
  });

export default DodavanjeNarudzbeScreen;