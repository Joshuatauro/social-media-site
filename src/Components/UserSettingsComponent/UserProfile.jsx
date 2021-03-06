import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../Firebase/firebase'

import LoadingIcon from '../Reusables/LoadingIcon/LoadingIcon'
import Post from '../Reusables/PostComponent/Post'
import UserProfileAside from './UserProfileAside/UserProfileAside'

import './UserProfile.css'

const UserProfile = () => {
  const { userName } = useParams()

  const [posts,setPosts] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    db.collection('posts').where("displayName", "==", userName).onSnapshot(snapshot => {
      
      //DID THIS BECAUSE WHEN PASSING PROPS IT PASSES IT DIFFRENTLY THEN HOW IT DOES ON THE HOME PAGE, SO TO MATCH IT, THE STRUCTURING IS DONE JUST BEFORE PASSING THE PROPS
      setPosts(snapshot.docs)
      
      isLoading(false)
      
    })
    
  }, [])

  

  return (
    <section className="user-settings">
      {loading ? (
        <LoadingIcon />
      ) : (
          <div className="user-settings__container">
            {posts.length > 0 ? (
              <>
                <div className="user-settings__container__posts">
                  {posts.map(post => {
                    const postStructure = {
                      id: post.id,
                      post: post.data()
                    }
                    const ID = post.id
                    
                    return(
                      <div className="user-settings__container__posts-post">
                        <Post 
                          key={ID}
                          props={postStructure}
                        />
                      </div>
                    )
                })}
              </div>
              <div className="user-settings__container__profile">
                <UserProfileAside
                  userName = { userName }
                />
              </div>
            </>
          ) 
            : //either the top one or the bottom one should show :)
          (
            <div className="user-settings__container__empty">
              <h1>Looks like <span>{userName}</span> has no posts or dosent have an account</h1>
            </div>
          )}
            

          
        </div>
      )}
    </section>
  )
}

export default UserProfile
