import React, { useState } from 'react'
import firebase from 'firebase'
import { db } from '../../Firebase/firebase'

import './SinglePostInput.css'

const SinglePostInput = ({postID, userName}) => {

  const [text,setText] = useState()

  const handleSubmit = e => {
    e.preventDefault()
    submitPost()
  }

  const submitPost = () => {

    db.collection('comments').add(
      {
        parentID: postID,
        userName,
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
