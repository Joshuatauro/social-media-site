import React, { useEffect, useState } from 'react'
import { db } from "../../Firebase/firebase"


const SinglePostComments = ({postID}) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    db.collection('comments').where("parentID", "==", postID).onSnapshot(snapshot => {
      console.log(snapshot.docs[0].data())
      setComments(snapshot.docs.map( 
        doc => 
        (
          {
            comment: doc.data()
          }
        )
        
      ))
    })

  },[])

  return (
    <section className="single-post-comments">
      <div className="single-post-comments__container">
        
      </div>
    </section>
  )
}

export default SinglePostComments
