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
    const [area,setArea] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            let tempRole = '';
            var docRef = db.collection("UserRole").doc(auth.currentUser?.email);
            docRef.get().then((doc) => {
                if(doc.exists) {
                    console.log('User role: '+ doc.data().role);
                    console.log('User area: '+ doc.data().area);
                    setRole(doc.data().role);
                    setArea(doc.data().area);
                    tempRole = doc.data().role;
                }
                if(user){
                    console.log('Temp role: '+tempRole);
                    if(tempRole == 'staff'){
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'staff' }],
                        });
                    }else{
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'main' }],
                        });
                    }
                }else{
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'auth' }],
                    });
                }
            })
        })

        return unsubscribe
    }, [])

    function getUser() {
        return auth.currentUser
    }

    function getRole() {
        return role
    }

    function getArea() {
        return area
    }

    function getCurrentUser() {
        return currentUser
    }

    const value = {
        currentUser,
        role,
        area,
        getRole,
        getArea,
        getUser,
        getCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )

}