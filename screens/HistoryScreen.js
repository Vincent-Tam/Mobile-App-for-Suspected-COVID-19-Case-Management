import React from 'react'
import {StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar} from 'react-native'
import { List, Title, Divider } from 'react-native-paper'
import { useTranslation, Trans } from "react-i18next"
import { useNavigation } from '@react-navigation/native'
import {auth} from '../firebase'
import ListHistory from '../components/ListHistory'

const HistoryScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ListHistory />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: 'white'
    }
})
