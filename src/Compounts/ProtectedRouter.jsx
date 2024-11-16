import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../Config/Firebase/Firebasemethode';

const ProtectedRouter = ({ component }) => {
    const [user, setUser] = useState(false);


      // use navigate 
      const navigate = useNavigate()
      useEffect(() => {
          onAuthStateChanged(auth, (user) => {
              if (user) {
                  setUser(true)
                  return
              }
              navigate('/login')
          })
      }, [])
  return (
    user ? component : <h1>Loading...</h1>
  )
}

export default ProtectedRouter
{/* <div className="container mx-auto mt-10">
      {auth.currentUser && (
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {auth.currentUser.displayName || 'User'}!
          </h1>
          <p className="text-lg text-gray-600">This is your profile page.</p>
        </div>
      )} */}