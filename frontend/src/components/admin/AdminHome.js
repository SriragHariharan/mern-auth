import React, { useEffect, useState } from 'react'
import useGetUsers from '../../hooks/useGetUsers'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, deleteUser, logoutAdmin } from '../../redux-tk/adminSlice';

function AdminHome() {
    const { error} = useGetUsers();
    const users = useSelector(store => store?.admin?.users);
    const [allUsersArray, setAllUsersArray] = useState(users)
    const users2 = useSelector(store => store?.admin?.users);
    const adminToken = useSelector(store => store?.admin?.admin)
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    useEffect(() => {setAllUsersArray(users) }, [users]);

    const handleDeleteUser = async(userID) => {
        console.log(userID)
        try {
            alert("Are you sure you want to delete")
            const response = await fetch(`${process.env.REACT_APP_BACKEND_ADMIN_BASE_URL}/delete-user/${userID}`, {
                method:'delete',
                headers: {
                    authorization: `Bearer ${adminToken}`
                }
            });
            
            if (response.status === 401) {
                dispatch(logoutAdmin(null));
                return;
            } else if (!response.ok) {
                console.log(response.text)
                return;
            }
            
            const data = await response.json();
            
            if (!data.success) {
                console.log(data.message);
            } else {
                console.log(data);
                dispatch(deleteUser(userID))
            }
        } catch (error) {
            
        }
    }

    const handleSortUser = (sort) => {
        let usersArr = [...allUsersArray] 
        if(sort === 'atz'){
            let usersSorted = usersArr.sort((a, b) => {
                const usernameA = a.username.toLowerCase(); 
                const usernameB = b.username.toLowerCase(); 
                if (usernameA < usernameB) {
                    return -1; 
                } else if (usernameA > usernameB) {
                    return 1; 
                } else {
                    return 0; 
                }
            });
           setAllUsersArray(usersSorted);
        }
        else if(sort === 'zta'){
            let usersSorted = usersArr.sort((a, b) => {
            const usernameA = a.username.toLowerCase(); // Convert to lowercase for case-insensitive comparison
            const usernameB = b.username.toLowerCase(); // Convert to lowercase for case-insensitive comparison
            
            if (usernameA > usernameB) {
                return -1; // a should come before b
            } else if (usernameA < usernameB) {
                return 1; // a should come after b
            } else {
                return 0; // a and b are equal
            }
            });
            setAllUsersArray(usersSorted);
        }
    }

    //search for users
    const handleSearchUsers = () => {
        console.log(query);
        let usersArr = [...users]
        let searchResults = usersArr.filter(user => user.username.toLowerCase().includes(query) );
        console.log(searchResults)
        setAllUsersArray(searchResults);
    }

    return (
    <div className='container'>
        {error && <h2 className="text-center text-danger">{error}</h2> }
        {! error && (
        <>
            {/* admin search sort and filter  */}
            <div className=" p-3 d-flex justify-content-between align-items-center">
                <div className="d-flex">                
                    <input value={query} onChange={e => setQuery(e.target.value)} type="text" className="form-control"  placeholder="search users" />                
                    <button onClick={handleSearchUsers} id="userSearchBtn" className="btn border border-2">🔍</button>
                </div>

                <div className="d-flex">
                    <div className="dropdown">
                        <button className="btn border border-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort by
                        </button>
                        <ul className="dropdown-menu">
                            <li onClick={() =>handleSortUser('atz')} style={{cursor: "pointer"}}><p className="dropdown-item">A- Z</p></li>
                            <li onClick={() =>handleSortUser('zta')} style={{cursor: "pointer"}}><p className="dropdown-item">Z - A</p></li>
                        </ul>
                    </div>

                    <Link to={'/admin/add-user'} className="btn btn-success ms-3">
                        Add user
                    </Link>
                
                </div>

            </div>

            <h1 className="text-center mt-5 text-secondary">Users</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="lead fw-bold" scope="col">#</th>
                        <th className="lead fw-bold" scope="col">Username</th>
                        <th className="lead fw-bold" scope="col">email</th>
                        <th className="lead fw-bold" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsersArray?.map(user => (
                            <tr key={user?._id}>
                                <th>{user?._id}</th>
                                <td>{user?.username}</td>
                                <td>{user?.email}</td>
                                <td>
                                    <Link to={'/admin/update-user/'+user?._id} className="mx-2 btn btn-warning">edit</Link>
                                    <button onClick={() => handleDeleteUser(user?._id)} className="mx-2 btn btn-danger">delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
        )}

    </div>
    )
}

export default AdminHome