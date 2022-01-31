import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeStack from './HomeStack'
import HistoryStack from './HistoryStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator();
let iconName;

const BottomTab = () => {
    return(
        <Tab.Navigator 
        initialRouteName="HomeStack"
        screenOptions={({route}) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'HomeStack') {
                    iconName = focused ? 'home' : 'home-outline';
                } 
                else if (route.name === 'HistoryStack') {
                    iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
                }
                else if (route.name === 'AccountStack') {
                    iconName = focused ? 'account' : 'account-outline';
                }
                return <MaterialCommunityIcons name={iconName} size={30} color={'#670485'} />; 
            },
            tabBarStyle: {
                height: 80,
                margin: 10,
                borderRadius: 20,
            },
            tabBarItemStyle: {
                margin: 10,
                
            },
            headerStyle: {backgroundColor: '#670485'},
            headerTitleAlign: 'center',
            headerShown: false,
            tabBarHideOnKeyboard: true
        })}
        activeColor="#670485"
        
        >
            {/* <Tab.Screen name="HomeStack" options={{title:'Home'}} component={HomeStack} /> */}
            <Tab.Screen name="HistoryStack" options={{title:'History'}} component={HistoryStack} />
            <Tab.Screen name="AccountStack" options={{title:'Account'}} component={AccountStack} />
        </Tab.Navigator>
    );
}
 
export default BottomTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'white',
    },
})
