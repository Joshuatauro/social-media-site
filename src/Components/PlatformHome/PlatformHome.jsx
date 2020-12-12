import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ThemeContext } from '../Context/GeneralContext'
import Post from '../Reusables/PostComponent/Post'
import { db } from '../Firebase/firebase'
import './PlatformHome.css'

const PlatformHome = () => {
  const {subPlatform} = useParams()
  const { darkTheme } = useContext(ThemeContext)

  const [postsArr, setPostsArr] = useState([])

  useEffect(() => {
    db.collection('posts').where("subPlatform", "==" ,subPlatform).onSnapshot(snapshot => {
      
      setPostsArr(snapshot.docs.map( 
        doc => 
        (
          {
            id: doc.id,
            post: doc.data()
          }
        )
        
      ))
    })
  },[])

  return (
    <section className={`home ${darkTheme ? "" : "light"}`}>
      <div className="home__container">
      <div className="platform-home">
        <h2>Welcome to 
          <span>
            TDP/{subPlatform}
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
        
      </div>
    </section>
  )
}

export default PlatformHome
