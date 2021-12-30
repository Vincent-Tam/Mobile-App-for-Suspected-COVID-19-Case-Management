import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import i18n from './i18n.config'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './navigation/AuthStack'
import MainStack from './navigation/MainStack'
import { auth } from './firebase'
import './i18n.config';

const globalScreenOptions = {
  headerStyle:{backgroundColor: '#670485'},
  headerTitleStyle:{color: 'white'},
  headerTintColor: 'white',
  headerTitleAlign: 'center',
};
// export default class App extends React.Component {
export default function App(){
  return(
    //TODO: Check Login MainStack or AuthStack
    // <AuthStack/>
    <PaperProvider>
      <NavigationContainer>
        <AuthStack/>
      </NavigationContainer>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
