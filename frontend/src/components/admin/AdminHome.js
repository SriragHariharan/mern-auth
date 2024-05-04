import React from 'react'

function AdminHome() {
    return (
    <div className='container'>
        {/* admin search sort and filter  */}
        <div className=" p-3 d-flex justify-content-between align-items-center">
            <div className="d-flex">                
                <input type="text" className="form-control" id="userSearchInput" placeholder="search users" />                
                <button id="userSearchBtn" className="btn border border-2">🔍</button>
            </div>

            <div className="d-flex">
                <div className="dropdown">
                    <button className="btn border border-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort by
                    </button>
                    <ul className="dropdown-menu">
                        <li style={{cursor: "pointer"}}><p className="dropdown-item">Newest</p></li>
                        <li style={{cursor: "pointer"}}><p className="dropdown-item">A - Z</p></li>
                        <li style={{cursor: "pointer"}}><p className="dropdown-item">Z - A</p></li>
                    </ul>
                </div>

                <button className="btn btn-success ms-3">
                    Add user
                </button>
            
            </div>

        </div>

        <h1 class="text-center mt-5 text-secondary">Users</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="lead fw-bold" scope="col">#</th>
                    <th class="lead fw-bold" scope="col">Username</th>
                    <th class="lead fw-bold" scope="col">email</th>
                    <th class="lead fw-bold" scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>_id</th>
                    <td>username</td>
                    <td>email</td>
                    <td>
                        <button class="mx-2 btn btn-warning">edit</button>
                        <button class="mx-2 btn btn-danger">delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
    )
}

export default AdminHome