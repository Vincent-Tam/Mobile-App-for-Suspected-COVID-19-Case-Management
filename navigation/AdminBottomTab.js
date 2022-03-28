import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserRoleStack from './UserRoleStack'
import AccountStack from './AccountStack'
import ExportStack from './ExportStack'

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return(
        <Tab.Navigator 
        initialRouteName="PendingStack"
        screenOptions={({route}) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'UserRoleStack') {
                    iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
                }
                else if (route.name === 'ExportStack') {
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
            <Tab.Screen name="UserRoleStack" options={{title:'User Role'}} component={UserRoleStack} />
            <Tab.Screen name="ExportStack" options={{title:'Results'}} component={ExportStack} />
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
