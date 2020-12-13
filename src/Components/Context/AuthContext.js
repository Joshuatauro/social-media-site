import React, { createContext, useState, useEffect } from 'react'
import { auth, db } from '../Firebase/firebase'
import {useHistory} from 'react-router-dom'
export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
  const history = useHistory()

  const [currentUser, setCurrentUser] = useState('')

  const signUp = async(email,password,displayName) => {
    await auth.createUserWithEmailAndPassword(email,password)
    .then(cred => {
      // console.log(cred)
      db.collection('users').doc(cred.user.uid).set({
        displayName: displayName
        
      })
    })
    .then(() => {
      history.push("/")
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