import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Context/GeneralContext'
import Post from '../Reusables/PostComponent/Post'
import { db } from '../Firebase/firebase'
import './Home.css'
import LoadingIcon from '../Reusables/LoadingIcon/LoadingIcon'
import HomeSideBar from './HomeSideBar/HomeSideBar'

const Home = () => {
  const { darkTheme } = useContext(ThemeContext)

  const [postsArr, setPostsArr] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    console.log(postsArr.length)
    db.collection('posts').orderBy("timeStamp","desc").limit(6).onSnapshot(snapshot => {
      setPostsArr(snapshot.docs.map( 
        doc => 
        (
          {
            id: doc.id,
            post: doc.data()
          }
        )
      ))
      isLoading(false)
      
    })
  },[])

  return (
    <section className={`home ${darkTheme ? "" : "light"}`}>
      

        {loading ? (
          <div className="home__container loading">
            <LoadingIcon />
          </div>
        ) : (
          <div className="home__container">
            <div className="home__container__posts">
              {postsArr.map((props) => {
                const ID = props.id
                return(
                  <div className="home-post">
                    <Post key={ID} props={props}/>
                  </div>
                )
              })}
            </div>
            
            <div className="home-sidebar">
              <HomeSideBar />
            </div>
          </div>
        )}
    </section>
  )
}

export default Home
