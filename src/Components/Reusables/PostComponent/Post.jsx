import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../Context/GeneralContext'
import PostActions from '../PostActionsComponent/PostActions'

import './Post.css'

const Post = (props) => {
  const { displayName,title,para,imageURL} = props.props
  const { darkTheme } = useContext(ThemeContext)

  return (
    <section className={`post ${darkTheme ? "" : "light"}`}>
      <div className="post__container">

        <div className="post__container__post-user-details">
          <div className="post__container__post-user-details__avatar">
            <img src={imageURL} alt="user"/>
          </div>
        
          <div className="post__container__post-user-details__col">

            <div className="post__container__post-user-details__col__username">
              <h6>TDPu/{displayName}</h6>
            </div>

          </div>
        </div>

        <div className="post__container__post-details">

          <div className="post__container__post-details__heading">
            <h1 className="post__container__post-details__heading-heading">
              {title}
            </h1>
          </div>

          <div className="post__container__post-details__para">
            <p className="post__container__post-details__para-para">
              {para}
            </p>
          </div>

        </div>
        <PostActions />

      </div>
    </section>
  )
}

export default Post
