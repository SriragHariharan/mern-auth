import React from 'react'

function AdminNavbar() {
  return (
    <>
        <div class=" p-3 d-flex justify-content-between align-items-center bg-white sticky-top container">
            <h3 class="text-secondary">Hai admin !</h3>
            <div class="btn border border-3 bg-transparent">🔴 LOGOUT</div>
        </div>
        <hr />
    </>
  )
}

export default AdminNavbar