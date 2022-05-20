import React, { useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Text, View, SafeAreaView, FlatList, Alert, TouchableOpacity} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'
const { useState } = React;


const UvodjenjeProizvodaUPoslovniceScreen = ({ navigation, route }) => {

    const [lista, setLista] = useState([]);
    const {state, uvediProizvod} = useContext(AuthContext);
    const [poslaniProizvodi, setPoslaniProizvodi] = useState([]);
    var [ isPress, setIsPress ] = useState([false]);

    const naziv_poslovnice = route.params.naziv;

    const obiljezi = (item) => {
      if(!poslaniProizvodi.includes(item))
      poslaniProizvodi.push(item);
      else {
        var index = poslaniProizvodi.indexOf(item);
        if(index >-1) {
          poslaniProizvodi.splice(index,1);
        }
      }

      console.log("na spisku su sada: "+poslaniProizvodi.toString());
    }
      

    useFocusEffect(
        React.useCallback(() => {

        setLista(state.list);

        }, [])
      );
      


      const ItemRender = ({ proizvod }) => (

              <SafeAreaView style={styles.itemNeobiljezen}>

<SafeAreaView style={{flex: 1}}>
    <Text style={styles.text}> {proizvod.naziv}</Text>
</SafeAreaView>

<SafeAreaView style={{flex: 1}}>
    <Text style={styles.text2}>  {proizvod.kolicina}</Text>
</SafeAreaView>

<SafeAreaView style={{flex: 1, paddingRight:15}}>
    <Text style={styles.text3}>{proizvod.jedinica}  </Text>
</SafeAreaView>

</SafeAreaView>
        
      );
  
    return (
      <SafeAreaView style={styles.container}>
        

        <Text style={styles.item2}>{naziv_poslovnice}</Text>
        <Text style={styles.item2}> NAZIV        KOLICINA     JEDINICA</Text>

        <FlatList
          style={styles.listaa}
          data={lista}
          renderItem={({ item }) => <TouchableOpacity onPress={() => { 
                  uvediProizvod(item.proizvod.naziv);
              }}>
                <ItemRender proizvod={item.proizvod} />
            </TouchableOpacity> }
          keyExtractor={item => item.proizvod.id}
        />
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const stringparam = poslaniProizvodi.toString();
          uvediProizvod(route.params.naziv, stringparam)
        }}
      >
        <Text style={styles.text4}>DODAJ u POSLOVNICU</Text>
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
  text4: {
    flex: 1,
    color: "#4a4b44",
    fontSize: 20,
    textAlign: 'right'
  },
  listaa:{
    width:"90%",
  },
  itemNeobiljezen: {
    backgroundColor: '#89cff0',
    fontSize: 20,
    padding: 10,
    flex: 1, flexDirection: 'row', alignItems: 'center',
    marginVertical: 5,
  },
  itemObiljezen: {
    backgroundColor: 'green',
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
  obiljezen: {
    backgroundColor: 'green',
  },
  neobiljezen: {
    backgroundColor: 'blue',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#46b4e7",
    width: "60%",
    height: 50,
    borderRadius: 20,
    marginTop: 50,
    justifyContent: "center",
  },

});



export default UvodjenjeProizvodaUPoslovniceScreen;