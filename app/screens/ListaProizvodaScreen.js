import React, { useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, View, SafeAreaView, FlatList, Alert} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'
import { TouchableOpacity } from 'react-native-web';
const { useState } = React;

const ListaProizvodaScreen = ({ navigation }) => {

    const [lista, setLista] = useState([]);
    const {state, korisnikPod, proizvodPod} = useContext(AuthContext);

    useFocusEffect(
        React.useCallback(() => {

        setLista(state.list);

        }, [])
      );
      
      const getProizvod = (name) => {
        proizvodPod(name)
      }


      const ItemRender = ({ proizvod }) => (
        <SafeAreaView style={styles.item}>

        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.text} onPress={()=>getProizvod(proizvod.naziv)}> {proizvod.naziv}</Text>
        </SafeAreaView>

        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.text2} onPress={()=>getProizvod(proizvod.naziv)}>  {proizvod.kolicina}</Text>
        </SafeAreaView>

        <SafeAreaView style={{flex: 1, paddingRight:15}}>
            <Text style={styles.text3} onPress={()=>getProizvod(proizvod.naziv)}>{proizvod.jedinica}  </Text>
        </SafeAreaView>

        </SafeAreaView>
      );
  
    return (
      <SafeAreaView style={styles.container}>
        
        <Text style={styles.item2}> NAZIV        KOLICINA     JEDINICA</Text>

        <FlatList
          style={styles.listaa}
          data={lista}
          renderItem={({ item }) => <ItemRender proizvod={item.proizvod} />}
          keyExtractor={item => item.proizvod.id}
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



export default ListaProizvodaScreen;