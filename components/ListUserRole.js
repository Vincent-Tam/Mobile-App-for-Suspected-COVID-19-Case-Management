import React, {useState,useEffect} from 'react'
import { StyleSheet, View, ScrollView, Modal, Alert } from 'react-native'
import { Button, Divider, Title, Paragraph, Subheading, Card, TextInput } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { db } from '../firebase'
import { useAuth } from './../contexts/AuthContent';
import { useTranslation } from 'react-i18next'


const ListUserRole = () => {
    const [userList, setUserList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [newRole, setNewRole] = useState('');
    const [reRender, setRerender] = useState(0);
    const { t } = useTranslation();
    const authContext = useAuth();

    useEffect(() => {
        getData();
    },[reRender]);

    const getData = async() => {
        let tmp_userList = [];
        setUserList([]);
        const docRef = db.collection("UserRole");
        // fetch all user from database
        await docRef.get().then ((querySnapshot) => {
            querySnapshot.forEach(snapshot => {
                let data = snapshot.data();
                //push all user object into array
                tmp_userList.push(data);
            })
        });
        setUserList(tmp_userList);
    }
    
    const handleModal = (value) => {
        setModalOpen(true);
        setModalData(value);
    }

    const handleUpdateRole = () => {
        const currentRole = modalData.role;
        if(newRole == currentRole){
            Alert.alert('Warning','Same role. No need to change!');
        }else if(newRole != 'user' && newRole != 'staff' && newRole != 'admin') {
            Alert.alert('Warning','Not acceptable role!');
        }else {
            const docRef = db.collection("UserRole").doc(modalData.email);
            return docRef.update({
                role: newRole
            }).then(() => {
                Alert.alert('Successful','The role change successfully!');
                setModalOpen(false);
            });
        }
    }

    const handleRefresh = () => {
        setRerender(prev => prev+1);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Modal visible={modalOpen} animationType='slide'>
                    <ScrollView>
                        <View style={styles.modalContent}>
                            <MaterialCommunityIcons style={styles.modalToggle} name='close' size={24} onPress={()=>setModalOpen(false)}/>
                            <Subheading style={styles.textInput}>Email: {modalData.email}</Subheading>
                            <Subheading style={styles.textInput}>Current role: {modalData.role}</Subheading>
                            <TextInput style={styles.textInput} label='New role' mode='outlined' value={newRole} onChangeText={newRole => setNewRole(newRole)} />
                            <Subheading style={styles.reminder}>
                                *Acceptable role: user, staff, admin
                            </Subheading>
                            <Button icon="check-circle" style={styles.button} mode="contained" onPress={()=>handleUpdateRole()} uppercase={false}>Update role</Button>

                        </View>
                    </ScrollView>
                </Modal>
                <View style={styles.heading}>
                    <MaterialCommunityIcons style={styles.modalToggle} name='refresh' size={24} onPress={()=>handleRefresh()}/>
                    <Title>User: </Title>
                </View>
                {userList.length!=0 ? userList.map((value) => (
                    <View key={value.email} style={styles.card}>
                    <Card>
                        <Card.Content>
                            <Title>{value.email}</Title>
                            <Subheading>Role: {value.role} </Subheading>
                            <Paragraph>Area: {value.area}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => handleModal(value)}>Modify</Button>
                        </Card.Actions>
                    </Card>
                    <Divider />
                    </View>
                )): <Card><Card.Title title='No user'></Card.Title></Card>}
            </ScrollView>
        </View>
    )
}

export default ListUserRole

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white'
    },
    heading: {
        flexDirection: 'row',
        // justifyContent: 'space-evenly'
    },
    card: {
        margin: 10
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
    textInput: {
        margin: 10
    },
    reminder: {
        margin: 20,
        marginBottom: 10,
    },
    button: {
        marginLeft: 100,
        marginRight: 100,
        padding: 5,
    }
})