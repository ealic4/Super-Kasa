import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ListItem } from "@rneui/base";
import { Button } from "react-native-paper";
import { Context as AuthContex } from "../context/AuthContext";

const { useState } = React;

const ListaProizvodaUPoslovniciScreen = ({ route }) => {
  const [proizvodi, setProizvodi] = useState([]);
  const { proizvodiIzPoslovnice } = useContext(AuthContex);

  useFocusEffect(
    React.useCallback(() => {
      function fetchData() {
        proizvodiIzPoslovnice(route.params.poslovnica.proizvodi)
          .then((result) => {
            setProizvodi(result.listaProizvoda);
            return;
          })
          .catch((error) => console.error(error));
      }

      fetchData();
    }, [])
  );

  const ItemRender = ({ proizvod }) => (
    <ListItem bottomDivider containerStyle={{ margin: 3 }}>
      <ListItem.Content>
        <ListItem.Title h3 h3Style={{ fontWeight: "bold" }}>
          <Text>{proizvod.naziv}</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text>
            Količina: {proizvod.kolicina}
            {"\n"}
            Jedinica: {proizvod.jedinica}
          </Text>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <SafeAreaView>
      <View style={styles.view}>
        <Text h3 h3Style={{ fontWeight: "bold" }}>
          {route.params.poslovnica.naziv}
        </Text>
        <Text h5>
          {route.params.poslovnica.adresa}, {route.params.poslovnica.grad}
        </Text>
      </View>

      <Text h4 style={styles.view}>
        Broj proizvoda: {route.params.poslovnica.proizvodi.length}
      </Text>

      <FlatList
        style={styles.list}
        data={proizvodi}
        renderItem={(item) => <ItemRender proizvod={item.item} />}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},

  view: {
    margin: 20,
  },

  list: {
    margin: 10,
  },
});

export default ListaProizvodaUPoslovniciScreen;
