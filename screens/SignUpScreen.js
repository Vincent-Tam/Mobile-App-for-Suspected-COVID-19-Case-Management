import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { TextInput, Button, Caption } from 'react-native-paper'
import DropDown from "react-native-paper-dropdown"
import Toast from 'react-native-simple-toast'
import { useTranslation } from "react-i18next";
import { auth } from '../firebase'
import { db } from '../firebase';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('') 
    const [area, setArea] = useState('') 
    const { t } = useTranslation();
    const [showAreaDropDown, setAreaShowDropDown] = React.useState(false);

    const areaList = [
        {
            label: t('Area.hongKong'),
            value: 'Hong Kong',
        },
        {
            label: t('Area.kowloon'),
            value: 'Kowloon',
        },
        {
            label: t('Area.newTerritories'),
            value: 'New Territories',
        }
    ]

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Registered with: " + user.email);
            // store user role to firestore
            db.collection('UserRole').doc(user.email).set({
                role: 'user',
                area: area,
                email: user.email,
            })
        }).then(()=>{
            Toast.show(t('Alert.signUpSuccess'), Toast.LONG);
        })
        .catch(e => {
            switch (e.code) {
                case 'auth/email-already-in-use':
                    alert(t('SignUp.email-already-in-use'));
                    navigation.navigate('Welcome');
                    break;
                case 'auth/weak-password':
                    alert(t('SignUp.weak-password'));
                    break;
                case 'auth/invalid-email':
                    alert(t('SignUp.invalid-email'));
                    break;
                default:
                    console.log(e.message);
            }
        })
    }

    const handleSubmit = () => {
        if(email!=''&&password!=''&&confirmPassword!=''){
            if(password == confirmPassword){
                handleSignUp();
            }else{
                alert(t('SignUp.notMatch'))
            }       
        }else{
            alert(t('SignUp.notComplete'))
        }
    }

    return (
        //form
        <KeyboardAvoidingView style={styles.container} behavior='height'>
            <TextInput left={<TextInput.Icon name="email" />} style={styles.input} label={t('SignUp.email')} value={email} onChangeText={text => setEmail(text)}/>
            <TextInput left={<TextInput.Icon name="lock" />} style={styles.input} label={t('SignUp.password')} value={password} onChangeText={text => setPassword(text)} secureTextEntry/>
            <TextInput left={<TextInput.Icon name="lock" />} style={styles.input} label={t('SignUp.confirmPassword')} value={confirmPassword} onChangeText={text => setConfirmPassword(text)} secureTextEntry/>
            <View style={styles.dropDown}>
                <DropDown
                style={styles.dropDown}
                label={t('SignUp.area')}
                visible={showAreaDropDown}
                showDropDown={() => setAreaShowDropDown(true)}
                onDismiss={() => setAreaShowDropDown(false)}
                value={area}
                setValue={setArea}
                list={areaList}
                />
            </View>
            <Caption style={styles.input}>{t('SignUp.reminderText')}</Caption>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleSubmit}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>{t('SignUp.submit')}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        margin: 10,
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
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },
    dropDown: {
        margin: 10,
    }
})
