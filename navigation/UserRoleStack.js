import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import Screens
import { UserRoleScreen } from '../screens';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle:{backgroundColor: '#670485'},
    headerTitleStyle:{color: 'white'},
    headerTintColor: 'white',
    headerTitleAlign: 'center',
};

export default function HistoryStack() {
    return (
        <Stack.Navigator initialRouteName='History' screenOptions={globalScreenOptions} >
            <Stack.Screen name='User Role' component={UserRoleScreen} />
        </Stack.Navigator>
    )
}