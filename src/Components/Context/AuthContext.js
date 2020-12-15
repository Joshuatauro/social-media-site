import React, { createContext, useState, useEffect } from 'react'
import { auth, db } from '../Firebase/firebase'
// import {useHistory} from 'react-router-dom'
export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
  // const history = useHistory()

  const [currentUser, setCurrentUser] = useState('')

  const signUp = async(email,password,displayName) => {
    await auth.createUserWithEmailAndPassword(email,password)
    .then(cred => {
      //NOT REQUIRED BUT ITS BETTER THAN MAKING EACH COMMENT MAKE A QUERY TO CHECK IF PERSON BROWSING IS THE SAME PERSON WHO COMMENTED SO AS TO WETHER OR NOT ALLOW TO EDIT
      cred.user.updateProfile({
        displayName
      })
      db.collection('users').doc(cred.user.uid).set({
        displayName: displayName,
        profileImage: "https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
      })

    })
    .catch(err => alert(err.message))
  }

  const logIn = async(email,password) => {
    await auth.signInWithEmailAndPassword(email,password)
    
    .catch(err => alert(err.message))
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])



  return(
    <AuthContext.Provider value={
      {
        currentUser,
        signUp,
        logIn
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}