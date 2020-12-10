import React from 'react'
import { useParams } from 'react-router-dom'
import SinglePostComments from './SinglePostComments/SinglePostComments'
import SinglePostMain from './SinglePostMain/SinglePostMain'


const SinglePost = () => {
  const { postID } = useParams()

  return (
    <div>
      <SinglePostMain 
        postID = {postID}
      />
      <SinglePostComments 
        postID = {postID}
      />
    </div>
  )
}

export default SinglePost
