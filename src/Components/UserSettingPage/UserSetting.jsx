import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

import { auth } from '../Firebase/firebase'
import UserAboutForm from './UserAboutForm/UserAboutForm'
import UserPasswordForm from './UserPasswordForm/UserPasswordForm'

import './UserSetting.css'

const UserSetting = () => {
  const history = useHistory()
  const { currentUser } = useContext(AuthContext)

  const logoutUser = () => {
    auth.signOut()
      .then(() => {
        history.push('/')
      })
  }

  return (
    <section className="user-settings-page">
      <div className="user-settings-page__container">
        <UserAboutForm />
        <UserPasswordForm />
        <div className="user-settings-page__container__btn">
          <h2>Logout</h2>
          <button className="user-settings-page__container__btn__logout" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </section>
  )
}

export default UserSetting
