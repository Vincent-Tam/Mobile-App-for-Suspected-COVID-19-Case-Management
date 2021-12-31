import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { AuthProvider,useAuth } from './contexts/AuthContent'
import { NavigationContainer } from '@react-navigation/native'
import AppStack from './navigation/AppStack'
import './i18n.config';

export default function App(){
	return(
		<PaperProvider>
			<NavigationContainer>
				<AuthProvider>
					<AppStack />
				</AuthProvider>
			</NavigationContainer>
		</PaperProvider>
	);
}

