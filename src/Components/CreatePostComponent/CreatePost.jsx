import React, { useState , useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../Context/AuthContext"
import { ThemeContext } from "../Context/GeneralContext"
import { db } from '../Firebase/firebase'

import "./CreatePost.css"

const CreatePost = () => {
  let history = useHistory()

  const [title, setTitle] = useState('')
  const [text,setText] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [platform, setPlatform] = useState('All')


  const { currentUser } = useContext(AuthContext)
  const { darkTheme } = useContext(ThemeContext)

  const handlePostSubmit = e => {
    e.preventDefault()
    db.collection('users').get()
      .then((
        res => {

          res.docs.map((doc) => {
            if(doc.id === currentUser.uid){
              console.log("FOUND",doc.data().displayName)
              // setDisplayName(doc.data().displayName)
              addPost(doc.data().displayName)
              
            }
          })
        }
      ))
  }

  const addPost = (userName) => {
    console.log(userName, "you got the fucking username bitch then fucking show it ")
    db.collection('posts').add(
      {
        displayName: userName,
        title,
        para: text,
        subPlatform: platform
      }
    ).then(docRef => {
      console.log(docRef.id)
      history.push(`/post/${docRef.id}`)
    })
    console.log("POSTED")
  }

  
  return (
    <section className={`create-post ${darkTheme ? "" : "light"}`}>
      <div className="create-post__container">
        <form className="create-post__container__form" onSubmit={handlePostSubmit}>
          <div className="create-post__container__form__input">
            <input type="text" required onChange={e => setTitle(e.target.value)} value={title}/>
            <label className="create-post__container__form__input__label title">Title</label>
          </div>
          <div className="create-post__container__form__input">
            <textarea type="text" required onChange={e => setText(e.target.value)} value={text} />
            <label className="create-post__container__form__input__label text">Text</label>
          </div>

          <div className="create-post__container__form__btn__platform">
            <button className="create-post__container__form__btn" type="submit">
              Submit
            </button>

            <select className="create-post__container__form__options" onChange={e => setPlatform(e.target.value)}>

              <option value="All" className="create-post__container__form__platform">All</option>
              <option value="FrontEnd" className="create-post__container__form__platform">Front-end</option>
              <option value="BackEnd" className="create-post__container__form__platform">Back-end</option>
              <option value="FullStack" className="create-post__container__form__platform">Full-Stack</option>
              <option value="Design" className="create-post__container__form__platform">Design</option>
              <option value="Devops" className="create-post__container__form__platform">Devops</option>

            </select>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreatePost