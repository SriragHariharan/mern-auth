import React from 'react'
import UserNavbar from '../user/UserNavbar'
import { Outlet } from 'react-router-dom'

//route for users who are authenticated

function UserAuthRoot() {
  return (
    <div>
        <UserNavbar />
        <Outlet />
    </div>
  )
}

export default UserAuthRoot;