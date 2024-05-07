import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addUser, logoutAdmin } from "../../redux-tk/adminSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminAddUser() {

    const [error, setError] = useState(null);
    const { register, formState: { errors }, watch, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const adminToken = useSelector(store => store.admin.admin);
    const navigate = useNavigate();

    const onSubmit = async(userData) => {
        console.log(userData);
        
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_ADMIN_BASE_URL+"/add-new-user", {
                method:"post",
                headers: {
                    authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(userData)
            });
            
            if (response.status === 401) {
                dispatch(logoutAdmin(null));
                return;
            }
            
            const data = await response.json();
            
            if (!data.success) {
                setError(data.message);
                console.log(data)
            }else{
                console.log(data);
                dispatch(addUser(data))
                navigate('/admin/')
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="shadow p-5 bg-body-tertiary" style={{width: "30rem"}}>
                <h2 className="text-center mb-4 text-secondary">➕ Add user</h2>
                {
                    error && <h2 className="text-center mb-4 text-danger">{error}</h2>

                }
                <form  className="row g-1 needs-validation" onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="col-md-12">
                        <label for="validationUsername" className="form-label">Username</label>
                        <input {...register("username", { required: true, minLength:4, maxLength:15 })} type="text" className="form-control" />
                        {errors.username?.type === 'required' && <p style={{color:'red'}}>Username is required</p>}
                        {errors.username?.type === 'minLength' && <p style={{color:'red'}}>Username should have atleast 4 characters</p>}
                        {errors.username?.type === 'maxLength' && <p className='' style={{color:'red'}}>Username too long</p>}
                    </div>
                    
                    <div className="col-md-12">
                        <label className="form-label">email</label>
                        <input {...register("email", {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} type="email" className="form-control" />
                        {errors.email?.type === 'required' && <p style={{color:'red'}}>email required</p>}
                        {errors.email?.type === 'pattern' && <p style={{color:'red'}}>Please check your email</p>}
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Password</label>
                        <input {...register("password", { required: true, minLength:6 })} type="password" className="form-control" />
                        {errors.password?.type === 'required' && <p style={{color:'red'}}>Password required</p>}
                        {errors.password?.type === 'minLength' && <p style={{color:'red'}}>Password should me 6 or more characters</p>}
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Confirm Password</label>
                        <input
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
                    <div className="my-3 text-center w-full">
                        <input className="btn btn-info" type="submit" value="Add now" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminAddUser