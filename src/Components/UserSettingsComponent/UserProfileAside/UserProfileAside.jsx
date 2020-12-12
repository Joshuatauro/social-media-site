import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase'

import './UserProfileAside.css'

const UserProfileAside = ({userName}) => {
  const [bio,setBio] = useState('')
  const [imgURL,setImgURL] = useState('')
  let userDetails

  useEffect(() => {
    db.collection('users').where("displayName", "==", userName).onSnapshot(snapshot => {
      snapshot.docs.map((doc) => {
        userDetails = doc.data()
        setBio(userDetails.bio)
      })
    })
      
  }, [])
  
  return (
    <aside className="user-profile-aside">
      <div className="user-profile-aside__container">
        <img src="https://reactjs.org/logo-og.png" alt=""/>  
        <div className="user-profile-aside__container__name">
          <h4>TDPu/{userName}</h4>
        </div>
        <div className="user-profile-aside__container__bio">
          <p>{bio}</p>
        </div>
      </div>
    </aside>
  )
}

export default UserProfileAside
