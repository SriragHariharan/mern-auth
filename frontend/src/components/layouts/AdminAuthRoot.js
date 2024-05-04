import React from 'react'
import { Outlet } from 'react-router-dom'

// root for authenticated admin
function AdminAuthRoot() {
  return <Outlet />
}

export default AdminAuthRoot