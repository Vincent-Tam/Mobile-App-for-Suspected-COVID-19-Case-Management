import React from 'react'
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native'
import { List, Title, Divider } from 'react-native-paper'
import ListUserRole from '../components/ListUserRole'
import { useTranslation, Trans } from "react-i18next"
import { useNavigation } from '@react-navigation/native'
import { useAuth } from './../contexts/AuthContent'

const UserRoleScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                
                <ListUserRole />
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserRoleScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: 'white'
    }
})
