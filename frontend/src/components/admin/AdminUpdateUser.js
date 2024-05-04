import { useForm } from "react-hook-form";

function AdminUpdateUser() {
    //react hook form to perform form validation
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
            <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
                <div className="shadow p-5 bg-body-tertiary" style={{width: "30rem"}}>
                    <h2 className="text-center mb-4 text-secondary">✒️ Edit User</h2>
                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="col-md-12">
                            <label className="form-label">Username</label>
                            <input {...register("username", { required: true, minLength:4, maxLength:15 })} type="text" className="form-control" />
                            {errors.username?.type === 'required' && <p style={{color:'red'}}>Username is required</p>}
                            {errors.username?.type === 'minLength' && <p style={{color:'red'}}>Username should have atleast 4 characters</p>}
                            {errors.username?.type === 'maxLength' && <p className='' style={{color:'red'}}>Username too long</p>}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">email</label>
                            <input {...register("email", {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} type="email" className="form-control" novalidate/>
                            {errors.email?.type === 'required' && <p style={{color:'red'}}>email required</p>}
                            {errors.email?.type === 'pattern' && <p style={{color:'red'}}>Please check your email</p>}
                        </div>

                        <div className="mb-3 text-center w-full">
                            <input className="btn btn-info" type="submit" value="Login now" />
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default AdminUpdateUser;