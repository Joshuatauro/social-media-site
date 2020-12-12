import React, { useState, useContext } from 'react'
import { ThemeContext } from '../../Context/GeneralContext'

import './PostActions.css'

const PostActions = ({comments}) => {
  const { darkTheme } = useContext(ThemeContext)

  const [upvotes, setUpvotes] = useState(1000)
  const [downvotes, setDownvotes] = useState(-1)
  // const [comments, setComments] = useState(10)

  const upvote = () => {
    setUpvotes(upvotes+1)
  }

  const downvote = () => {
    setDownvotes(downvotes-1)
  }


  return (
    <section className={`post-actions ${darkTheme ? "" : "light"}`}>
      <div className="post-actions__container">
        <div className="post-actions__container-col">

          <button className="post-actions__container-col__vote" onClick={upvote}>
            <i className="fas fa-heart" />
            {upvotes}
          </button>

          {/* <button className="post-actions__container-col__vote" onClick={downvote}>
            <i className="fas fa-caret-down fa-2x" />
            {downvotes}
          </button> */}

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
