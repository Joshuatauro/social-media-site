import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase'
import {useParams} from 'react-router-dom'

import './UserProfileAside.css'

const UserProfileAside = () => {
  const {userName} = useParams()
  const [bio,setBio] = useState('')
  const [imgURL,setImgURL] = useState('')
  let userDetails

  useEffect(() => {
    db.collection('users').where("displayName", "==", userName).onSnapshot(snapshot => {
      snapshot.docs.map((doc) => {
        let userDetails = doc.data()

        setBio(userDetails.bio)
        setImgURL(userDetails.profileImage)
      })
    })
      
  }, [])
  
  return (
    <aside className="user-profile-aside">
      <div className="user-profile-aside__container">
        <img src={imgURL} alt=""/>  
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
