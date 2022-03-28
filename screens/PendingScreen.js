import React from 'react'
import {StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar} from 'react-native'
import { List, Title, Divider } from 'react-native-paper'
import { useTranslation, Trans } from "react-i18next"
import { useNavigation } from '@react-navigation/native'
import ListPendingList from './../components/ListPendingList';

const PendingScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ListPendingList />
            </ScrollView>
        </SafeAreaView>
    )
}

export default PendingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})
