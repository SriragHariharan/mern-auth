import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { isExpired } from "react-jwt";

//LAYOUTS
import RootLayout from "../components/layouts/RootLayout";

import AdminAuthRoot from "../components/layouts/AdminAuthRoot";
import AdminRoot from "../components/layouts/AdminRoot";

import UserRoot from "../components/layouts/UserUnAuthRoot";
import UserAuthRoot from "../components/layouts/UserAuthRoot";

//pages
import UserHomepage from "../components/user/UserHomepage";
import UserLogin from "../components/user/UserLogin";
import UserSignup from "../components/user/UserSignup";
import UserProfile from "../components/user/UserProfile";

import AdminHome from "../components/admin/AdminHome";
import AdminAddUser from "../components/admin/AdminAddUser";
import AdminUpdateUser from "../components/admin/AdminUpdateUser";
import AdminLogin from "../components/admin/AdminLogin";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../redux-tk/adminSlice";
import { logoutUser } from "../redux-tk/userSlice";

function useRoutes(){
    const dispatch = useDispatch();
    const ADMIN = useSelector(store => store.admin.admin);
    const USER = useSelector(store => store.user.userToken);
    console.log(ADMIN)
    console.log(USER)

    //admin jwt expiration check
    let isAdminyTokenExpired = isExpired(ADMIN);
    if(isAdminyTokenExpired){
        dispatch(logoutAdmin(null));
    }

    //user jwt expiration check
    let isMyTokenExpired = isExpired(USER);
    if(isMyTokenExpired){
        dispatch(logoutUser());
    }

    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            {/* user routes */}
            <Route path="/" element={<UserAuthRoot />} >
                <Route index element={USER ? <UserHomepage /> : <Navigate to={'/auth/login'}/> } />
                <Route path="profile" element={USER ? <UserProfile /> : <Navigate to={'/auth/login'}/>} />
            </Route>
            <Route path="/auth" element={<UserRoot />} >
                <Route path="login" element={!USER ? <UserLogin />   : <Navigate to={'/'}/>   } />
                <Route path="signup" element={!USER ? <UserSignup /> : <Navigate to={'/'}/> } />
            </Route>

            {/* admin routes */}
            <Route path="admin" element={<AdminAuthRoot />} >
                <Route index element={ADMIN ? <AdminHome /> : <Navigate to={'/admin/auth/login'} /> } />
                <Route path="add-user" element={ADMIN ? <AdminAddUser /> : <Navigate to={'/admin/auth/login'} />} />
                <Route path="update-user/:id" element={ADMIN ? <AdminUpdateUser /> : <Navigate to={'/admin/auth/login'} />} />
            </Route>
            <Route path="admin/auth" element={<AdminRoot />} >
                <Route path="login" element={!ADMIN ? <AdminLogin /> : <Navigate to={'/admin'} />} />
            </Route>
        </Route>
      )
    );
    return router;
}

export default useRoutes;
