import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { NavigationContext, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { auth } from '../firebase'

const AccountScreen = ({navigation}) => {
    // const navigation = useNavigation();
    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
            // navigation.push('SignIn');
            // this.props.navigation.goBack(null)
            alert('Sign Out!');
        })
        .catch(error => alert(error.message))
    
    }

    return (
        <View style={styles.container}>
            <Text>Account: {auth.currentUser?.email}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleSignOut(navigation)}> 
                <Text style={styles.paragraph}>Sign out</Text> 
            </TouchableOpacity> 
        </View>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    button: { 
        alignItems: "center", 
        backgroundColor: "#670485", 
        padding: 15, 
        margin: 10,
        borderRadius: 10,
    },
    paragraph: {
        color: 'white',
        fontSize: 16,
    }
})
