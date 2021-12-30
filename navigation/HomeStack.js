import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import Screens
import { HomeScreen, SurveyScreen } from '../screens';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle:{backgroundColor: '#670485'},
    headerTitleStyle:{color: 'white'},
    headerTintColor: 'white',
    headerTitleAlign: 'center',
};

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={globalScreenOptions} >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Survey' component={SurveyScreen} />
        </Stack.Navigator>
    )
}