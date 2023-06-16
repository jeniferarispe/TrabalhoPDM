

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MeuEstilo2 from '../MeuEstilo2';
import meuestilo from '../meuestilo';
import { auth, firestore } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { Local } from "../Model/Local";
import React, { useEffect, useState } from "react";
const ManterMapa = () => {
    const [formLocal, setFormLocal] = useState<Partial<Local>>({})
    const localRef =
        firestore.collection('Usuario').doc(auth.currentUser?.uid)
            .collection('Mapa')

    const navigation = useNavigation();

    useEffect(() => {

    }, []);



    const [position, setPosition] = useState({
        latitude: -31.308840,
        longitude: -54.113702,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [titulo, setTitle] = useState("");
    const [descricao, setDescricao] = useState("");
    const limparFormulario = () => {
        setFormLocal({})
    }

    const cancelar = async () => {
        limparFormulario()
    }
    const salvar = async () => {
        const localRefComId = localRef.doc();
        const local = new Local(formLocal);
        local.id = localRefComId.id
        local.lat = position.latitude.toString();
        local.lon = position.longitude.toString();

        console.log(local)
        localRefComId.set(local.toFirestore()).then(() => {
            alert("local Adicionado com Sucesso");
            console.log("local" + local);
            console.log("local ToString: " + local.toString())
            limparFormulario()
        });
    };


    return (
        <View style={MeuEstilo2.container}>
            <MapView style={MeuEstilo2.map}
                region={position}
                onPress={e => setPosition({
                    ...position,
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude
                    //latitudeDelta: e.nativeEvent.coordinate.latitudeDelta,
                    //longitudeDelta: e.nativeEvent.coordinate.longitudeDelta
                })
                }>

                <Marker
                    coordinate={position}
                    title={titulo}
                    description={descricao}
                />
            </MapView>


            <Text>Latitude : {position.latitude}</Text>
            <Text>Longitude : {position.longitude}</Text>

            <TextInput
                placeholder="Titulo"
                value={formLocal.titulo}
                onChangeText={val => setFormLocal({ ...formLocal, titulo: val })}
                style={meuestilo.input}
            />
            <TextInput
                placeholder="Descricao"
                value={formLocal.descricao}
                onChangeText={val => setFormLocal({ ...formLocal, descricao: val })}
                style={meuestilo.input}
            />
             <TouchableOpacity
                    onPress={salvar}
                    style={[MeuEstilo2.button, MeuEstilo2.buttonOutline]}
                >
                <Text style={MeuEstilo2.buttonOutlineText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ManterMapa;
