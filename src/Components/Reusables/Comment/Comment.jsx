import React from 'react'
import { Link } from 'react-router-dom'
import './Comment.css'

const Comment = ({props}) => {
  const {userName, text} = props
  return (
    <section className="comment">
      <div className="comment__container">
        <div className="comment__container-userName">
          <Link to={`/dev/${userName}`}>
            <h4>{userName}</h4>
          </Link>
        </div>
        <div className="comment__container-comment">
          <p>  
            { text }
          </p>
        </div>
      </div>
    </section>
  )
}

export default Comment
