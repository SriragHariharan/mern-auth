import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../admin/AdminNavbar'

// root for authenticated admin
function AdminAuthRoot() {
  return <><AdminNavbar /><Outlet /></>
}

export default AdminAuthRoot