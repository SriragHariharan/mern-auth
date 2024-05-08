import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, setUserProfilePic } from '../../redux-tk/userSlice';
import useLoginUser from '../../hooks/useLoginUser';

// Function to convert an image to a Base64 string
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

function UserProfile() {
    const [previewUrl, setPreviewUrl] = useState(null);
    const {user, error} = useLoginUser();
    const[imageError, setImageError] = useState(null);

    let USER_DEFAULT_IMAGE = 'https://th.bing.com/th/id/OIP.wRBGXNn1WOjghttSJbyxKwHaHa?w=600&h=600&rs=1&pid=ImgDetMain';
    const userToken = useSelector(store => store?.user?.userToken);
    const userDP = useSelector(store => store?.user?.userProflePic) ?? USER_DEFAULT_IMAGE
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // user profile pic upload form
    const { register, handleSubmit } = useForm();
    const onSubmit = async(data) => {
        try {
            if(!data.image[0]){
                console.log("No image found");
                return;
            }
            console.log('Form data:', data.image[0]);
            const base64Image = await fileToBase64(data.image[0]);
            console.log(base64Image);

            const response = await fetch(process.env.REACT_APP_BACKEND_USER_BASE_URL + "/upload-profile_pic" , {
                method: 'POST',
                body: JSON.stringify({ file: base64Image }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${userToken}`
                },
            });
            if(response.status===401){
                dispatch(logoutUser());
                navigate('/auth/login')
            }
            const jsonData = await response.json();
            console.log(jsonData);         
            if(!jsonData.success){
                setImageError(jsonData.message)
            }else{
                dispatch(setUserProfilePic(jsonData.data.imageURL));
            }
        } catch (error) {
            setImageError(error.message)
        }

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

    if(!user && error) return;
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
                            src={userDP}
                            alt="Profile"
                            className="img-fluid"
                            style={{ width: '180px', borderRadius: '10px' }}
                            />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h5 className="card-title">{user?.username}</h5>
                            <p className="card-text">{user?.email}</p>
                            <p className="card-text"> Joined on : {user?.createdAt}</p>
                            <div className="d-flex pt-1">
                            {/* <button className="btn btn-outline-primary me-1 flex-grow-1">
                                Edit Profile
                            </button>
                            <button className='btn btn-danger flex-grow-1'>
                                Delete Account
                            </button> */}
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
                        {
                            error &&  <p className="text-center text-danger">{error}</p>
                        }

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