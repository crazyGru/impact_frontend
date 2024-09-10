// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDTISpg8JdiBLjvEZLJ0F8FJ39xEpIu8kA',
  authDomain: 'impactai-de6c7.firebaseapp.com',
  projectId: 'impactai-de6c7',
  storageBucket: 'impactai-de6c7.appspot.com',
  messagingSenderId: '575158786343',
  appId: '1:575158786343:web:5115e39297a21d1335f102',
  measurementId: 'G-W2CBLQ6E2M'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const microsoftProvider = new OAuthProvider('microsoft.com')

export { auth, googleProvider, microsoftProvider, facebookProvider, db }
