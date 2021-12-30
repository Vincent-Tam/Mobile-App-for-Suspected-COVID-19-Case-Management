import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import QuestionnaireHK from '../components/QuestionnaireHK'

const SurveyScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <QuestionnaireHK />
            </ScrollView>
        </SafeAreaView>
    )
}

export default SurveyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
        margin: 10,
        flexDirection: 'row',
    },
})