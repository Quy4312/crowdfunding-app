import LayoutDashBoard from "layout/LayoutDashboard";
import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import LayoutPayment from "layout/LayoutPayment";
import { useDispatch, useSelector } from "react-redux";
import { authRefreshToken, authUserUpdate } from "store/auth/auth-slice";
import { getToken, logOut } from "utils/auth";
import PaymentPage from "pages/PaymentPage";
import WithdrawPage from "pages/WithdrawPage";
import RequiredAuthPage from "pages/RequiredAuthPage";
import { permissions } from "constants/permissions";
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const CampaignPage = lazy(() => import("./pages/CampaignPage"));
const StartCampaignPage = lazy(() => import("./pages/StartCampaignPage"));
const CampaignView = lazy(() => import("modules/campaign/CampaignView"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ShippingPage = lazy(() => import("./pages/ShippingPage"));
const UnAuthorizePage = lazy(() => import("./pages/UnAuthorizePage"));

const customStyles = {
  content: {},
};

Modal.setAppElement("#root");
Modal.defaultStyles = {};
function App() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.id) {
      const { access_token } = getToken();

      dispatch(
        authUserUpdate({
          user: user,
          accessToken: access_token,
        })
      );
    } else {
      const { refresh_token } = getToken();
      if (refresh_token) {
        dispatch(authRefreshToken(refresh_token));
      } else {
        dispatch(authRefreshToken({}));
        logOut();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);
  return (
    <Suspense>
      <Routes>
        <Route element={<LayoutDashBoard></LayoutDashBoard>}>
          <Route path="/" element={<DashboardPage></DashboardPage>}></Route>
          <Route
            path="/unauthorize"
            element={<UnAuthorizePage></UnAuthorizePage>}
          ></Route>
          <Route
            path="/withdraw"
            element={<WithdrawPage></WithdrawPage>}
          ></Route>
          <Route path="/payment" element={<PaymentPage></PaymentPage>}></Route>
          <Route
            path="/campaign"
            element={<CampaignPage></CampaignPage>}
          ></Route>
          <Route
            path="/campaign/:slug"
            element={<CampaignView></CampaignView>}
          ></Route>
          <Route
            element={
              <RequiredAuthPage
                allowPermissions={[permissions.campaigns.CREATE_CAMPAIGN]}
              ></RequiredAuthPage>
            }
          >
            <Route
              path="/start-campaign"
              element={<StartCampaignPage></StartCampaignPage>}
            ></Route>
          </Route>
        </Route>
        <Route element={<LayoutPayment></LayoutPayment>}>
          <Route
            path="/checkout"
            element={<CheckoutPage></CheckoutPage>}
          ></Route>
          <Route
            path="/shipping-address"
            element={<ShippingPage></ShippingPage>}
          ></Route>
        </Route>
        <Route path="/register" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/login" element={<SignInPage></SignInPage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
