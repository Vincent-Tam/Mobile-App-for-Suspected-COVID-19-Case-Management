import React, {useState} from 'react'
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import { Button, Title, Divider } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ExportScreen = () => {

    const [reRender, setRerender] = useState(0);

    const handleRefresh = () => {
        setRerender(prev => prev+1);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headingBar}>
                    <MaterialCommunityIcons style={styles.refreshButton} name='refresh' size={24} onPress={()=>handleRefresh()}/>
                    <Button icon="export-variant" style={styles.button2} mode="contained" uppercase={false} onPress={() => console.log('Pressed')}>
                        Export Data
                    </Button>
                </View>
                <Text>Total confirm cases: 3</Text>
                <Text>New Territories: 2</Text>
                <Text>Kowloon: 0</Text>
                <Text>Hong Kong: 1</Text>


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
    button2: {
        //margin: 20,
        width: '40%',
        
    }
})