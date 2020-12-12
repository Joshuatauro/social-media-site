import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Context/GeneralContext'
import Post from '../Reusables/PostComponent/Post'
import { db } from '../Firebase/firebase'
import './Home.css'
import LoadingIcon from '../Reusables/LoadingIcon/LoadingIcon'

const Home = () => {
  const { darkTheme } = useContext(ThemeContext)

  const [postsArr, setPostsArr] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {

    db.collection('posts').onSnapshot(snapshot => {
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
            {postsArr.map((props) => {
              const ID = props.id
              return(
                <div className="home-post">
                  <Post key={ID} props={props}/>
                </div>
              )
            })}
          </div>
        )}
    </section>
  )
}

export default Home
