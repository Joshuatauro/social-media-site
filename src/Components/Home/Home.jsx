import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Context/GeneralContext'
import Post from '../Reusables/PostComponent/Post'
import { db } from '../Firebase/firebase'
import './Home.css'

const Home = () => {
  const { darkTheme } = useContext(ThemeContext)

  const [postsArr, setPostsArr] = useState([])

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
    })
  },[])

  return (
    <section className={`home ${darkTheme ? "" : "light"}`}>
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
    </section>
  )
}

export default Home
