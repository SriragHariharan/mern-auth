import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutAdmin } from '../../redux-tk/adminSlice';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAdmin(null));
    navigate('/admin/auth/login')
  }
  return (
    <>
        <div className=" p-3 d-flex justify-content-between align-items-center bg-white sticky-top container">
            <h3 className="text-secondary">Hai admin !</h3>
            <div onClick={handleLogout} className="btn border border-3 bg-transparent">🔴 LOGOUT</div>
        </div>
        <hr />
    </>
  )
}

export default AdminNavbar