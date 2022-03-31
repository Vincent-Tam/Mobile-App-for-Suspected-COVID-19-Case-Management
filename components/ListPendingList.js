import React, {useState,useEffect} from 'react'
import { StyleSheet, View, Modal, ScrollView } from 'react-native'
import { Button, Divider, Title, Paragraph, Subheading, Card } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { rtdb } from '../firebase'
import { useAuth } from './../contexts/AuthContent';
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from "react-i18next"


const ListPendingList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [pendingList2, setPendingList2] = useState([]);
    const [reRender, setRerender] = useState(0);
    const authContext = useAuth();
    const { t } = useTranslation();
    const navigation = useNavigation();
    
    useEffect(() => {
        getData();
    },[reRender]);

    const getData = async () =>{
        let pendingList = [];
        setPendingList2([]);
        const ref = rtdb.ref(`/${authContext.area}/pending`);
        await ref.on('value', (snapshot) => {
            snapshot.forEach(child => {
                let record = new Object;
                record.title = child.val().title,
                record.address = child.val().address,
                record.age = child.val().age,
                record.area = child.val().area,
                record.gender = child.val().gender,
                record.job = child.val().job,
                record.name = child.val().name,
                record.overseaAddress = child.val().overseaAddress,
                record.phone = child.val().phone,
                record.q1 = child.val().q1,
                record.q2 = child.val().q2,
                record.q3 = child.val().q3,
                record.q4 = child.val().q4,
                record.q5 = child.val().q5,
                record.q6 = child.val().q6,
                record.q7 = child.val().q7,
                record.q8 = child.val().q8,
                record.q9 = child.val().q9,
                record.state = child.val().state,
                record.submitter = child.val().submitter,
                // Store object in the array
                pendingList.push(record)
            })
        });
        setPendingList2(pendingList);
    }

    const handleModal = (value) => {
        setModalOpen(true);
        setModalData(value);
    }

    const handleRefresh = () => {
        setRerender(prev => prev+1);
    }

    const handleConfirm = () => {
        const newData = {
            address : modalData.address,
            age : modalData.age,
            area : modalData.area,
            gender : modalData.gender,
            job : modalData.job,
            name : modalData.name,
            overseaAddress : modalData.overseaAddress,
            phone : modalData.phone,
            q1 : modalData.q1,
            q2 : modalData.q2,
            q3 : modalData.q3,
            q4 : modalData.q4,
            q5 : modalData.q5,
            q6 : modalData.q6,
            q7 : modalData.q7,
            q8 : modalData.q8,
            q9 : modalData.q9,
            state : "confirm",
            submitter : modalData.submitter,
            title : modalData.title
        }
        // update the state of the record in submitter
        const updates = {};
        updates[`/records/${modalData.submitter}/${modalData.title}/state`]='confirm';
        rtdb.ref().update(updates);
        // remove record from pending category
        rtdb.ref(`/${authContext.area}/pending/${modalData.title}`).remove();
        // add recode to confirm category for enquiry
        rtdb.ref(`/${authContext.area}/confirm/${modalData.title}`).set(newData).then(function(){
            alert(t('Alert.confirmSuccess'));
            navigation.reset({
                index: 0,
                routes: [{ name: 'Pending Records' }],
            });
        }).catch(
            err => {alert(t('Alert.confirmFail'));}
        );
    };

    const handleReject = () => {
        const newData = {
            address : modalData.address,
            age : modalData.age,
            area : modalData.area,
            gender : modalData.gender,
            job : modalData.job,
            name : modalData.name,
            overseaAddress : modalData.overseaAddress,
            phone : modalData.phone,
            q1 : modalData.q1,
            q2 : modalData.q2,
            q3 : modalData.q3,
            q4 : modalData.q4,
            q5 : modalData.q5,
            q6 : modalData.q6,
            q7 : modalData.q7,
            q8 : modalData.q8,
            q9 : modalData.q9,
            state : "reject",
            submitter : modalData.submitter,
            title : modalData.title
        }
        // update the state of the record in submitter
        const updates = {};
        updates[`/records/${modalData.submitter}/${modalData.title}/state`]='reject';
        rtdb.ref().update(updates);
        // remove record from pending category
        rtdb.ref(`/${authContext.area}/pending/${modalData.title}`).remove();
        // add recode to reject category for enquiry
        rtdb.ref(`/${authContext.area}/reject/${modalData.title}`).set(newData).then(function(){
            alert(t('Alert.rejectSuccess'));
            navigation.reset({
                index: 0,
                routes: [{ name: 'Pending Records' }],
            });
        }).catch(
            err => {alert(t('Alert.rejectFail'));}
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView>
            <Modal visible={modalOpen} animationType='slide'>
                <ScrollView>
                <View style={styles.modalContent}>
                    <MaterialCommunityIcons style={styles.modalToggle} name='close' size={24} onPress={()=>setModalOpen(false)}/>
                    <Subheading>{t('SurveyHK.name')}: {modalData.name}</Subheading>
                    <Paragraph>{t('SurveyHK.gender')}: {modalData.gender}</Paragraph>
                    <Paragraph>{t('SurveyHK.age')}: {modalData.age}</Paragraph>
                    <Paragraph>{t('SurveyHK.phone')}: {modalData.phone}</Paragraph>
                    <Paragraph>{t('SurveyHK.address')}: {modalData.address}</Paragraph>
                    <Paragraph>{t('SurveyHK.overseaAddress')}: {modalData.overseaAddress}</Paragraph>
                    <Paragraph>{t('SurveyHK.job')}: {modalData.job}</Paragraph>
                    <Paragraph>Date: {modalData.title}</Paragraph>
                    <Divider />
                    <Subheading  style={styles.question}>{t('SurveyHK.q1')}</Subheading>
                    <Paragraph>Ans: {modalData.q1}</Paragraph>
                    <Subheading style={styles.question}>{t('SurveyHK.q2')}</Subheading>
                    <Paragraph>Ans: {modalData.q2}</Paragraph>
                    <Subheading style={styles.question}>{t('SurveyHK.q3')}</Subheading>
                    <Paragraph>Ans: {modalData.q3}</Paragraph>
                    <Subheading style={styles.question}>{t('SurveyHK.q4')}</Subheading>
                    <Paragraph>Ans: {modalData.q4}</Paragraph>
                    <Subheading style={styles.question}>{t('SurveyHK.q5')}</Subheading>
                    <Paragraph>Ans: {modalData.q5}</Paragraph>
                    <Subheading style={styles.question}>{t('SurveyHK.q6')}</Subheading>
                    <Paragraph>Ans: {modalData.q6}</Paragraph>
                    <Subheading style={styles.question}>{t('SurveyHK.q7')}</Subheading>
                    <Paragraph>Ans: {modalData.q7}</Paragraph>
                    <Subheading style={styles.question}>{t('SurveyHK.q8')}</Subheading>
                    <Paragraph>Ans: {modalData.q8}</Paragraph>
                    <Subheading style={styles.question}>{t('SurveyHK.q9')}</Subheading>
                    <Paragraph>Ans: {modalData.q9}</Paragraph>
                    <Divider />
                </View>
                <View style={styles.modalButton}>
                    <Button icon="check-circle" style={styles.confirmButton} mode="contained" onPress={()=>handleConfirm()}>{t('PendingList.confirm')}</Button>
                    <Button icon="close-box" style={styles.rejectButton} mode="contained" onPress={()=>handleReject()}>{t('PendingList.reject')}</Button>
                </View>
                </ScrollView>
            </Modal>
            <View style={styles.heading}>
                <MaterialCommunityIcons style={styles.modalToggle} name='refresh' size={24} onPress={()=>handleRefresh()}/>
                <Title>{t('PendingList.heading')}</Title>
            </View>
            {pendingList2.length!=0 ? pendingList2.map((value,index) => (
                <View key={value.title}>
                <Card>
                    <Card.Content>
                        <Title>{value.name}</Title>
                        <Subheading>State: {value.state} </Subheading>
                        <Paragraph>Submission time: {value.title}</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => handleModal(value)}>{t('PendingList.more')}</Button>
                    </Card.Actions>
                </Card>
                <Divider />
                </View>
            )): <Card><Card.Title title={t('PendingList.noRecord')}></Card.Title></Card>}
            </ScrollView>
        </View>
    )
}

export default ListPendingList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white'
    },
    heading: {
        flexDirection: 'row',
    },
    modalContent: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white'
    },
    modalToggle: {
        marginBottom:5,
        borderColor: '#f2f2f2',
        padding: 5,
        color: 'black',
        alignSelf: 'center',
    },
    modalButton: {
        flexDirection: 'row',
        margin: 10,
        alignSelf: 'center'
    },
    confirmButton: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: 'green',
    },
    rejectButton: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: 'red',
    },
    question: {
        fontWeight: 'bold',
    }
})