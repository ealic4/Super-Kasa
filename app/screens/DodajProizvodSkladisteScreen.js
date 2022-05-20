import React, { useState, useContext, useEffect } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  View,
} from "react-native";
import UvodjenjeProizvodaUPoslovniceScreen from "./UvodjenjeProizvodaUPoslovniceScreen";
import { Context as AuthContext } from "../context/AuthContext";

function DodajProizvodSkladisteScreen({ navigation, route }) {
  const { state, dodavanjeProizvodaSkladiste, clearErrorMessage } =
    useContext(AuthContext);

  const [naziv, setNaziv] = useState("");
  const [kolicina, setKolicina] = useState("");
  const [jedinica, setJedinica] = useState("");
  const [stanje, setStanje] = useState('poslan');

  useFocusEffect(
    React.useCallback(() => {
      clearErrorMessage();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        autoCapitalize="none"
        label="Naziv"
        mode="outlined"
        style={styles.input}
        placeholder="Naziv"
        onFocus={() => clearErrorMessage()}
        onChangeText={(naziv) => setNaziv(naziv)}
      ></TextInput>
      <TextInput
        autoCapitalize="none"
        label="Količina"
        mode="outlined"
        style={styles.input}
        placeholder="Količina"
        onFocus={() => clearErrorMessage()}
        onChangeText={(kolicina) => setKolicina(kolicina)}
      ></TextInput>
      <TextInput
        autoCapitalize="none"
        label="Jedinica"
        mode="outlined"
        style={styles.input}
        placeholder="Jedinica"
        onFocus={() => clearErrorMessage()}
        onChangeText={(jedinica) => setJedinica(jedinica)}
      ></TextInput>

      {state.errorMessage ? (
        <Text style={styles.errorMes}>{state.errorMessage}</Text>
      ) : null}
      {state.dodan ? <Text style={styles.dodan}>{state.dodan}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          dodavanjeProizvodaSkladiste({ naziv, kolicina, jedinica, stanje })
        }
      >
        <Text style={styles.text}>DODAJ PROIZVOD</Text>
      </TouchableOpacity>

      <View style={styles.errorMes}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "gray",
    borderRadius: 20,
    margin: 10,
    fontSize: 22,
    justifyContent: "center",
    width: "90%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#46b4e7",
    width: "60%",
    height: 40,
    borderRadius: 20,
    margin: 5,
    marginTop: 8,
    justifyContent: "center",

  },
  text: {
    color: "#4a4b44",
    fontSize: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMes: {
    color: "red",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    marginTop: 10,
    color: "blue",
  },
  dodan: {
    color: "black",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DodajProizvodSkladisteScreen;
