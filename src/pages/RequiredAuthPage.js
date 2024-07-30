import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const RequiredAuthPage = ({ allowPermissions }) => {
  const { user } = useSelector((state) => state.auth);
  const userPermissions = user?.permissions || [];
  const location = useLocation();
  // console.log("🚀 ~ StartCampaignPage ~ user:", user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user || !user.email) {
  //     navigate("/login");
  //   }

  // }, [user]);
  // if (!user || !user.email) return null;

  // return userPermissons.find((p) => allowPermissions?.include(p)) ? (
  //   <Outlet></Outlet>
  // ) : user ? (
  //   <Navigate to="/unauthorize" state={{ from: location }} replace></Navigate>
  // ) : (
  //   <Navigate to="/login" state={{ from: location }}></Navigate>
  // );
  // return <Outlet></Outlet>;
  return userPermissions.some((permission) =>
    allowPermissions?.includes(permission)
  ) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorize" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequiredAuthPage;
