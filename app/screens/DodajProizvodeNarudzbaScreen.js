import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, SafeAreaView, FlatList, View } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { ListItem, Icon, Text as RNEText } from "@rneui/base";
const { useState } = React;

const DodajProizvodeNarudzbaScreen = ({ route }) => {

    const [kolicinaString, setKolicinaString] = useState("")
    const [proizvodi, setProizvodi] = useState([]);
    const [proizvod, setProizvod] = useState({
        idProizvoda: "",
        kolicina: 0
    })
    const { sviProizvodi } = useContext(AuthContext);

    useFocusEffect(
        React.useCallback(() => {
            function fetchData() {
                sviProizvodi()
                    .then((result) => {
                        setProizvodi(result.listaP);
                        return;
                    })
                    .catch((error) => console.error(error));
            }
            fetchData();

        }, []))


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


            <ListItem.Input placeholder="0" keyboardType="numeric" onChangeText={(text) => console.log(text)}
            />
        </ListItem>
    )


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.item2}>Dodaj proizvode</Text>
            <FlatList
                style={styles.listaa}
                data={proizvodi}
                renderItem={({ item }) => <ItemRender proizvod={item.proizvod} />}
                keyExtractor={(item) => item.proizvod.id}
            />



        </SafeAreaView>
    )
}

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
    listaa: {
        width: "90%",
    },
});

export default DodajProizvodeNarudzbaScreen