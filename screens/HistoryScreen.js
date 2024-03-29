import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { List, Title, Divider } from 'react-native-paper'
import { useTranslation, Trans } from "react-i18next"
import { useNavigation } from '@react-navigation/native'
import { useAuth } from './../contexts/AuthContent'
import ListHistory from '../components/ListHistory'

const HistoryScreen = () => {
    const authContext = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {authContext.role=='user'? <ListHistory />: <Text></Text>}
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
