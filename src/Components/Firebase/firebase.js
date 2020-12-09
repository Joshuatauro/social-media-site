import firebase from 'firebase'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyDYdZG3oGfAwnqqQXTGUJBrsfdDUIiocw4",
  authDomain: "social-media-website-3e462.firebaseapp.com",
  projectId: "social-media-website-3e462",
  storageBucket: "social-media-website-3e462.appspot.com",
  messagingSenderId: "659828059445",
  appId: "1:659828059445:web:883785ac1a13409abcb07c",
  measurementId: "G-CH1LZ1RMS6"
});

const db = app.firestore()
const auth = firebase.auth()
const storage = firebase.storage

// export const auth = app.auth
// export default app

export { db,storage,auth }