import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ThemeContext } from '../Context/GeneralContext'
import Post from '../Reusables/PostComponent/Post'
import LoadingIcon from '../Reusables/LoadingIcon/LoadingIcon'
import { db } from '../Firebase/firebase'
import './PlatformHome.css'

const PlatformHome = () => {
  const {subPlatform} = useParams()
  const { darkTheme } = useContext(ThemeContext)

  
  const correctSubPlatform = () => {
    const lengthOfPlatform = subPlatform.length
    let correctPlatform = ''
    for(let i=0;i<lengthOfPlatform;i++){
      if(i === 0){
        correctPlatform = correctPlatform+subPlatform[i].toUpperCase()
      } else {
        correctPlatform = correctPlatform+subPlatform[i].toLowerCase()
      }
    }
    return correctPlatform
  }

  const [postsArr, setPostsArr] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    db.collection('posts').where("subPlatform", "==" ,correctSubPlatform()).onSnapshot(snapshot => {
      
      setPostsArr(snapshot.docs.map( 
        doc => 
        (
          {
            id: doc.id,
            post: doc.data()
          }
        )
        ))
        setIsLoading(false)
    })
  },[])

  return (
    <section className={`platform ${darkTheme ? "" : "light"}`}>
      <div className="platform__container">
        {isLoading ? (
          <LoadingIcon />
        ) : (
          
          
          <>
          {postsArr.length > 0 ? (
            <>
              <div className="platform-home">
                <h2>Welcome to 
                  <span>
                    TDP/{correctSubPlatform()}
                  </span>
                </h2>
              </div>
              {postsArr.map((props) => {
                const ID = props.id
                return(
                  <div className="home-post">
                    <Post key={ID} props={props}/>
                  </div>
                )
              })}
            </>
          ) : (
            <h1 className="platform-home-error">TDP/{subPlatform} is not a platform</h1>
          )}
          
        
          </>
        )}
      
      </div>
    </section>
  )
}

export default PlatformHome
