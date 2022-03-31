import React, {useState,useEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Title, Paragraph, Subheading, Card } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { auth, rtdb } from '../firebase'
import { useNavigation, useIsFocused  } from '@react-navigation/native'
import { useTranslation } from "react-i18next"


const ListHistory = () => {
    const [reRender, setRerender] = useState(0);
    const [data, setData] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        getData();
    },[reRender]);

    const getData = () => {
        let arr = [];
        setData([]);
        const ref = rtdb.ref(`/records/${auth.currentUser?.uid}`);
        ref.on('value', (snapshot) => {
            snapshot.forEach(child => {
                let record = new Object;
                record.title= child.val().title
                record.address= child.val().address
                record.gender= child.val().gender
                record.name= child.val().name
                record.state= child.val().state
                arr.push(record);
            })
            setData(arr);
        });
    }

    const handleRefresh = () => {
        setRerender(prev => prev+1);
    }

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <MaterialCommunityIcons style={styles.modalToggle} name='refresh' size={24} onPress={()=>handleRefresh()}/>
                <Title>{t('History.heading')}</Title>
            </View>
            {data.length!=0 ? data.map((value) => (
                <View key={value.title}>
                <Card>
                    <Card.Content>
                        <Title>{value.name}</Title>
                        <Subheading>{t('History.state')}: {value.state} </Subheading>
                        <Paragraph>{t('History.date')}: {value.title}</Paragraph>
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
    },
    heading: {
        flexDirection: 'row',
    },
    modalToggle: {
        marginBottom:5,
        borderColor: '#f2f2f2',
        padding: 5,
        color: 'black',
        alignSelf: 'center',
    },
})