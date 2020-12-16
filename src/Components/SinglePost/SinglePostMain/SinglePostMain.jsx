import React, { useContext, useEffect, useState } from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { ThemeContext } from '../../Context/GeneralContext'

import { db } from '../../Firebase/firebase'
import LoadingIcon from '../../Reusables/LoadingIcon/LoadingIcon'
import SinglePostComments from '../SinglePostComments/SinglePostComments'
import SinglePostInput from '../SinglePostInputComment/SinglePostInput'

import './SinglePostMain.css'

const SinglePostMain = () => {
  const history = useHistory()
  const {currentUser} = useContext(AuthContext)
  const {darkTheme} = useContext(ThemeContext)
  const { postID } = useParams()

  let posts = []
  let allowEdit 

  const [title, setTitle] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [para, setPara] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [subPlatform, setSubPlatform] = useState('')

  //*EDITING THE POST INCASE USER WANTS TO CHANGE
  const [postPara, setPostPara] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const [loading, isLoading] = useState(true)

  //* Is called as soon as the page loads => to fetch data
  const fetchData = () => {
    
    db.collection('posts').get()
      .then(res => {
        res.docs.map((doc) => {

          if(doc.id === postID){
            posts.push(doc.data())

            console.log(posts[0])

            setPara(posts[0].para)
            setTitle(posts[0].title)
            setDisplayName(posts[0].displayName)
            setSubPlatform(posts[0].subPlatform)
            setImageURL(posts[0].profilePicture)
            isLoading(false)
          }
        })
      })
    
  }

  //* Toggles based on whether or not the person who posted and the person browsing are the same or not

  if(currentUser){
    if(currentUser.displayName === displayName){
      allowEdit = true
    } else {
      allowEdit = false
    }
  } else {
    allowEdit = false
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handlePostSubmit = e => {
    e.preventDefault()

    db.collection('posts').doc(postID).update(
      {
        para: postPara
      }
    ).then(() => {
      setIsEditing(false)
    })
  }

  //* In the first loop we delete the post, and then in the second loop we delete all the comments related to it
  const handlePostDelete = () => {
    if(window.confirm("Are you sre you want to delete this post?")){
      db.collection('posts').doc(postID).delete()
      .then(() => {
        db.collection('comments').where("parentID", "==", postID).get()
          .then((res) => {
            res.docs.forEach((doc) => {
              db.collection('comments').doc(doc.id).delete()
            })
          })
      })
      .then(() => {
        history.push('/')
      })
    } else {
      setIsEditing(false)
    }
  
  }

  // FOR GETTING THE DETAILS OF THE POST
  useEffect(() => {
    isLoading(true)
    fetchData()
    
    return fetchData
  }, [])


  return (
    <section className={`single-post ${darkTheme ? "" : "light"}`}>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="post__container single-post__container">

        <div className="single-post__container__post-user-details">
          <div className="single-post__container__post-user-details__avatar">
            {imageURL ? (
              <img src={imageURL} alt="user"/>
            ) : (
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrDJ5-IKojn4Rn2dlrRjCzDUjJ8G-TYuh0Aw&usqp=CAU" alt="user" />
            )}
          </div>
        
          <div className="single-post__container__post-user-details__col">

            <div className="single-post__container__post-user-details__col__platform">
              <Link to={`/platform/${subPlatform}`}>
                <h5>TDP/{subPlatform}</h5>
              </Link>
            </div>

            <div className="single-post__container__post-user-details__col__username">
              <h6>By u/{displayName}</h6>
            </div>

          </div>
        </div>

        <div className="single-post__container__post-details">

          <div className="single-post__container__post-details__heading">
              <h1 className="single-post__container__post-details__heading-heading">
                {title}
              </h1>
          </div>

          <div className="single-post__container__post-details__para">
            {isEditing ? (
                <form className="comment__container__edit" onSubmit={handlePostSubmit}>
                  <textarea type="text" className="comment__container__edit__input" value={para} onChange={e => setPara(e.target.value)} required/> 
                  <div className="comment__container__edit__row">
                    <button className="comment__container__edit__row__btn submit" type="submit" onClick={handlePostSubmit}>Submit</button>
                    <button className="comment__container__edit__row__btn cancel" onClick={toggleEdit}>Cancel</button>
                    <button className="comment__container__edit__row__btn delete" onClick={handlePostDelete}>Delete</button>
                  </div>
                </form>
              ) : (
                <p className="single-post__container__post-details__para-para">
                  {para}
                </p>
              )}
            
          </div>

        </div>

        {allowEdit ? (

          <div className="single-post__container__edit">

            <button className="single-post__container__edit__btn" onClick={toggleEdit}>Edit</button>
          </div>
        ) : (
          ""
        )}
        

        <SinglePostInput
          postID={postID}
          userName={displayName}
        />

        <SinglePostComments postID={postID}/>
      </div>
      )}
      
    </section>
  )
}

export default SinglePostMain
