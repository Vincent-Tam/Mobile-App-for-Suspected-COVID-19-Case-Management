import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
                if(user){
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'main' }],
                });
            }else
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'auth' }],
                });
        })

        return unsubscribe
    }, [])

    function getUser() {
        return auth.currentUser
    }

    function getCurrentUser() {
        return currentUser
    }

    const value = {
        currentUser,
        getUser,
        getCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )

}