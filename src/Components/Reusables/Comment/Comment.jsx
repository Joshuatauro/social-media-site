import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { db } from '../../Firebase/firebase'
import firebase from 'firebase'
import './Comment.css'

//! This is component is responsible a single comment and also checks if the currentUser and the user who posted
//! the comment is same or not and displays edit button as such

const Comment = ({props,commentID,postID}) => {
  const {currentUser} = useContext(AuthContext)
  const {userName, text} = props
  
  const [commentTitle, setCommentTitle] = useState(text)

  // * State for whether or not the user is editing data at the moment
  const [isEditing, setIsEditing] = useState(false)
  let allowEdit

  //*To check if the user has rights to edit the data
  if(currentUser){
    if(currentUser.displayName === userName){
      allowEdit = true
    } else {
      allowEdit = false
    }
  } else {
    allowEdit = false
  }

  const toggleEdit = () => {
    // setIsEditing(!isEditing)
    console.log(commentTitle)
  }

  const handleCommentSubmit = e => {
    e.preventDefault()

    db.collection('comments').doc(commentID).update(
      {
        text: commentTitle
      }
    ).then(() => {
      setIsEditing(false)
    })
  }

  const handleCommentDelete = () => {
    if(window.confirm("Are you sure you want to delete this comment?")){

      db.collection('comments').doc(commentID).delete()
        .then(() => {
          db.collection('posts').doc(postID).update(
            {
              commentCount: firebase.firestore.FieldValue.increment(-1)
            }
          )
        })
        setIsEditing(false)
    } else {
      setIsEditing(false)
    }
  }

  // const useEffect

  
  return (
    <section className="comment">
      <div className="comment__container">
        <div className="comment__container__col__first">
          <div className="comment__container-userName">
            <Link to={`/dev/${userName}`}>
              <h4>{userName}</h4>
            </Link>
          </div>
          <div className="comment__container-comment">
            {isEditing ? (
              <form className="comment__container__edit" onSubmit={handleCommentSubmit}>
                <textarea type="text" className="comment__container__edit__input" value={commentTitle} onChange={e => setCommentTitle(e.target.value)} required/> 
                <div className="comment__container__edit__row">
                  <button className="comment__container__edit__row__btn submit" type="submit" onClick={handleCommentSubmit}>Submit</button>
                  <button className="comment__container__edit__row__btn cancel" onClick={toggleEdit}>Cancel</button>
                  <button className="comment__container__edit__row__btn delete" onClick={handleCommentDelete}>Delete</button>
                </div>
              </form>
            ) : (
              <p>  
                { text }
              </p>
            )}
            
          </div>
        </div>
        <div className="comment__container__col">
          {
            allowEdit ? (
              <button className="comment__edit" onClick={toggleEdit}>Edit</button>
            ) : (
              ""
            )
          }
        </div>
      </div>
    </section>
  )
}

export default Comment
