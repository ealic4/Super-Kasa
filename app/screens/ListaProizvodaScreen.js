import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { ListItem, Icon } from "@rneui/base";
const { useState } = React;

const ListaProizvodaScreen = ({ navigation }) => {
  const [lista, setLista] = useState([]);
  const { state, korisnikPod, proizvodPod } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      setLista(state.list);
    }, [])
  );

  const getProizvod = (name) => {
    proizvodPod(name);
  };

  const ItemRender = ({ proizvod }) => (
    <ListItem bottomDivider containerStyle={{ margin: 3 }}>
      <ListItem.Content>
        <ListItem.Title h3 h3Style={{ fontWeight: "bold" }}>
          <Text>{proizvod.naziv}</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text>
            Kolicina: {proizvod.kolicina}
            {"\n"}
            Jedinica: {proizvod.jedinica}
          </Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        raised
        name="edit"
        size={20}
        style={{ textAlign: "center" }}
        type="font-awesome"
        onPress={() => getProizvod(proizvod.naziv)}
      />
    </ListItem>

    /*
    <SafeAreaView style={styles.item}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.text} onPress={() => getProizvod(proizvod.naziv)}>
          {" "}
          {proizvod.naziv}
        </Text>
      </SafeAreaView>

      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.text2} onPress={() => getProizvod(proizvod.naziv)}>
          {" "}
          {proizvod.kolicina}
        </Text>
      </SafeAreaView>

      <SafeAreaView style={{ flex: 1, paddingRight: 15 }}>
        <Text style={styles.text3} onPress={() => getProizvod(proizvod.naziv)}>
          {proizvod.jedinica}{" "}
        </Text>
      </SafeAreaView>
    </SafeAreaView>*/
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.item2}>Proizvodi u skladištu</Text>

      <FlatList
        style={styles.listaa}
        data={lista}
        renderItem={({ item }) => <ItemRender proizvod={item.proizvod} />}
        keyExtractor={(item) => item.proizvod.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  listaa: {
    width: "90%",
  },
  item2: {
    fontSize: 20,
    padding: 10,
    textAlign: "left",
    fontWeight: "bold",
    marginVertical: 8,
    width: "90%",
  },
});

export default ListaProizvodaScreen;
