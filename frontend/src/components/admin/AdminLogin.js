import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../redux-tk/adminSlice";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const[error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        fetch(process.env.REACT_APP_BACKEND_ADMIN_BASE_URL+'/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
        .then(json => {
            console.log(json)
            if(!json.success) setError(json.message)
            else{
                dispatch(loginAdmin(json.data.token));
                navigate('/admin')
            }
        })
        .catch(err => setError(err.message))
    }
    
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <div className="shadow p-5 bg-body-tertiary" style={{width: "30rem"}}>
                <h2 className="text-center mb-4 text-secondary">Hi Admin !</h2>
                {error && <h2 className="text-center mb-4 text-danger">{error}</h2> }
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
            </div>
        </div>
    )
}

export default AdminLogin;
