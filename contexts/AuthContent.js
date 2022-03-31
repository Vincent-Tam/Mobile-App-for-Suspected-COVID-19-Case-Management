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
                    if(tempRole == 'user'){
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'main' }],
                        });
                    }else if(tempRole == 'staff'){
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'staff' }],
                        });
                    }else {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'admin' }],
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

    function getUid() {
        return auth.currentUser.uid
    }

    const value = {
        currentUser,
        role,
        area,
        getRole,
        getArea,
        getUser,
        getCurrentUser,
        getUid
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )

}