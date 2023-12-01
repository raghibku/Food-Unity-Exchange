import React from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import app from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);
const GoogleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [photoU, setPhotoU] = useState('');
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const createUser = async (email, password, name, photo) => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(result => updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        }))
        .then(() => {
          setName(name);
          setPhotoU(photoU);
        }
        )

      toast.success('Registration successfull', {
        position: 'top-right',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch {
      toast.error('Registration failed. Please try again.', {
        position: 'top-right',
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

  }
  const googleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, GoogleProvider)
      .then(result => {
        const newUser = result.user;
        setUser(newUser);
        toast.success('Login successfull', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      })
      .catch(error => {
        console.log("error", error.message)
        toast.error('Login failed. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      })
  }

  const login = async (email, password) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setError('');
      toast.success('Login successfull', {
        position: 'top-right',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } catch{
      setError('Email and Password does not match')
      toast.error('Login failed. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  const logout = () => {
    setName('')
    setPhotoU('')
    setLoading(true)
    return signOut(auth);

  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        const userEmail = currentUser?.email || user?.email;
        const loggedUser = {email:userEmail}
        setUser(currentUser);
        console.log('current user', currentUser);
        setLoading(false);
        //if user exists then issue a token
        if(currentUser){
            
            axios.post('https://food-unity-exchange-server.vercel.app/jwt',loggedUser,{withCredentials:true})
            .then(res=>{
                console.log('token response', res.data)
            })
        }
        else{
            axios.post('https://food-unity-exchange-server.vercel.app/logout',loggedUser,{withCredentials:true})
            .then(res=>{
                console.log(res.data);
            })
        }   
    });
    return () => {
        return unsubscribe();
    }
}, [])

  const authInfo = {
    user,
    createUser,
    login,
    logout,
    googleSignIn,
    loading,
    error,
    name,
    photoU
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  )
}

export default AuthProvider