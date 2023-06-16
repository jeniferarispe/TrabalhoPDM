import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Alert, Text, Pressable, Modal, TextInput, TouchableOpacity, View, } from "react-native";
import { auth, firestore } from "../firebase";
import meuestilo from "../meuestilo";
import { Local } from "../Model/Local";

const ManterLocal = () => {
    const [formLocal, setFormLocal] = useState<Partial<Local>>({})
    const localRef =
        firestore.collection('Usuario').doc(auth.currentUser?.uid)
            .collection('Local')

    const navigation = useNavigation();

    useEffect(() => {

    }, []);



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

        console.log(local)
        localRefComId.set(local.toFirestore()).then(() => {
            alert("local Adicionado com Sucesso");
            console.log("local" + local);
            console.log("local ToString: " + local.toString())
            limparFormulario()
        });
    };


    return (
        <KeyboardAvoidingView
            style={meuestilo.container}
            behavior="padding">
            <View style={meuestilo.inputContainer}>
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

                <TextInput
                    placeholder="Latitude"
                    value={formLocal.lat}
                    onChangeText={val => setFormLocal({ ...formLocal, lat: val })}
                    style={meuestilo.input}
                />
                <TextInput
                    placeholder="Longitude"
                    value={formLocal.lon}
                    onChangeText={val => setFormLocal({ ...formLocal, lon: val })}
                    style={meuestilo.input}
                />




            </View>

            <View style={meuestilo.buttonContainer}>
                <TouchableOpacity onPress={cancelar} style={meuestilo.button}>
                    <Text style={meuestilo.buttonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={salvar}
                    style={[meuestilo.button, meuestilo.buttonOutline]}
                >
                    <Text style={meuestilo.buttonOutlineText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ManterLocal;
