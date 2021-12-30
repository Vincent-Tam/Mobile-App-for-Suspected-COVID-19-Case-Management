import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { NavigationContext, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { auth } from '../firebase'

const HomeScreen = ({route, navigation}) => {
    return (
        <View style={styles.container}>
            
            <TouchableOpacity
                onPress={()=>navigation.navigate('Survey')}
                style={styles.button}
            >
                <MaterialCommunityIcons name='plus-circle' size={50} color='white'/>
                <Text style={styles.buttonText}>Add New Record</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#670485',
        width: 200,
        height: 100,
        marginTop: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize:16,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
