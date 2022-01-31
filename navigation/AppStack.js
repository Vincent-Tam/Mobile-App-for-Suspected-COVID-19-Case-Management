import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainStack from './MainStack'
import AuthStack from './AuthStack'
import StaffStack from './StaffStack';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle:{backgroundColor: '#670485'},
    headerTitleStyle:{color: 'white'},
    headerTintColor: 'white',
    headerTitleAlign: 'center',
};

const AppStack = () => {
    return(

        <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen options={{headerShown: false}} name="auth" component={AuthStack} />
            <Stack.Screen options={{headerShown: false}} name="main" component={MainStack} />
            <Stack.Screen options={{headerShown: false}} name="staff" component={StaffStack} />
        </Stack.Navigator >

    );
}
 
export default AppStack

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
