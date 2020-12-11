import React, { useContext, useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { ThemeContext } from '../../Context/GeneralContext'

import { db } from '../../Firebase/firebase'



const SinglePostMain = () => {
  const {currentUser} = useContext(AuthContext)
  const {darkTheme} = useContext(ThemeContext)
  const { postID } = useParams()


  let reqPost
  let posts = []

  const [title, setTitle] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [para, setPara] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [subPlatform, setSubPlatform] = useState('')

  

  const fetchData = () => {
    db.collection('posts').get()
      .then(res => {
        res.docs.map((doc) => {

          if(doc.id === postID){
            posts.push(doc.data())



            setPara(posts[0].para)
            setTitle(posts[0].title)
            setDisplayName(posts[0].displayName)
            setSubPlatform(posts[0].subPlatform)
            
          }
        })
      })

  }

  // FOR GETTING THE DETAILS OF THE POST
  useEffect(() => {
    fetchData()
    
    return fetchData
  }, [])


  return (
    <section className={`post ${darkTheme ? "" : "light"}`}>
      <div className="post__container">

        <div className="post__container__post-user-details">
          <div className="post__container__post-user-details__avatar">
            {imageURL ? (
              <img src={imageURL} alt="user"/>
            ) : (
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrDJ5-IKojn4Rn2dlrRjCzDUjJ8G-TYuh0Aw&usqp=CAU" alt="user" />
            )}
          </div>
        
          <div className="post__container__post-user-details__col">

            <div className="post__container__post-user-details__col__platform">
              <Link to={`/platform/${subPlatform}`}>
                <h5>TDP/{subPlatform}</h5>
              </Link>
            </div>

            <div className="post__container__post-user-details__col__username">
              <h6>By u/{displayName}</h6>
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


      </div>
    </section>
  )
}

export default SinglePostMain
