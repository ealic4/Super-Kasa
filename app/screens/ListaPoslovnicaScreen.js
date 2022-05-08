import React, { useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, View, SafeAreaView, FlatList, Alert} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'
const { useState } = React;

const ListaPoslovnicaScreen = ({ navigation }) => {

    const [lista, setLista] = useState([]);
    const {state, korisnikPod} = useContext(AuthContext);

    useFocusEffect(
        React.useCallback(() => {

        setLista(state.list);

        }, [])
      );
      


      const ItemRender = ({ poslovnica }) => (
        <SafeAreaView style={styles.item}>

        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.text}> {poslovnica.naziv}</Text>
        </SafeAreaView>

        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.text2}>{poslovnica.grad}</Text>
        </SafeAreaView>

        <SafeAreaView style={{flex: 1, paddingRight:20}}>
            <Text style={styles.text3}> {poslovnica.adresa}</Text>
        </SafeAreaView>

        </SafeAreaView>
      );
  
    return (
      <SafeAreaView style={styles.container}>
        
        <Text style={styles.item2}> NAZIV           GRAD           ADRESA</Text>

        <FlatList
          style={styles.listaa}
          data={lista}
          renderItem={({ item }) => <ItemRender poslovnica={item.poslovnica} />}
          keyExtractor={item => item.poslovnica.id}
        />

      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "10%"
  },
  text: {
    flex: 1,
    color: "#4a4b44",
    fontSize: 22,
    textAlign: 'left'  
},
  text2: {
    flex: 1,
    color: "#4a4b44",
    fontSize: 22,
    textAlign: 'center',
  },
  text3: {
    flex: 1,
    color: "#4a4b44",
    fontSize: 22,
    textAlign: 'right'
  },
  listaa:{
    width:"90%",
  },
  item: {
    backgroundColor: '#89cff0',
    fontSize: 20,
    padding: 10,
    flex: 1, flexDirection: 'row', alignItems: 'center',
    marginVertical: 5,
  },
  item2: {
    backgroundColor: '#89cff0',
    fontSize: 20,
    padding: 10,
     alignItems: 'center',
    marginVertical: 8,
    width:"90%"
  },
});



export default ListaPoslovnicaScreen;