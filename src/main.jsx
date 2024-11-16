import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Disborad from './Pages/Disborad.jsx'
import Profile from './Pages/Profile.jsx'
import User from './Pages/User.jsx'
import ProtectedRouter from './Compounts/ProtectedRouter.jsx'



const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'Disborad',
        element: <ProtectedRouter component={<Disborad/>}/>
      },
      {
        path: 'profile',
        element: <ProtectedRouter component={<Profile/>}/>
      },
      {
        path: 'user/:id',
        element: <ProtectedRouter component={<User/>}/>
      },
      
    ]


  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    
  </StrictMode>,
)
