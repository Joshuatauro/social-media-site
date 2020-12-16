import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../Context/GeneralContext'
import { db } from '../../Firebase/firebase'
import PostActions from '../PostActionsComponent/PostActions'

import './Post.css'

const Post = ({props}) => {
  const { darkTheme } = useContext(ThemeContext)
  
  const ID = props.id
  const { displayName,title,para, subPlatform, commentCount,likedBy} = props.post
  const [profileImage, setProfileImage] = useState()

  useEffect(() => {
    db.collection('users').where("displayName", "==", displayName).onSnapshot(snapshot => {

      setProfileImage(snapshot.docs[0].data().profileImage)
    })
  })

  return (
    <section className={`post ${darkTheme ? "" : "light"}`}>
      <div className="post__container">

        <div className="post__container__post-user-details">
          <div className="post__container__post-user-details__avatar">
            {profileImage ? (
              <img src={profileImage} alt="user"/>
            ) : (
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrDJ5-IKojn4Rn2dlrRjCzDUjJ8G-TYuh0Aw&usqp=CAU" alt="user" />
            )}
          </div>
        
          <div className="post__container__post-user-details__col">

            <div className="post__container__post-user-details__col__platform">
              <Link to={`/platform/${subPlatform}`}>
                <h5>TDP/{subPlatform}</h5>
              </Link>
            </div>

            <div className="post__container__post-user-details__col__username">
              <Link to={`/dev/${displayName}`}>
                <h6>By u/{displayName}</h6>
              </Link>
            </div>

          </div>
        </div>

        <div className="post__container__post-details">

          <div className="post__container__post-details__heading">
            <Link to={`/post/${ID}`}>
              <h1 className="post__container__post-details__heading-heading">
                {title}
              </h1>
            </Link>
          </div>

          <div className="post__container__post-details__para">
            <p className="post__container__post-details__para-para">
              {
                para
                
              }
            </p>
          </div>

        </div>
        <PostActions 
          comments = {commentCount ? commentCount : 0}
          likedBy = {likedBy}
          ID = {ID}
        />

      </div>
    </section>
  )
}

export default Post
