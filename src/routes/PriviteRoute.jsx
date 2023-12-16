import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PriviteRoute = () => {
    const isLogin = useSelector(state => state.sales.isLogin)

  return (
    isLogin ? <Outlet/> : <Navigate to="/" />
  )
}

export default PriviteRoute