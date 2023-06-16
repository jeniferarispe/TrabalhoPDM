import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ManterLocal from './ManterLocal';
import ListarLocal from './ListarLocal';
import Sair from './SairScreen';
import ManterMapa from './ManterMapa';
import ListarMapa from './ListarMapa';
function ManterScreen({ navigation }) {
    return (
        <ManterLocal></ManterLocal>
    );
}
function ListarScreen({ navigation }) {
    return (
        <ListarLocal></ListarLocal>
    );
}

function ManterMapaScreen({ navigation }) {
    return (
        <ManterMapa></ManterMapa>
    );
}
function ListarMapaScreen({ navigation }) {
    return (
        <ListarMapa></ListarMapa>
    );
}


function SairScreen({ navigation }) {
    return (
        <Sair></Sair>
    );
}


const Drawer = createDrawerNavigator();

export default function Menu() {
    return (

        <Drawer.Navigator initialRouteName="Manter Local">
            <Drawer.Screen name="Manter Local" component={ManterScreen} />
            <Drawer.Screen name="Listar Local" component={ListarScreen} />
            <Drawer.Screen name="Manter Mapa" component={ManterMapaScreen} />
            <Drawer.Screen name="Listar Mapa" component={ListarMapaScreen} />
            <Drawer.Screen name="Sair" component={SairScreen} />


        </Drawer.Navigator>

    );
}