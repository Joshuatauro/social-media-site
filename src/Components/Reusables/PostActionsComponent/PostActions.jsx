import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '../../Context/GeneralContext'
import { AuthContext } from '../../Context/AuthContext'

import './PostActions.css'
import { db } from '../../Firebase/firebase'

const PostActions = ({comments,ID}) => {
  const { darkTheme } = useContext(ThemeContext)
  const {currentUser} = useContext(AuthContext)

  const [isLiked, setIsLiked] = useState(false)
  // const [allowDislike, setAllowDislike] = 
  const [likesNum, setLikesNum] = useState()

  const likePost = () => {
    console.log("liking")
    db.collection('posts').doc(ID).collection('likedBy').add(
      {
        userName: currentUser.displayName
      }
    ).then(() => {

      setIsLiked(true)
    })
  }

  const dislikePost = () => {
    console.log("disliking")
    db.collection('posts').doc(ID).collection('likedBy').onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        if(doc.data().userName === currentUser.displayName){
          db.collection('posts').doc(ID).collection('likedBy').doc(doc.id).delete()
            .then(() => {
              setIsLiked(false)
            })
        }   
      })
    })
  }
  

  useEffect(() => {
    db.collection('posts').doc(ID).collection('likedBy').onSnapshot(snapshot => {
      console.log("somethig changed")
      setIsLiked(false)
      snapshot.docs.forEach(doc => {
        if(doc.data().userName === currentUser.displayName){
          setIsLiked(true)
        }
      })

      setLikesNum(snapshot.docs.length)
    })
    
  })

  return (
    <section className={`post-actions ${darkTheme ? "" : "light"}`}>
      <div className="post-actions__container">
        <div className="post-actions__container-col">

          <button className="post-actions__container-col__vote " onClick={isLiked ? dislikePost : likePost}>
            <img src={`./${isLiked}.svg`} alt="" width="20px"/>
            {likesNum}            
          </button>

        </div>

        <div className="post-actions__container-col">
          <div className="post-actions__container-col__comments">
            <h4>Comments({comments})</h4>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PostActions
