import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import Screens
import { StaffResultScreen } from '../screens';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle:{backgroundColor: '#670485'},
    headerTitleStyle:{color: 'white'},
    headerTintColor: 'white',
    headerTitleAlign: 'center',
};

export default function StaffResultStack() {
    return (
        <Stack.Navigator initialRouteName='Result' screenOptions={globalScreenOptions} >
            <Stack.Screen name='Result' component={StaffResultScreen} />
        </Stack.Navigator>
    )
}