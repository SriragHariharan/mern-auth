//form for login the user 

import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';


function UserLogin() {

    //react hook form to perform form validation
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <div className="shadow p-5 bg-body-tertiary" style={{width: "30rem"}}>
                <h2 className="text-center mb-4 text-secondary">Hi Welcome back</h2>
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12">
                        <label className="form-label">email</label>
                        <input {...register("email", {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} type="email" className="form-control" novalidate/>
                        {errors.email?.type === 'required' && <p style={{color:'red'}}>email required</p>}
                        {errors.email?.type === 'pattern' && <p style={{color:'red'}}>Please check your email</p>}
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Password</label>
                        <input {...register("password", { required: true, minLength:6 })} type="password" className="form-control" />
                        {errors.password?.type === 'required' && <p style={{color:'red'}}>Password required</p>}
                        {errors.password?.type === 'minLength' && <p style={{color:'red'}}>Password should me 6 or more characters</p>}
                    </div>
                    <div className="mb-3 text-center w-full">
                        <input className="btn btn-info" type="submit" value="Login now" />
                    </div>
                </form>
                <hr />
                <div className="text-center" >
                    <p style={{textDecoration: "none"}}>New User? &nbsp;&nbsp; <Link to={'/auth/signup'}>Register Now</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default UserLogin