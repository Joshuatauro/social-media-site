import React,{ useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import LoadingIcon from '../../Reusables/LoadingIcon/LoadingIcon'
import { db, storage } from '../../Firebase/firebase'

import './UserAboutForm.css'

const UserAboutForm = () => {
  const history = useHistory()

  const {currentUser} = useContext(AuthContext)

  const [bio, setBio] = useState('')
  const [userName, setUserName] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const [progress, setProgress] = useState(0)
  const [loading, isLoading] = useState(true)

  const handleSubmit = e => {
    e.preventDefault()

    if (window.confirm("Do you want to change your details")) {
      db.collection('users').doc(currentUser.uid).update(
        {
          bio
        }
      )
      history.push(`/dev/${userName}`)
    }

  }
  
  const handlePhotoSelect = (e) => {
    if(e.target.files[0]){
      setProfileImage(e.target.files[0])
    }
  }

  const handlePhotoUpload = e => {
    e.preventDefault()
    const uploadIMG = storage.ref(`images/${profileImage.name}`).put(profileImage)

    uploadIMG.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
        console.log(progress)
      },
      (error) => {
        alert(error.message)
      },
      () => {
        uploadIMG.snapshot.ref.getDownloadURL()
          .then(downloadURL => {
            console.log(downloadURL)
            setImgURL(downloadURL)
            db.collection('users').doc(currentUser.uid).update(
              {
                profileImage: downloadURL
              }
            )
          })
      }
    )
  }

  useEffect(() => {
    if(currentUser){
      db.collection('users').doc(currentUser.uid).onSnapshot(snapshot => {
        const userData = snapshot.data()
        setBio(userData.bio)
        setUserName(userData.displayName)
        setImgURL(userData.profileImage)
        isLoading(false)
      })
        
    }
  } , [currentUser])
  return (
    <form className="user-settings-page__container__form" onSubmit={handleSubmit}>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <div className="user-settings-page__container__form__image">
            <img src={imgURL} alt="User Profile"/>
            <input type="file" onChange={handlePhotoSelect} />
            <button className="user-settings-page__container__form__image__btn" onClick={handlePhotoUpload}>Change</button>
          </div>
          <div className="user-settings-page__container__form__userName">
            <h5 className="user-settings-page__container__form__userName-userName">UserName: </h5>
            <h5>{userName}</h5>
          </div>
          <div className="user-settings-page__container__form__bio">
            <textarea type="text" value={bio} onChange={e => setBio(e.target.value)} required/>
            <label className="user-settings-page__container__form__label">Bio</label>
          </div>

          <button className="user-settings-page__container__form__btn">Submit!</button>
        </>
      )}
      
    </form>
  )
}

export default UserAboutForm
