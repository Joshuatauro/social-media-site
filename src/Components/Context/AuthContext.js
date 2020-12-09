import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../Firebase/firebase'

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState('')

  const signUp = async(email,password) => {
    await auth.createUserWithEmailAndPassword(email,password)
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