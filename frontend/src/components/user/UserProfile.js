import { useState } from 'react';
import { useForm } from 'react-hook-form';

function UserProfile() {
    const [previewUrl, setPreviewUrl] = useState(null);

    let USER_DEFAULT_IMAGE = 'https://th.bing.com/th/id/OIP.wRBGXNn1WOjghttSJbyxKwHaHa?w=600&h=600&rs=1&pid=ImgDetMain';

    // user profile pic upload form
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log('Form data:', data.image[0]);
    };

    //user profile image preview
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    };

    return (
        <>
            {/* user profile card */}
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-md-9 col-lg-7 col-xl-5 mt-5">
                    <div className="card" style={{ borderRadius: '15px' }}>
                    <div className="card-body p-4">
                        <div className="d-flex text-black">
                        <div className="flex-shrink-0">
                            <img
                            src={USER_DEFAULT_IMAGE}
                            alt="Profile"
                            className="img-fluid"
                            style={{ width: '180px', borderRadius: '10px' }}
                            />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h5 className="card-title">Danny McLoan</h5>
                            <p className="card-text">dannyncloan@gmail.com</p>
                            <p className="card-text"> Joined on : 12/12/12</p>
                            <div className="d-flex pt-1">
                            <button className="btn btn-outline-primary me-1 flex-grow-1">
                                Edit Profile
                            </button>
                            <button className='btn btn-danger flex-grow-1'>
                                Delete Account
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* user profile image update card */}
            <div className="container my-5">
                <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4">Update Profile Pic</h5>
                        <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Display image preview */}
                        {previewUrl && (
                            <div className="text-center mb-3">
                                <img
                                    src={previewUrl}
                                    alt="Selected profile preview"
                                    className="img-thumbnail"
                                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                />
                            </div>
                        )}

                        {/* Image field */}
                        <div className="mb-3">
                            <input
                            type="file"
                            id="image"
                            name="image"
                            className={`form-control`}
                            {...register('image')}
                            onChange={handleImageChange}
                            />
                        </div>

                        {/* Submit button */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                            Update Profile pic
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile