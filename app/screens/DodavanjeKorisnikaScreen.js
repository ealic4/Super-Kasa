import React, { useState, useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import { Context as AuthContext } from "../context/AuthContext";

function DodavanjeKorisnika({ navigation }) {
  const { state, dodavanje, clearErrorMessage } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [omiljenaBoja, setBoja] = useState("");
  const [omiljenaZivotinja, setZivotinja] = useState("");
  const [value, setValue] = useState("Korisnik");

  useFocusEffect(
    React.useCallback(() => {
      clearErrorMessage();
    }, [])
  );

  const dodajKorisika = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        autoCapitalize="none"
        label="Ime"
        mode="outlined"
        style={styles.input}
        onFocus={() => clearErrorMessage()}
        onChangeText={(im) => setIme(im)}
      ></TextInput>
      <TextInput
        autoCapitalize="none"
        label="Prezime"
        mode="outlined"
        style={styles.input}
        onFocus={() => clearErrorMessage()}
        onChangeText={(pre) => setPrezime(pre)}
      ></TextInput>
      <TextInput
        autoCapitalize="none"
        label="Jmbg"
        mode="outlined"
        style={styles.input}
        onFocus={() => clearErrorMessage()}
        onChangeText={(jmbg) => setJmbg(jmbg)}
      ></TextInput>

      <TextInput
        autoCapitalize="none"
        label="Email"
        mode="outlined"
        style={styles.input}
        onFocus={() => clearErrorMessage()}
        onChangeText={(user) => setEmail(user)}
      ></TextInput>
      <TextInput
        autoCapitalize="none"
        label="Password"
        mode="outlined"
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        onFocus={() => clearErrorMessage()}
        onChangeText={(pas) => setPassword(pas)}
      ></TextInput>

      <TextInput
        autoCapitalize="none"
        label="Omiljena Boja"
        mode="outlined"
        style={styles.input}
        onFocus={() => clearErrorMessage()}
        onChangeText={(boja) => setBoja(boja)}
      ></TextInput>
      <TextInput
        autoCapitalize="none"
        label="Omiljena Zivotinja"
        mode="outlined"
        style={styles.input}
        onFocus={() => clearErrorMessage()}
        onChangeText={(zivotinja) => setZivotinja(zivotinja)}
      ></TextInput>

      <View style={{ flexDirection: "row", height: 50 }}>
        <View width="40%">
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}
          >
            <RadioButton.Item
              color="#46b4e7"
              label="Korisnik"
              value="Korisnik"
            />
          </RadioButton.Group>
        </View>

        <View width="40%">
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}
          >
            <RadioButton.Item
              color="#46b4e7"
              label="Napredni korisnik"
              value="Napredni korisnik"
            />
          </RadioButton.Group>
        </View>
      </View>

      {state.errorMessage ? (
        <Text style={styles.errorMes}>{state.errorMessage}</Text>
      ) : null}
      {state.dodan ? <Text style={styles.dodan}>{state.dodan}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          dodavanje({
            email,
            password,
            ime,
            prezime,
            jmbg,
            omiljenaBoja,
            omiljenaZivotinja,
            value,
          })
        }
      >
        <Text style={styles.text}>DODAJ</Text>
      </TouchableOpacity>
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
    height: 45,
    margin: 2,
    fontSize: 12,
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

export default DodavanjeKorisnika;
