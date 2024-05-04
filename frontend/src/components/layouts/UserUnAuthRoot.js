import React from 'react'
import { Outlet } from 'react-router-dom'

//root layout for unauthenticated users
function UserRoot() {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default UserRoot