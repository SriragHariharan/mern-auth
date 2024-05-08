import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux-tk/userSlice';
import { Link, useNavigate } from 'react-router-dom';

function UserNavbar() {
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/auth/login')
      }
  return (
    <>
        <div className=" p-3 d-flex justify-content-between align-items-center bg-light sticky-top">
            <h3 className="text-secondary">❤️ Hai </h3>
            <div className="">
                <Link to={'/profile'} className="btn border border-3">🐧 PROFILE</Link>
                <button onClick={handleLogout} className="btn border border-3">🔴 LOGOUT</button>
            </div>
        </div>
        <hr />
    </>
  )
}

export default UserNavbar