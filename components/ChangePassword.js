import React, {useState} from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { TextInput, Button, Headline, Appbar } from 'react-native-paper'
import { useTranslation } from "react-i18next"
import { auth, db }  from '../firebase'

const ChangePassword = () => {
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const { t } = useTranslation();

    const handleChangePwd = () => {
        if(newPwd === confirmPwd) {
            var user = auth.currentUser;
            user.updatePassword(newPwd).then(()=>{
                Alert.alert(t('Account.success'), t('Account.changePwdSuccess'));
            })
            .catch(e => {
                switch (e.code) {
                    case 'auth/weak-password':
                        Alert.alert(t('Account.fail'), t('SignUp.weak-password'));
                        break;
                    default:
                        Alert.alert(t('Account.fail'), e.code);
                        break;
                }
            })
        }else {
            Alert.alert(t('Account.fail'), t('Account.notMatch'));
        }
    }

    return (
        <View>
            <Headline style={styles.Title}>Change Password</Headline>
            <TextInput left={<TextInput.Icon name="lock" />} style={styles.input} label={t('Account.newPwd')} value={newPwd} onChangeText={text => setNewPwd(text)} />
            <TextInput left={<TextInput.Icon name="lock" />} style={styles.input} label={t('Account.confirmPwd')} value={confirmPwd} onChangeText={text => setConfirmPwd(text)} />
            <Button style={styles.button} mode='contained' onPress={() => handleChangePwd()} uppercase={false}>{t('Account.submit')}</Button>
        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Title: {
        marginBottom: 10,
    },
    input: {
        margin: 5,
    },
    button: {
        width: '50%',
        margin: 10,
        alignSelf: 'center',
        backgroundColor: '#670485'
    }
})