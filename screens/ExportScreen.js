import React, {useState, useEffect} from 'react'
import {StyleSheet, View, SafeAreaView} from 'react-native'
import { Button, Title } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { rtdb } from '../firebase'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useTranslation } from 'react-i18next'

const ExportScreen = () => {

    const [reRender, setRerender] = useState(0);
    const [total, setTotal] = useState(0);
    const [ntCount, setNTCount] = useState(0);
    const [kCount, setKCount] = useState(0);
    const [hkCount, setHKCount] = useState(0);
    const [data, setData] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        getData();
    },[reRender]);

    const handleRefresh = () => {
        setRerender(prev => prev+1);
    }

    const getData = () => {
        let ntList = [];
        let kowloonList = [];
        let hkList = [];
        let ntCount = 0;
        let kCount = 0;
        let hkCount = 0;
        setTotal(0);
        setNTCount(0);
        setKCount(0);
        setHKCount(0);
        // define database path
        const NT_ref = rtdb.ref(`/New Territories/confirm`);
        const K_ref = rtdb.ref(`/Kowloon/confirm`);
        const HK_ref = rtdb.ref(`/Hong Kong/confirm`);
        //Get New Terrritories data
        NT_ref.on('value', (snapshot) => {
            snapshot.forEach(child => {
                ntList.push(snapshot);
            })
            if(ntList[0]!=null){
                ntCount = ntList.length;
                setNTCount(ntCount.length);
            }
        });
        //Get Kowloon data
        K_ref.on('value', (snapshot) => {
            snapshot.forEach(child => {
                kowloonList.push(snapshot);
            })
            if(kowloonList[0]!=null){
                kCount = kowloonList.length;
                setKCount(kowloonList.length);
            }
        });
        //Get Hong Kong data
        HK_ref.on('value', (snapshot) => {
            snapshot.forEach(child => {
                hkList.push(snapshot);
            })
            if(hkList[0]!=null){
                hkCount = hkList.length;
                setHKCount(hkList.length);
            }
        });
        //Get database JSON
        rtdb.ref().on('value', (snapshot) => {
            setData(JSON.stringify(snapshot));
        });
        const total = ntCount+kCount+hkCount;
        setTotal(total);
    }

    const print = async () => {
        const html = `
            <html>
                <body>
                    ${JSON.stringify(data)}
                </body>
            </html>
        `;
        const { uri } = await Print.printToFileAsync({
            html,
        });
        //Print to PDF File
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headingBar}>
                    <MaterialCommunityIcons style={styles.refreshButton} name='refresh' size={30} onPress={()=>handleRefresh()}/>
                    <Button icon="export-variant" style={styles.button} mode="contained" uppercase={false} onPress={() => print()}>
                        {t('ExportScreen.exportButton')}
                    </Button>
                </View>
                <View style={styles.text}>
                    <Title>{t('ExportScreen.totalConfirm')}: {total}</Title>
                    <Title>{t('ExportScreen.nt')}: {ntCount}</Title>
                    <Title>{t('ExportScreen.kowloon')}: {kCount}</Title>
                    <Title>{t('ExportScreen.hk')}: {hkCount}</Title>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default ExportScreen

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
        justifyContent: 'space-between',
        marginBottom: 10
    },
    button: {
        width: '40%',
    },
    text: {
        margin: 10
    }
})