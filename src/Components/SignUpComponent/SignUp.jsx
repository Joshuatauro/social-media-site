import React, { useState,useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from '../Context/GeneralContext'
import { AuthContext } from "../Context/AuthContext"
import "./SignUp.css"

const SignUp = () => {
  const history = useHistory()
  const { darkTheme } = useContext(ThemeContext)
  const {signUp} = useContext(AuthContext)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [rePassword,setRePassword] = useState('')
  const [displayName,setDisplayName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password === rePassword){
      signUp(email,password,displayName)
        .then(history.push("/"))
      setEmail('')
      setPassword('')
      setRePassword('')
      setDisplayName('')
    } else {
      alert("Passwords do not match")
    }
  }

  return (
    <section className={`sign-up ${darkTheme ? "" : "light"}`}>
      <div className="sign-up__container">
        <form className="sign-up__container__form" onSubmit={handleSubmit}>
          <div className="sign-up__container__form__input">
            <input type="email" required value={email} onChange={ (e) => setEmail(e.target.value) }/>
            <label className="sign-up__container__form__input-label">Email</label>
          </div>

          <div className="sign-up__container__form__input">
            <input type="text" required value={password} onChange={ (e) => setPassword(e.target.value) }/>
            <label className="sign-up__container__form__input-label">Password</label>
          </div>

          <div className="sign-up__container__form__input">
            <input type="text" required value={rePassword} onChange={ (e) => setRePassword(e.target.value) }/>
            <label className="sign-up__container__form__input-label">Password</label>
          </div>

          <div className="sign-up__container__form__input">
            <input type="text" required value={displayName} onChange={ (e) => setDisplayName(e.target.value) }/>
            <label className="sign-up__container__form__input-label">Username</label>
          </div>

          <button className="sign-up__container__form__btn">
            Sign-In
          </button>
        </form>
      </div>
    </section>
  )
}

export default SignUp
