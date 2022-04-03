import React, {useState, useEffect} from 'react'
import {StyleSheet, View, SafeAreaView} from 'react-native'
import { Title, Headline, Subheading } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { rtdb } from '../firebase'
import { useAuth } from './../contexts/AuthContent';
import { useTranslation } from 'react-i18next'

const StaffResultScreen = () => {

    const [reRender, setRerender] = useState(0);
    const [total, setTotal] = useState(0);
    const [cCount, setCCount] = useState(0);
    const [rCount, setRCount] = useState(0);
    const [data, setData] = useState([]);
    const authContext = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        getData();
    },[reRender]);

    const handleRefresh = () => {
        setRerender(prev => prev+1);
    }

    const getData = () => {
        let cList = [];
        let rList = [];
        let c_Count = 0;
        let r_Count = 0;
        let total = 0;
        setTotal(0);
        setCCount(0);
        setRCount(0);
        // define database path
        const con_ref = rtdb.ref(`/${authContext.area}/confirm`);
        const reject_ref = rtdb.ref(`/${authContext.area}/reject`);
        //Get corresponding area confirm data
        con_ref.on('value', (snapshot) => {
            snapshot.forEach(child => {
                cList.push(snapshot);
            })
            if(cList[0]!=null){
                c_Count = cList.length;
                setCCount(c_Count);
            }
        });
        //Get corresponding area reject data
        reject_ref.on('value', (snapshot) => {
            snapshot.forEach(child => {
                rList.push(snapshot);
            })
            if(rList[0]!=null){
                r_Count = rList.length;
                setRCount(r_Count);
            }
        });
        // Calculate the total cases of the corresponding area
        total = c_Count+r_Count;
        setTotal(total);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headingBar}>
                    <MaterialCommunityIcons style={styles.refreshButton} name='refresh' size={30} onPress={()=>handleRefresh()}/>
                    <Title>{t('ExportScreen.area')}: {authContext.area}</Title>
                </View>
                <View style={styles.text}>
                    <Subheading>{t('ExportScreen.total')}: {total}</Subheading>
                    <Subheading>{t('ExportScreen.confirmCases')}: {cCount}</Subheading>
                    <Subheading>{t('ExportScreen.rejectCases')}: {rCount}</Subheading>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default StaffResultScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    refreshButton: {

    },
    content: {
        margin: 10
    },
    headingBar: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 10
    },
    button: {
        width: '40%',
    },
    text: {
        margin: 10
    }
})