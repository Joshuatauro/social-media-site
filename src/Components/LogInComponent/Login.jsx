import React, { useState,useContext } from 'react'
import { ThemeContext } from '../Context/GeneralContext'
import { AuthContext } from "../Context/AuthContext"
import "../SignUpComponent/SignUp.css"
import { useHistory } from 'react-router-dom'
const Login = () => {
  const history = useHistory()
  const { darkTheme } = useContext(ThemeContext)
  const {logIn} = useContext(AuthContext)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    logIn(email,password)
      .then(history.push("/"))
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
            <input type="password" required value={password} onChange={ (e) => setPassword(e.target.value) }/>
            <label className="sign-up__container__form__input-label">Password</label>
          </div>

          <button className="sign-up__container__form__btn">
            Log-In
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login