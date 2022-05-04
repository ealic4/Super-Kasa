import React, { useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, View, SafeAreaView, FlatList, Alert} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'
const { useState } = React;

const ListaKorisnikaScreen = ({ navigation }) => {

    const [lista, setLista] = useState([]);
    const {state, korisnikPod} = useContext(AuthContext);

    const getItem = (name) => {
 
        console.log("|"+name+"|");

        korisnikPod(name);

      }        

    useFocusEffect(
        React.useCallback(() => {

        setLista(state.list);

        }, [])
      );
      


      const ItemRender = ({ email }) => (
        <View style={styles.item}>
          <Text style={styles.item} onPress={()=> getItem(email)}>{email}</Text>
        </View>
      );
  
    return (
      <SafeAreaView style={styles.container}>
        
        <FlatList
          data={lista}
          renderItem={({ item }) => <ItemRender email={item.email} />}
          keyExtractor={item => item.id}
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
    marginBottom: 20,
    marginTop:20
  },
  text: {
    color: "#4a4b44",
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#89cff0',
    padding: 15,
    fontSize: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
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
    bottom: "4%",
  },
});



export default ListaKorisnikaScreen;