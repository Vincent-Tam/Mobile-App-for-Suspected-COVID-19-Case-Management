import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import Screens
import { AccountScreen, LoginScreen } from '../screens';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle:{backgroundColor: '#670485'},
    headerTitleStyle:{color: 'white'},
    headerTintColor: 'white',
    headerTitleAlign: 'center',
};

export default function AccountStack() {
    return (
        <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen name='Account' component={AccountScreen} />
            <Stack.Screen name='SignIn' component={LoginScreen} />
        </Stack.Navigator>
    )
}


