import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { ListItem, Icon, Text as RNEText } from "@rneui/base";
import { Provider, Dialog, FAB, IconButton, Portal } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
const { useState } = React;

const NarudzbeScreen = ({ navigation }) => {

  const [lista, setLista] = useState([]);

  const [dialog, setDialog] = useState({
    visible: false,
    idPoslovnice: null,
    imePoslovnice: null,
  });

  const [toast, setToastVisible] = useState({
    visible: false,
    message: null,
  });

  const { state, DropListaPoslovnica } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      setLista(state.list);
    }, [])
  );


  const ItemRender = ({ narudzba }) => (
    <ListItem bottomDivider containerStyle={{ margin: 3 }}>
      <ListItem.Content>
        <ListItem.Title h3 h3Style={{ fontWeight: "bold" }}>
          <Text>{narudzba.naziv}</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text>
            Poslovnica:  {narudzba.nazivPoslovnce}
          </Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        raised
        name="edit"
        size={20}
        style={{ textAlign: "center" }}
        type="font-awesome"
        onPress={() => navigation.navigate("ProizvodiNarudzba", narudzba)}
      />
    </ListItem>
  );

  return (
    <RootSiblingParent>
      <Provider>
        <SafeAreaView style={styles.container}>
          <RNEText
            h1
            h1Style={{ fontWeight: "bold" }}
            style={{ textAlign: "left" }}
          >
            <Icon size={45} style={{ marginRight: 5 }} />
            Narudzbe
          </RNEText>
          
          <FlatList
            style={styles.listaa}
            data={lista}
            renderItem={({ item }) => (
              <ItemRender narudzba={item.narudzba} />
            )}
            keyExtractor={(item) => item.narudzba.id}
          />
          <FAB
            style={styles.fab}
            large
            icon="plus"
            onPress={() =>
              DropListaPoslovnica()
            }
          />
        </SafeAreaView>
      </Provider>
    </RootSiblingParent>
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
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 8,
    width: "90%",
  },
  fab: {
    position: "absolute",
    backgroundColor: "#46b4e7",
    margin: 50,
    left: 0,
    bottom: 0,
  },
});

export default NarudzbeScreen;
