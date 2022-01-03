import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { NavigationContext, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { auth } from '../firebase'
import { t } from 'i18next';

const HomeScreen = ({route, navigation}) => {
    const url = 'https://www.coronavirus.gov.hk/chi/';
    const handleOpenUrl = () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = Linking.canOpenURL(url);
    
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
            Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    };
    return (
        <View style={styles.container}>
            <Card onPress={handleOpenUrl}>
                <Card.Title title={t('Home.cardTitle')} subtitle={t('Home.cardText')} titleNumberOfLines={2} />
                <Card.Cover source={{ uri: 'https://www.coronavirus.gov.hk/images/highlight/vaccine.jpg' }} />
                <Card.Actions><Button uppercase={false}>For more detail</Button></Card.Actions>
            </Card>
            <TouchableOpacity
                onPress={()=>navigation.navigate('Survey')}
                style={styles.button}
            >
                <MaterialCommunityIcons name='plus-circle' size={50} color='white'/>
                <Text style={styles.buttonText}>{t('Home.buttonText')}</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
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
        alignSelf: 'center'
    },
    buttonText: {
        fontSize:16,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
