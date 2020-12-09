import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {

  const [darkTheme, setDarkTheme] = useState(true)

  const switchTheme = () => {
    setDarkTheme(!darkTheme)
    // console.log(darkTheme)
    localStorage.setItem("theme", darkTheme)
  }

  return(
    <ThemeContext.Provider value={
      {
        darkTheme,
        switchTheme
      }
    }>
      {children}
    </ThemeContext.Provider>
  )
}
