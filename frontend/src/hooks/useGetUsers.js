import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../redux-tk/adminSlice';

function useGetUsers() {
    const[error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const adminToken = useSelector(store => store.admin.admin)
    const dispatch = useDispatch();
    
    function fetchAllUsers(){
        fetch(process.env.REACT_APP_BACKEND_ADMIN_BASE_URL+"/all-users",{
            headers:{
                authorization : "Bearer "+adminToken
            }
        })
        .then(resp => resp.json())
        .then(data => {
             console.log(data);
            if(!data.success){
                 setError(data.message)
                if(data.message==="jwt expired"){
                    dispatch(logoutAdmin(null));
                }
            } else{
                setUsers(data.data.users)
            }
        })
    }
    useEffect(() => fetchAllUsers(),[])


    return {users, error}
}

export default useGetUsers