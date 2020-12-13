import React, { useState, useContext } from 'react'
import './UserPasswordForm.css'
import {AuthContext} from '../../Context/AuthContext'
import { db } from '../../Firebase/firebase'

const UserPasswordForm = () => {
  const { currentUser } = useContext(AuthContext)

  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if(window.confirm("Are you sure you want to change your password?")){
        currentUser.updatePassword(newPassword)
          .catch(() => {
            alert("This is sesitive information and hence for better safety of our users we have implemented such that, to change your password, you would have to re-authenticate yourself if you have not logged in recently. For more information you can contact us using the 'Help' platform")
            setNewPassword('')
          }
        )
      }
  }

  return (
    <section className="user-settings-password">
      <div className="user-settings-password__header">
        <h2>Change Password</h2>
      </div>
      <form className="user-settings-password__form" onSubmit={handleSubmit}>
        <div className="user-settings-password__form--password">
          <input type="password" minLength="6" required value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <label>New Password</label>
        </div>
        <button className="user-settings-password__form--btn">
          Change
        </button>
      </form>
    </section>
  )
}

export default UserPasswordForm
