import React, { useState, useContext } from 'react'
import { ThemeContext } from '../../Context/GeneralContext'
import { AuthContext } from '../../Context/AuthContext'

import './PostActions.css'

const PostActions = ({comments,likedBy}) => {
  const { darkTheme } = useContext(ThemeContext)
  const {currentUser} = useContext(AuthContext)

  const [isLiked, setIsLiked] = useState(likedBy.includes(currentUser.displayName))

  const [likesNum, setLikesNum] = useState(likedBy.length)


  return (
    <section className={`post-actions ${darkTheme ? "" : "light"}`}>
      <div className="post-actions__container">
        <div className="post-actions__container-col">

          <button className="post-actions__container-col__vote " >

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
