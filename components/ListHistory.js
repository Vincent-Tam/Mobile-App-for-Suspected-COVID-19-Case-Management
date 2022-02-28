import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { List, Divider,Title, Headline } from 'react-native-paper'
import { auth, rtdb } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { useTranslation, Trans } from "react-i18next"


const ListHistory = () => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const { t } = useTranslation();
    const navigation = useNavigation();

    function getData() {
        let arr = [];
        const ref = rtdb.ref(`/${auth.currentUser?.uid}/records`);
        ref.on('value', (snapshot) => {
            // const data = snapshot.val();
            snapshot.forEach(child => {
                // console.log(child.val().title);
                // console.log(child.val().name);
                let record = child.val()
                record.key = child.val().Title
                arr.push(record)
            })
            console.log(arr)
          });
    }


    return (
        <View style={styles.container}>
            <Title>History submit:</Title>
            {getData()}
        </View>
    )
}

const snapshotToArray= snapshot=>{
    let returnArr=[]

    snapshot.forEach(childSnapshot => {
        childSnapshot.forEach(childSnapshot => {
            let item=childSnapshot.val()
            item.key=childSnapshot.key

            returnArr.push(item)
        })
    });
    console.log(returnArr);
    return returnArr;
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