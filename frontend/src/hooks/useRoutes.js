import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

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


function useRoutes(){
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            {/* user routes */}
            <Route path="/" element={<UserAuthRoot />} >
                <Route index element={<UserHomepage />} />
                <Route path="profile" element={<UserProfile />} />
            </Route>
            <Route path="/auth" element={<UserRoot />} >
                <Route path="login" element={<UserLogin />} />
                <Route path="signup" element={<UserSignup />} />
            </Route>

            {/* admin routes */}
            <Route path="admin" element={<AdminAuthRoot />} >
                <Route index element={<AdminHome />} />
                <Route path="add-user" element={<AdminAddUser />} />
                <Route path="update-user" element={<AdminUpdateUser />} />
            </Route>
            <Route path="admin/auth" element={<AdminRoot />} >
                <Route path="login" element={<AdminLogin />} />
            </Route>
        </Route>
      )
    );
    return router;
}

export default useRoutes;
