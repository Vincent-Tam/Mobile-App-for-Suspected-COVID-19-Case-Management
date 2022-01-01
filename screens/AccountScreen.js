import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Portal, Modal } from 'react-native-paper'
import Toast from 'react-native-simple-toast'
import { useTranslation } from "react-i18next"
import { auth } from '../firebase'
import { useAuth } from './../contexts/AuthContent';
import ChangePassword from '../components/ChangePassword'

const AccountScreen = () => {
    const [role, setRole] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, margin: 10};
    const { t } = useTranslation();
    const authContext = useAuth();

    const handleSignOut = () => {
        auth.signOut()
        .then(value => {
            Toast.show(t('Alert.signOut'), Toast.LONG);
        })
        .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Avatar.Icon style={styles.avatar} size={50} icon='account'/>
                <View>
                    <Text>Account: {auth.currentUser?.email}</Text>
                    <Text>Role: {authContext.role}</Text>
                </View>
            </View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ChangePassword />
                </Modal>
            </Portal>
            
            <Button mode='contained' icon='lock' style={styles.button} onPress={showModal} uppercase={false} >{t('Account.changePwd')}</Button>
            <Button mode='contained' icon='logout' style={styles.button} onPress={() => handleSignOut()} uppercase={false} >{t('Account.signOut')}</Button>
        </View>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        margin: 10,
    },
    button: {  
        backgroundColor: "#670485",
        padding: 5,
        margin: 10,
        borderRadius: 10,
        width: 200,
    },
    paragraph: {
        color: 'white',
        fontSize: 16,
    }
})
