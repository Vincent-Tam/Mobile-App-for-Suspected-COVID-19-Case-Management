import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, SignUpScreen } from '../screens/index'
import BottomTab from './BottomTab'

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle:{backgroundColor: '#670485'},
    headerTitleStyle:{color: 'white'},
    headerTintColor: 'white',
    headerTitleAlign: 'center',
};

const MainStack = () => {
    return(

        <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen options={{headerShown: false}} name="Tab" component={BottomTab} />
        </Stack.Navigator >

    );
}
 
export default MainStack

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

    },
    button: {

    },
})
