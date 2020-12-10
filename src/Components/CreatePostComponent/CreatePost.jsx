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
    addPost()
    
    console.log(currentUser)
  }

  const addPost = async() => {
    db.collection('users').doc(currentUser.uid).get().then((cred) => cred.data().displayName)
    .then((displayName) => setDisplayName(displayName))
    .then(submitPost())
  }

  const submitPost = () => {
    db.collection('posts').add(
      {
        title: title,
        para: text,
        displayName: displayName,
        subPlatform: platform,
        commentCount: 0
      }
    ).then(
      (docRef) => {
        
        history.push(`/post/${docRef.id}`)
      }
    )
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
            <button className="create-post__container__form__btn" onClick={handlePostSubmit}>
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