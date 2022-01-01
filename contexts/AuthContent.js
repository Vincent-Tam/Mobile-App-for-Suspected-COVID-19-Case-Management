import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth,db } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [role, setRole] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);

            var docRef = db.collection("UserRole").doc(auth.currentUser?.email);
            docRef.get().then((doc) => {
                if(doc.exists) {
                    console.log('User role: '+ doc.data().role);
                    setRole(doc.data().role); 
                }else {
                    setRole('undefined');
                }
            })
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

    function getRole() {
        return role
    }

    function getCurrentUser() {
        return currentUser
    }

    const value = {
        currentUser,
        role,
        getRole,
        getUser,
        getCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )

}