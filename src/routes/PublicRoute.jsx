import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Sign from '../modules/Sign'

const PublicRoute = () => {
  const user = useSelector((state) => state.auth.user)

  return Boolean(user) ? <Navigate to="/product" /> : <Outlet />
}

export default PublicRoute
