import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import Screens
import { PendingScreen } from '../screens';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle:{backgroundColor: '#670485'},
    headerTitleStyle:{color: 'white'},
    headerTintColor: 'white',
    headerTitleAlign: 'center',
};

export default function PendingStack() {
    return (
        <Stack.Navigator initialRouteName='Pending Records' screenOptions={globalScreenOptions} >
            <Stack.Screen name='Pending Records' component={PendingScreen} />
        </Stack.Navigator>
    )
}