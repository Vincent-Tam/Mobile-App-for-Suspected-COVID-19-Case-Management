import React, {useState, useEffect, useReducer} from 'react'
import { StyleSheet, Text, View, Alert, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Toast from 'react-native-simple-toast'
import { useTranslation } from "react-i18next";
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { t } = useTranslation();

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in as: '+ user.email);
            Toast.show(t('Alert.loginSuccess'), Toast.LONG);
        })
        .catch(error => Alert.alert(t('Alert.fail'), 'Login failed! Please try again'))

    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {/*Login Title + photo*/}
            <Image style={styles.icon} source={require('../assets/COVID-Icon.jpg')}/>
            <Text style={styles.title}> {t('Login.name')}</Text>

            {/*form*/}
            <TextInput left={<TextInput.Icon name="email" />} style={styles.inputText} label={t('Login.email')} value={email} onChangeText={text => setEmail(text)}/>
            <TextInput left={<TextInput.Icon name="lock" />} style={styles.inputText} label={t('Login.password')} value={password} onChangeText={text => setPassword(text)} secureTextEntry/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
                >
                <Text style={styles.buttonText}>{t('Login.login')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signUpText}>
                <Text>{t('Login.reminderText')} </Text>
                <Text style={styles.textLink} onPress={()=>navigation.navigate('SignUp')}>{t('Login.reminderText2')}</Text>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 10,
    },
    icon: {
        height: 150,
        width: 150,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        marginTop: 10,
        marginBottom: 0,
        borderColor: "red",
        borderWidth: 5,
    },
    title:{
        width: '80%',
        fontSize: 20,
        fontWeight:'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        marginTop: 0,
        margin: 15, 
        padding: 10,
    },
    inputContainer: {
        width: '60%',
    },
    inputText: {
        margin: 10,
    },
    input: {
        backgroundColor:'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        borderStartWidth : 1,
        borderEndWidth : 1,
        borderTopWidth : 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#670485',
        width: '90%',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
        alignSelf: 'center',
    },
    signUpText: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    textLink: {
        color: 'purple',
    },
})
