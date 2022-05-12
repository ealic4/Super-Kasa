import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { ListItem, Icon, Text as RNEText } from "@rneui/base";
import { Provider, Dialog, FAB, IconButton, Portal } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
const { useState } = React;

const ListaPoslovnicaScreen = ({ navigation }) => {
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
  const { state, obrisiPoslovnicu } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      setLista(state.list);
    }, [])
  );

  const handleDelete = () => {
    obrisiPoslovnicu(dialog.idPoslovnice);
    let dialogCopy = { ...dialog };
    let listNewState = lista.filter(
      (item) => item.poslovnica.id !== dialog.idPoslovnice
    );
    setDialog({ visible: false, idPoslovnice: null });
    setLista(listNewState);
    setToastVisible({
      visible: true,
      message: `Poslovnica ${dialogCopy.imePoslovnice} obrisana`,
    });
    setTimeout(() => {
      setToastVisible({ visible: false, message: null });
    }, 1500);
  };

  const ItemRender = ({ poslovnica }) => (
    <ListItem bottomDivider containerStyle={{ margin: 3 }}>
      <ListItem.Content>
        <ListItem.Title h3 h3Style={{ fontWeight: "bold" }}>
          <Text>{poslovnica.naziv}</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text>
            Adresa: {poslovnica.adresa}
            {"\n"}
            Grad: {poslovnica.grad}
          </Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        raised
        name="remove"
        size={10}
        style={{ textAlign: "center" }}
        type="font-awesome"
        onPress={() =>
          setDialog({
            visible: true,
            idPoslovnice: poslovnica.id,
            imePoslovnice: poslovnica.naziv,
          })
        }
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
            <Icon name="store" size={45} style={{ marginRight: 5 }} />
            Poslovnice
          </RNEText>
          <FlatList
            style={styles.listaa}
            data={lista}
            renderItem={({ item }) => (
              <ItemRender poslovnica={item.poslovnica} />
            )}
            keyExtractor={(item) => item.poslovnica.id}
          />
          <FAB
            style={styles.fab}
            large
            icon="plus"
            onPress={() =>
              setToastVisible({ visible: true, message: "Kao radi" })
            }
          />
          <Portal>
            <Dialog visible={dialog.visible}>
              <Dialog.Title>Izbriši poslovnicu</Dialog.Title>
              <Dialog.Content>
                <Text style={{ color: "#fff" }}>
                  Jeste li sigurni da želite izbrisati poslovnicu?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <IconButton
                  icon="close"
                  onPress={() =>
                    setDialog({ visible: false, idPoslovnice: null })
                  }
                  style={{ margin: 10 }}
                />
                <IconButton
                  icon="check"
                  onPress={() => handleDelete()}
                  style={{ margin: 10 }}
                />
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Toast
            visible={toast.visible}
            position={Toast.positions.BOTTOM}
            duration={Toast.durations.SHORT}
            opacity={0.4}
            hideOnPress={true}
          >
            {toast.message}
          </Toast>
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

export default ListaPoslovnicaScreen;
