import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { List, Divider,Title, Headline } from 'react-native-paper'
import { auth, rtdb } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { useTranslation, Trans } from "react-i18next"


const ListHistory = () => {
    const [expanded, setExpanded] = React.useState(true);

    const { t } = useTranslation();
    const navigation = useNavigation();

    function getData() {
        const ref = rtdb.ref(`/${auth.currentUser?.uid}/records`);
        ref.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);
          });
    }


    return (
        <View style={styles.container}>
            <Title>History submit:</Title>
            {getData()}
        </View>
    )
}

export default ListHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        margin: 10,
        backgroundColor: 'white'
    }
})