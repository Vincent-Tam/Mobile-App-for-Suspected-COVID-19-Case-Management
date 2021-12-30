import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, SignUpScreen } from '../screens/index'
import MainStack from './MainStack'

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle:{backgroundColor: '#670485'},
    headerTitleStyle:{color: 'white'},
    headerTintColor: 'white',
    headerTitleAlign: 'center',
};

const AuthStack = () => {
    return(

        <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName='Welcome'>
            <Stack.Screen name="Welcome" component={LoginScreen} />
            <Stack.Screen options={{headerShown: false}} name="MainStack" component={MainStack} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>

    );
}
 
export default AuthStack

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
