import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Alert } from 'react-native'
import { TextInput, Button, RadioButton, Divider, Subheading } from 'react-native-paper'
import DropDown from "react-native-paper-dropdown"
import DateTimePicker from '@react-native-community/datetimepicker'
import { useTranslation, Trans } from "react-i18next"
import Moment from 'moment'
import { auth, rtdb } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const QuestionnaireHK = () => {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [job, setJob] = React.useState('');
    const [age, setAge] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [q1, setQ1] = React.useState('');
    const [q2, setQ2] = React.useState('');
    const [q3, setQ3] = React.useState('');
    const [q4, setQ4] = React.useState('');
    const [q5, setQ5] = React.useState('');
    const [q6, setQ6] = React.useState('');
    const [q7, setQ7] = React.useState('');
    const [q8, setQ8] = React.useState('');
    const [q9, setQ9] = React.useState('');
    const [overseaAddress, setOverseaAddress] = React.useState(''); 

    const [showGenderDropDown, setGenderShowDropDown] = React.useState(false);
    const [showAgeDropDown, setAgeShowDropDown] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
    const [showOversea, setShowOversea] = React.useState(false);
    const { t } = useTranslation();
    const navigation = useNavigation();
    const genderList = [
        {
            label: "Male",
            value: "Male",
        },
        {
            label: "Female",
            value: "Female",
        },
        {
            label: "Others",
            value: "Others",
        },
    ];

    const ageList = [
        {
            label: "Below 12",
            value: "Below 12",
        },
        {
            label: "12-17",
            value: "12-17",
        },
        {
            label: "18-29",
            value: "18-29",
        },
        {
            label: "30-39",
            value: "30-39",
        },
        {
            label: "40-49",
            value: "40-49",
        },
        {
            label: "50-59",
            value: "50-59",
        },
        {
            label: "60-69",
            value: "60-69",
        },
        {
            label: "70-79",
            value: "70-79",
        },
        {
            label: "80+",
            value: "80+",
        },
    ];

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const overseaHandler = (value) => {
        if(value == 'Yes'){
            setQ2(value);
            setShowOversea(true);
        }else{
            setQ2(value);
            setShowOversea(false);
        }
    }

    const onSubmit = () => {
        if(name!=''&&phone!=''&&address!=''&&job!=''&&age!=''&&gender!=''&&q1!=''&&q2!=''&&q3!=''&&q4!=''&&q5!=''&&q6!=''&&q7!=''&&q8!=''&&q9!='') {
            if(q2 == 'No')
                setOverseaAddress('');
            rtdb.ref(`/${auth.currentUser?.uid}/records/${Moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`).set({
                name: name,
                phone: phone,
                address: address,
                job: job,
                age: age,
                gender: gender,
                q1: q1,
                q2: q2,
                overseaAddress: overseaAddress,
                q4: q4,
                q5: q5,
                q6: q6,
                q7: q7,
                q8: q8,
                q9: q9,
                state: 'pending',
            }).then(function(){
                alert(t('surveyHK.submitSuccess'));
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }).catch(error =>{
                Alert.alert('Fail', error.message);
            });
        }else {
            Alert.alert('Fail', 'All question must be answered!');
        }
    }

    return (
        <>
        <Subheading>{t('surveyHK.reminder')}</Subheading>
        <TextInput style={styles.textInput} label={t('surveyHK.name')} mode='outlined' value={name} onChangeText={name => setName(name)} />
        <TextInput style={styles.textInput} label={t('surveyHK.phone')} mode='outlined' value={phone} keyboardType='numeric' onChangeText={phone => setPhone(phone)} />
        <TextInput style={styles.textInput} label={t('surveyHK.address')} mode='outlined' value={address} onChangeText={address => setAddress(address)} />
        <TextInput style={styles.textInput} label={t('surveyHK.job')} mode='outlined' value={job} onChangeText={job => setJob(job)} />
        <DropDown
        style={styles.dropDown}
        label={t('surveyHK.gender')}
        mode={"outlined"}
        visible={showGenderDropDown}
        showDropDown={() => setGenderShowDropDown(true)}
        onDismiss={() => setGenderShowDropDown(false)}
        value={gender}
        setValue={setGender}
        list={genderList}
        />      
        <DropDown
        style={styles.dropDown}
        label={t('surveyHK.age')}
        mode={"outlined"}
        visible={showAgeDropDown}
        showDropDown={() => setAgeShowDropDown(true)}
        onDismiss={() => setAgeShowDropDown(false)}
        value={age}
        setValue={setAge}
        list={ageList}
        />
        <View style={styles.date}>
        <Button style={styles.button} icon='calendar' mode='outlined' onPress={showDatepicker} uppercase={false}>{t('surveyHK.datePicker')}</Button>
        {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode='date'
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
            />
        )}
        <TextInput style={styles.dateDisplay} mode='outlined' disabled>{Moment(date).format('DD-MM-YYYY')}</TextInput>
        </View>
        <RadioButton.Group onValueChange={value => setQ1(value)} value={q1} >
            <Text style={styles.questionText}>{t('surveyHK.q1')}</Text>
            <RadioButton.Item label='Yes' value='Yes'/>
            <RadioButton.Item label='No' value='No'/>
        </RadioButton.Group>
        <Divider />
        <RadioButton.Group onValueChange={value => overseaHandler(value)} value={q2} >
            <Text style={styles.questionText}>{t('surveyHK.q2')}</Text>
            <RadioButton.Item label='Yes' value='Yes' />
            <RadioButton.Item label='No' value='No' />
        </RadioButton.Group>
        {showOversea && <TextInput style={styles.textInput} mode='outlined' label={t('surveyHK.overseaAddress')} value={overseaAddress} onChangeText={overseaAddress => setOverseaAddress(overseaAddress)}/>}
        <Divider />
        <RadioButton.Group onValueChange={value => setQ3(value)} value={q3} >
            <Text style={styles.questionText}>{t('surveyHK.q3')}</Text>
            <RadioButton.Item label='Yes' value='Yes'/>
            <RadioButton.Item label='No' value='No'/>
        </RadioButton.Group>
        <Divider />
        <RadioButton.Group onValueChange={value => setQ4(value)} value={q4} >
            <Text style={styles.questionText}>{t('surveyHK.q4')}</Text>
            <RadioButton.Item label='Yes' value='Yes'/>
            <RadioButton.Item label='No' value='No'/>
        </RadioButton.Group>
        <Divider />
        <RadioButton.Group onValueChange={value => setQ5(value)} value={q5} >
            <Text style={styles.questionText}>{t('surveyHK.q5')}</Text>
            <RadioButton.Item label='Yes' value='Yes'/>
            <RadioButton.Item label='No' value='No'/>
        </RadioButton.Group>
        <Divider />
        <RadioButton.Group onValueChange={value => setQ6(value)} value={q6} >
            <Text style={styles.questionText}>{t('surveyHK.q6')}</Text>
            <RadioButton.Item label='Yes' value='Yes'/>
            <RadioButton.Item label='No' value='No'/>
        </RadioButton.Group>
        <Divider />
        <RadioButton.Group onValueChange={value => setQ7(value)} value={q7} >
            <Text style={styles.questionText}>{t('surveyHK.q7')}</Text>
            <RadioButton.Item label='Yes' value='Yes'/>
            <RadioButton.Item label='No' value='No'/>
        </RadioButton.Group>
        <Divider />
        <RadioButton.Group onValueChange={value => setQ8(value)} value={q8} >
            <Text style={styles.questionText}>{t('surveyHK.q8')}</Text>
            <RadioButton.Item label={t('surveyHK.q8_Option1')} value='had direct physical contact'/>
            <RadioButton.Item label={t('surveyHK.q8_Option2')} value='shared eating or drinking utensils'/>
            <RadioButton.Item label={t('surveyHK.q8_Option3')} value='been sneezed on or coughed on by confirmed patients'/>
            <RadioButton.Item label={t('surveyHK.no')} value='No'/>
        </RadioButton.Group>
        <Divider />
        <RadioButton.Group onValueChange={value => setQ9(value)} value={q9} >
            <Text style={styles.questionText}>{t('surveyHK.q9')}</Text>
            <RadioButton.Item label={t('surveyHK.q9_Option1')} value='Yes, result was positive' />
            <RadioButton.Item label={t('surveyHK.q9_Option2')} value='Yes, result was negative' />
            <RadioButton.Item label={t('surveyHK.q9_Option3')} value='Yes, still waiting for the result' />
            <RadioButton.Item label={t('surveyHK.q9_Option4')} value='No, have not been tested' />
        </RadioButton.Group>
        <Divider />
        <Button style={styles.submit} uppercase={false} mode='contained'onPress={()=>onSubmit()}>Submit</Button>
        </>
    );
}

export default QuestionnaireHK

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        margin: 10,
        flexDirection: 'row',
    },
    questionText:{
        fontSize: 18,
    },
    textInput: {
        margin: 5,
    },
    button: {
        width: '40%',
        margin: 10,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
    dropDown: {
        margin: 5,
    },
    date: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    dateDisplay: {
        width: '50%',
        justifyContent:'center',
        alignContent: 'center',
        margin: 5,
    },
    radioView: {
        flexDirection:'row',
        alignContent: 'center',
        alignContent: 'center',
    },
    submit: {
        margin: 20,
        padding: 5,
        alignSelf: 'center',
        width: '50%',
    }
})