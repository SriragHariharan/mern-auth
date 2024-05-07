import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../redux-tk/adminSlice";
import { useNavigate } from "react-router-dom";
import useGetUserDetails from "../../hooks/useGetUserDetails";

function AdminUpdateUser() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {id} = useParams();
    console.log("paramsID",id)
    const userDetails = useGetUserDetails(id);
    const adminToken = useSelector(store => store.admin.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onSubmit = async(data) => {
        try {
            console.log("fd",data);
            let resp = await fetch(process.env.REACT_APP_BACKEND_ADMIN_BASE_URL+"/update-user-details/"+id,
                {
                    method:"post",
                    headers:{
                        authorization: `Bearer ${adminToken}`,
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(data)
                }
            )
            console.log(resp)
            if(resp.status===401){
                dispatch(logoutAdmin(null));
                return;
            }
            let jsonData = await resp.json();
            if(jsonData.success){
                navigate('/admin')
            }
        } catch (error) {
            console.log(error.message)   
        }
    } 

    return (
            <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
                <div className="shadow p-5 bg-body-tertiary" style={{width: "30rem"}}>
                    <h2 className="text-center mb-4 text-secondary">✒️ Edit User</h2>
                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="col-md-12">
                            <label className="form-label">Username</label>
                            <input placeholder={userDetails?.username} {...register("username", { required: true, minLength:4, maxLength:15 })} type="text" className="form-control" />
                            {errors.username?.type === 'required' && <p style={{color:'red'}}>Username is required</p>}
                            {errors.username?.type === 'minLength' && <p style={{color:'red'}}>Username should have atleast 4 characters</p>}
                            {errors.username?.type === 'maxLength' && <p className='' style={{color:'red'}}>Username too long</p>}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">email</label>
                            <input placeholder={userDetails?.email} {...register("email", {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} type="email" className="form-control" novalidate/>
                            {errors.email?.type === 'required' && <p style={{color:'red'}}>email required</p>}
                            {errors.email?.type === 'pattern' && <p style={{color:'red'}}>Please check your email</p>}
                        </div>

                        <div className="mb-3 text-center w-full">
                            <input className="btn btn-info" type="submit" value="Change details" />
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default AdminUpdateUser;