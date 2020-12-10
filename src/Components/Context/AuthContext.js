import React, { createContext, useState, useEffect } from 'react'
import { auth, db } from '../Firebase/firebase'

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState('')

  const signUp = async(email,password,displayName) => {
    await auth.createUserWithEmailAndPassword(email,password)
    .then(cred => {
      console.log(cred)
      db.collection('users').doc(cred.user.uid).set({
        displayName: displayName
        
      })
    })
    .catch(err => console.error(err))


  }

  const logIn = async(email,password) => {
    await auth.signInWithEmailAndPassword(email,password)
    .catch(err => console.error(err))
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