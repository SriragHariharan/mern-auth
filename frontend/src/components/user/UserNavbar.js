import React from 'react'

function UserNavbar() {
  return (
    <>
        <div className=" p-3 d-flex justify-content-between align-items-center bg-light sticky-top">
            <h3 className="text-secondary">❤️ Hai Srirag !</h3>
            <div className="">
                <button className="btn border border-3">🐧 PROFILE</button>
                <button className="btn border border-3">🔴 LOGOUT</button>
            </div>
        </div>
        <hr />
    </>
  )
}

export default UserNavbar