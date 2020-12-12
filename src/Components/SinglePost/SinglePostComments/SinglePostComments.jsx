import React, { useEffect, useState } from 'react'
import Comment from "../../Reusables/Comment/Comment"
import { db } from "../../Firebase/firebase"

import './SinglePostComments.css'

const SinglePostComments = ({postID}) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    db.collection('comments').where("parentID", "==", postID).onSnapshot(snapshot => {
      setComments(snapshot.docs)
    })

  },[])

  return (
    <section className="single-post-comments">
      <div className="single-post-comments__container">
        <div className="single-post-comments__container-header">
          <h2>Comments</h2>
        </div>
        {comments.map((comment) => {
          return(
          
            <Comment 
              props={comment.data()}
            />
          )
        })}
      </div>
    </section>
  )
}

export default SinglePostComments
