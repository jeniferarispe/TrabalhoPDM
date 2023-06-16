import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, View, FlatList, Text, StatusBar, } from "react-native";
import { auth, firestore } from "../firebase";
import MeuEstilo from "../meuestilo";
import { Local } from "../Model/Local";
const ListarLocal = () => {
    const [loading, setLoading] = useState(true); // Set loading to true
    const [locais, setLocais] = useState<Local[]>([]); // Initial empty array
    const localRef =
        firestore.collection('Usuario').doc(auth.currentUser?.uid)
            .collection('Local')
    //const cachorroRef = firestore.collection('Local');

    useEffect(() => {
        const subscriber = localRef
            .onSnapshot((querySnapshot) => {
                const locais = [];
                querySnapshot.forEach((documentSnapshot) => {
                    locais.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setLocais(locais);
                setLoading(false);
            });
        return () => subscriber();
    }, [locais]);


    if (loading) {
        return <ActivityIndicator />;
    }


    const Item = ({ item }) => (
        <View style={MeuEstilo.item}>
            <Text style={MeuEstilo.title}>Titulo : {item.titulo}</Text>
            <Text style={MeuEstilo.title}>Descrição : {item.descricao}</Text>
            <Text style={MeuEstilo.title}>Latitude : {item.lat}</Text>
            <Text style={MeuEstilo.title}>Longitude : {item.lon}</Text>
        </View>
    );

    const renderItem = ({ item }) => <Item item={item} />;

    return (
        <SafeAreaView style={MeuEstilo.containerlistar}>
            <FlatList
                data={locais}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
};
export default ListarLocal;