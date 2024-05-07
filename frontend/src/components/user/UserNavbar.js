import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux-tk/userSlice';
import { useNavigate } from 'react-router-dom';

function UserNavbar() {
      const username = useSelector(store => store?.user?.username)
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/auth/login')
      }
  return (
    <>
        <div className=" p-3 d-flex justify-content-between align-items-center bg-light sticky-top">
            <h3 className="text-secondary">❤️ Hai {username} !</h3>
            <div className="">
                <button className="btn border border-3">🐧 PROFILE</button>
                <button onClick={handleLogout} className="btn border border-3">🔴 LOGOUT</button>
            </div>
        </div>
        <hr />
    </>
  )
}

export default UserNavbar