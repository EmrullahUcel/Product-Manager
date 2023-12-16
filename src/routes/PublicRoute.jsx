import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Sign from '../pages/Sign'

const PublicRoute = () => {
    const isLogin = useSelector(state => state.sales.isLogin)

  return (
    isLogin ? <Navigate to="/product"/> : <Outlet/>
  )
}

export default PublicRoute