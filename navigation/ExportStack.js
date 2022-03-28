import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import Screens
import { ExportScreen } from '../screens';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle:{backgroundColor: '#670485'},
    headerTitleStyle:{color: 'white'},
    headerTintColor: 'white',
    headerTitleAlign: 'center',
};

export default function ExportStack() {
    return (
        <Stack.Navigator initialRouteName='Results' screenOptions={globalScreenOptions} >
            <Stack.Screen name='Results' component={ExportScreen} />
        </Stack.Navigator>
    )
}