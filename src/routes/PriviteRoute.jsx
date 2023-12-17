import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PriviteRoute = () => {
  const user = useSelector((state) => state.auth.user)

  return Boolean(user) ? <Outlet /> : <Navigate to="/" />
}

export default PriviteRoute
