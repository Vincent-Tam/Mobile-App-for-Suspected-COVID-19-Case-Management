import React, {useState, useEffect, useReducer} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Button, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import { useTranslation, Trans } from "react-i18next";
import { auth } from '../firebase'
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                console.log(user);
                navigation.replace("MainStack");
            }
        })
        return unsubscribe
    }, [])

    const { t } = useTranslation();

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in as: '+ user.email);
            ToastAndroid.show('Login successfully!', ToastAndroid.SHORT);
        })
        .catch(error => alert('Login failed! Please try again'))
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {/*Login Title + photo*/}
            <Image style={styles.icon} source={require('../assets/COVID-Icon.jpg')}/>
            <Text style={styles.title}> Hong Kong Suspected COVID-19 Case Management System</Text>

            {/*form*/}
            <View style={styles.inputContainer}>
                    <TextInput
                    placeholder={t('Login.email')}
                    value = {email}
                    onChangeText = {text => setEmail(text)}
                    style={styles.input}
                    />
                    <TextInput
                    placeholder={t('Login.password')}
                    value = {password}
                    onChangeText = {text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                    />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
                >
                <Text style={styles.buttonText}>{t('Login.login')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signUpText}>
                <Text>Don't have an account already? </Text>
                <Text style={styles.textLink} onPress={()=>navigation.navigate('SignUp')}>Sign up</Text>
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
    },
    icon: {
        height: 150,
        width: 150,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
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
        marginTop: 0,
        margin: 15, 
        padding: 10,
    },
    inputContainer: {
        width: '60%',
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
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#670485',
        width: '90%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
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
