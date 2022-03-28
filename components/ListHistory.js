import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Title, Paragraph, Subheading, Card } from 'react-native-paper'
import { auth, rtdb } from '../firebase'
import { useNavigation, useIsFocused  } from '@react-navigation/native'
import { useTranslation } from "react-i18next"


const ListHistory = () => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const { t } = useTranslation();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    let arr = [];
    if(isFocused) {
        const ref = rtdb.ref(`/records/${auth.currentUser?.uid}`);
        ref.on('value', (snapshot) => {
            snapshot.forEach(child => {
                let record = new Object;
                record.title= child.val().title
                record.address= child.val().address
                record.gender= child.val().gender
                record.name= child.val().name
                record.state= child.val().state
                arr.push(record)
            })
        });
    } else {
        // const ref = rtdb.ref(`/records/${auth.currentUser?.uid}`);
        // ref.on('value', (snapshot) => {
        //     snapshot.forEach(child => {
        //         let record = new Object;
        //         record.title= child.val().title
        //         record.address= child.val().address
        //         record.gender= child.val().gender,
        //         record.name= child.val().name,
        //         record.state= child.val().state
        //         arr.push(record)
        //     })
        // });
    }

    function getData() {
        let arr = [];
        const ref = rtdb.ref(`/records/${auth.currentUser?.uid}`);
        ref.on('value', (snapshot) => {
            snapshot.forEach(child => {
                // console.log(child.val().title);
                // console.log(child.val().name);
                // let record = child.val()
                // record.key = child.val().Title
                let record = new Object;
                record.title= child.val().title
                record.address= child.val().address
                // record.age= child.val().age,
                // record.area= child.val().area,
                record.gender= child.val().gender,
                // record.job= child.val().job,
                record.name= child.val().name,
                // record.overseaAddress= child.val().overseaAddress,
                // record.phone= child.val().phone,
                // record.q1= child.val().q1,
                // record.q2= child.val().q2,
                // record.q3= child.val().q3,
                // record.q4= child.val().q4,
                // record.q5= child.val().q5,
                // record.q6= child.val().q6,
                // record.q7= child.val().q7,
                // record.q8= child.val().q8,
                // record.q9= child.val().q9,
                record.state= child.val().state
                arr.push(record)
            })
            // for(let i = 0; i < arr.length; i++){
            //     console.log(arr[i].title);
            // }
            setRecords(arr);
        });
    }


    return (
        <View style={styles.container}>
            <Title>{t('History.heading')}</Title>
            {arr.length!=0 ? arr.map((value,index) => (
                <View key={value.title}>
                <Card>
                    <Card.Content>
                        <Title>{value.name}</Title>
                        <Subheading>State: {value.state} </Subheading>
                        <Paragraph>Submission time: {value.title}</Paragraph>
                    </Card.Content>
                </Card>
                <Divider />
                </View>
            )): <Card><Card.Title title={t('History.noRecord')}></Card.Title></Card>}
        </View>
    )
}

export default ListHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white'
    }
})