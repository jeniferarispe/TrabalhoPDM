import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, View, FlatList, Text, StatusBar, } from "react-native";
import { auth, firestore } from "../firebase";
import MeuEstilo2 from "../MeuEstilo2";
import { Local } from "../Model/Local";
import MapView, { Marker } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
const ListarMapa = () => {
    const [loading, setLoading] = useState(true); // Set loading to true
    const [locais, setLocais] = useState<Mapa[]>([]); // Initial empty array
    const isFocused = useIsFocused()
    const [position, setPosition] = useState({
        latitude: -31.308840,
        longitude: -54.113702,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const localRef =
        firestore.collection('Usuario').doc(auth.currentUser?.uid)
            .collection('Mapa')
    //const cachorroRef = firestore.collection('Local');
    useEffect(() => {

        const subscriber = localRef.onSnapshot((querySnapshot) => {

            const locais = [];

            querySnapshot.docs.forEach((documentSnapshot) => {
                locais.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            console.log("LOCAIS", locais)
            setLocais(locais || []);
            setLoading(false);
        });
        return () => subscriber();

    }, [isFocused]);


    if (loading) {
        return <ActivityIndicator />;
    }


    const Item = ({ item }) => (
        <View style={MeuEstilo2.item}>
            <Text style={MeuEstilo2.title}>Titulo : {item.titulo}</Text>
            <Text style={MeuEstilo2.title}>Descrição : {item.descricao}</Text>
            <Text style={MeuEstilo2.title}>Latitude : {item.lat}</Text>
            <Text style={MeuEstilo2.title}>Longitude : {item.lon}</Text>
        </View>
    );



    return (
        <View style={MeuEstilo2.container}>
            <MapView style={MeuEstilo2.map}

                zoomEnabled={true}
                zoomTapEnabled={true}
                onLongPress={e => {

                    setLocais([
                        ...locais,

                        //latitudeDelta: e.nativeEvent.coordinate.latitudeDelta,
                        //longitudeDelta: e.nativeEvent.coordinate.longitudeDelta
                    ])
                }}
            >

                {locais.map((item) => (

                    <Marker
                        coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.lon) }}
                        title={item.titulo}
                        description={item.descricao}
                    />
                ))}
            </MapView>



        </View>

    );
};
export default ListarMapa;