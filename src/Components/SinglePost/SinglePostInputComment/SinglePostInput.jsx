import React, { useState, useContext } from 'react'
import firebase from 'firebase'
import { db } from '../../Firebase/firebase'
import './SinglePostInput.css'
import { AuthContext } from '../../Context/AuthContext'

const SinglePostInput = ({postID, userName}) => {
  const { currentUser } = useContext(AuthContext)
  const [text,setText] = useState()

  const handleSubmit = e => {
    e.preventDefault()
    if(currentUser){

      submitPost()
    } else {
      alert("You need to login to add a comment")
    }
  }

  const submitPost = () => {

    db.collection('comments').add(
      {
        parentID: postID,
        userName: currentUser.displayName,
        text
      }
    ).then(() => {
      setText('')
    })

    db.collection('posts').doc(postID).update(
      {
        commentCount: firebase.firestore.FieldValue.increment(1)
      }
    )
  }

  return (
    <form className="single-post-input" onSubmit={handleSubmit}>
      <textarea className="single-post-input__text" value={text} onChange={e => setText(e.target.value)} required/>
      <label className="single-post-input__label">Comment</label>
      <div className="single-post-input__container__btn">  
        <button className="single-post-input__btn-btn" type="submit">Submit Comment</button>
      </div>
    </form>
  )
}

export default SinglePostInput
