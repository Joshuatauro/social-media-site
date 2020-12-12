import React from 'react'
import { useParams } from 'react-router-dom'
import SinglePostComments from './SinglePostComments/SinglePostComments'
import SinglePostMain from './SinglePostMain/SinglePostMain'

import './SinglePost.css'

const SinglePost = () => {
  const { postID } = useParams()

  return (
    <section className="single-post-page">
      <div className="single-post-page__container">
        <SinglePostMain 
          postID = {postID}
        />
      </div>
    </section>
  )
}

export default SinglePost
