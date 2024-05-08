import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, setUserProfilePic } from '../redux-tk/userSlice';
import { useNavigate } from 'react-router-dom';

function useLoginUser() {
    const[user, setUser] = useState(null);
    const [error, setError] = useState(null)
    const userToken = useSelector(store => store?.user?.userToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const fetchUserDetails = async() => {
        let resp = await fetch(process.env.REACT_APP_BACKEND_USER_BASE_URL + "/get-user",
            {
                method:"get",
                headers:{
                    authorization: `Bearer ${userToken}`
                }
            }
        )
        if(resp.status===401){
            dispatch(logoutUser());
            navigate('/auth/login')
        }
        let jsonData = await resp.json()
        if(!jsonData.success){
            console.log(jsonData.message);
            setError(jsonData.message)
        }else{
            dispatch(setUserProfilePic(jsonData?.data?.user?.profile_pic))
            setUser(jsonData.data.user)
        }
    }

    useEffect(() => {fetchUserDetails()}, [])
  
    return {user, error};
}

export default useLoginUser