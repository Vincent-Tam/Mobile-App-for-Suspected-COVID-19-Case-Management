import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Button, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { auth } from '../firebase'
import { db } from '../firebase';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('') 

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Registeredw ith: " + user.email);
            // store user role to firestore
            db.collection('UserRole').doc(user.email).set({
                role: 'user',
            })
        }).then(()=>{
            ToastAndroid.show('Sign up successfully!', ToastAndroid.SHORT);
            navigation.navigate('Welcome');
        })
        .catch(e => {
            switch (e.code) {
                case 'auth/email-already-in-use':
                    alert('The email was registered! Please login in');
                    navigation.navigate('Welcome');
                    break;
                case 'auth/weak-password':
                    alert('Password must at least 6 digits! Please try again');
                    break;
                case 'auth/invalid-email':
                    alert('Must have a valid email! Please try again');
                    break;
            }
        })
    }

    const handleSubmit = () => {
        if(email!=''&&password!=''&&confirmPassword!=''){
            if(password == confirmPassword){
                handleSignUp()
                console.log('Same')
            }else{
                alert('Your password and confirmation password do not match. Please try again')
            }       
        }else{
            alert('All fields must be filled. Please try again')
        }
    }

    return (
        //form
        <KeyboardAvoidingView style={styles.container} behavior='height'>
            <View style={styles.inputContainer}>
                <TextInput 
                placeholder='Email Address'
                type='email'
                value = {email}
                onChangeText = {text => setEmail(text)}
                style={styles.input}

                />
                <TextInput 
                placeholder='Password'
                value = {password}
                onChangeText = {text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                />
                <TextInput 
                placeholder='Confirm Password'
                value = {confirmPassword}
                onChangeText = {text => setConfirmPassword(text)}
                style={styles.input}
                secureTextEntry
                />
                <Text style={{marginTop:10}}> Password must at least 6 digits </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleSubmit}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor:'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
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
})
