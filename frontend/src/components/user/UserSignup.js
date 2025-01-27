import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from '../../redux-tk/userSlice';


function UserSignup() {
    const[error, setError] = useState(null);
    const { register, formState: { errors }, watch, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async(data) => {
        try {
            
            console.log(data);
            let resp = await fetch(process.env.REACT_APP_BACKEND_USER_BASE_URL + "/signup",
                {
                    method:"post",
                    body:JSON.stringify(data),
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
            )
            let jsonData = await resp.json()
            if(!jsonData.success){
                console.log(jsonData.message)
                setError(jsonData.message)
            }else{
                console.log(jsonData.data)
                const {username, userId, token} = jsonData?.data
                dispatch(loginUser({username, userID:userId, userToken:token }));
                navigate('/')
            }
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }
    } 
    
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <div className="shadow p-5 bg-body-tertiary" style={{width: "30rem"}}>
                <h2 className="text-center mb-4 text-secondary">Hi Signup please</h2>
                <form  className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
                    {
                        error && <h5 className="text-center mb-4 text-danger">{error}</h5>
                    }                    
                    <div className="col-md-12">
                        <label className="form-label">Username</label>
                        <input value="ruttappa@bcci.ind" {...register("username", { required: true, minLength:4, maxLength:24 })} type="text" className="form-control" />
                        {errors.username?.type === 'required' && <p style={{color:'red'}}>Username is required</p>}
                        {errors.username?.type === 'minLength' && <p style={{color:'red'}}>Username should have atleast 4 characters</p>}
                        {errors.username?.type === 'maxLength' && <p className='' style={{color:'red'}}>Username too long</p>}
                    </div>
                    
                    <div className="col-md-12">
                        <label className="form-label">email</label>
                        <input value="ruttappa@bcci.ind" {...register("email", {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} type="email" className="form-control" />
                        {errors.email?.type === 'required' && <p style={{color:'red'}}>email required</p>}
                        {errors.email?.type === 'pattern' && <p style={{color:'red'}}>Please check your email</p>}
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Password</label>
                        <input value="ruttappa@bcci.ind" {...register("password", { required: true, minLength:6 })} type="password" className="form-control" />
                        {errors.password?.type === 'required' && <p style={{color:'red'}}>Password required</p>}
                        {errors.password?.type === 'minLength' && <p style={{color:'red'}}>Password should me 6 or more characters</p>}
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Confirm Password</label>
                        <input value="ruttappa@bcci.ind"
                            {...register("confirm_password", {
                              required: true,
                              validate: (val) => {
                                if (watch('password') !== val) {
                                  return "passwords mismatch";
                                }
                              },
                            })}
                            type="password" className="form-control" />
                            {errors.confirm_password?.type === 'validate' && <p style={{color:'red'}}>Passwords doesnt match</p>}
                    </div>
                    <div className="mb-3 text-center w-full">
                        <input className="btn btn-info" type="submit" value="Register now" />
                    </div>
                </form>
                <hr />
                <div className="text-center" >
                    <p>Existing User? &nbsp; <Link to={'/auth/login'}>Login Now</Link></p>
                </div>
            </div>
        </div>
    )
}

export default UserSignup