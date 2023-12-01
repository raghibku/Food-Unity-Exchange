import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import NotFound from './components/NotFound.jsx'
import Home from './components/home/Home.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import AvailableFoods from './components/other/AvailableFoods.jsx'
import Register from './components/registration/Register/Register.jsx'
import Login from './components/registration/Login/Login.jsx'
import AddFood from './components/other/AddFood.jsx'
import ManageMyFoods from './components/other/ManageMyFoods.jsx'
import MyFoodRequests from './components/other/MyFoodRequests.jsx'
import FoodDetail from './components/other/FoodDetail.jsx'
import UpdateFoodInfo from './components/other/UpdateFoodInfo.jsx'
import ManageSingleFood from './components/other/ManageSingleFood.jsx'
import Private from './components/registration/Private/Private.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <NotFound/>,
    children: [
      {
        path: '/',
        element:<Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/available-foods',
        element: <AvailableFoods/>
      },
      {
        path: '/food-detail/:id',
        element: <FoodDetail/>,
        loader: ({params})=>fetch(`https://food-unity-exchange-server.vercel.app/availableFood/${params.id}`)
      },
      {
        path: '/add-food',
        element: <Private><AddFood/></Private>
      },
      {
        path: '/manage-my-food',
        element: <Private><ManageMyFoods/></Private>
      },
      {
        path: '/my-food-request',
        element: <Private><MyFoodRequests/></Private>
      },
      {
        path: '/update-food/:id',
        element: <Private><UpdateFoodInfo/></Private> ,
        loader: ({params})=>fetch(`https://food-unity-exchange-server.vercel.app/availableFood/${params.id}`)
      },
      {
        path: '/manage-food/:id',
        element: <Private><ManageSingleFood/></Private> ,
        loader: ({params})=>fetch(`https://food-unity-exchange-server.vercel.app/requestedFood/${params.id}`)
      }
    ]

    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
