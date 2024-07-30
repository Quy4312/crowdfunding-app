import { call, put } from "redux-saga/effects";
import {
  requestAuthFetchMe,
  requestAuthLogin,
  requestAuthRefreshToken,
  requestAuthRegister,
} from "./auth-requests";
import { toast } from "react-toastify";
import { logOut, saveToken } from "utils/auth";
import { authUserUpdate } from "./auth-slice";

export default function* handleAuthRegister(action) {
  const { payload, type } = action;
  try {
    const response = yield call(requestAuthRegister, payload);
    if (response.status === 201) {
      toast.success("Created new account successfully");
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleAuthLogin({ payload }) {
  try {
    const response = yield call(requestAuthLogin, payload);
    if (response.data.accessToken && response.data.refreshToken) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchMe, { payload: response.data.accessToken });
    }
  } catch (error) {
    console.log(error);
  }
}
function* handleAuthFetchMe({ payload }) {
  try {
    const response = yield call(requestAuthFetchMe, payload);
    // response.data->userInfo
    if (response.status === 200) {
      yield put(
        authUserUpdate({
          user: response.data,
          accessToken: payload,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
function* handleAuthRefreshToken({ payload }) {
  try {
    const response = yield call(requestAuthRefreshToken, payload);
    if (response.data.accessToken && response.data.refreshToken) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchMe, {
        payload: response.data.accessToken,
      });
      // cho tu lam
      // yield put(
      //   authUserUpdate({
      //     user: { ...getState().auth.user, refreshToken: response.data.refreshToken },
      //     accessToken: response.data.accessToken,
      //   })
      // );
      // cho tu lam
    } else {
      // yield handleAuthLogOut();
    }
  } catch (error) {}
}

function* handleAuthLogOut() {
  yield put(
    authUserUpdate({
      user: undefined,
      accessToken: null,
    })
  );
  logOut();
}
export {
  handleAuthLogin,
  handleAuthFetchMe,
  handleAuthRefreshToken,
  handleAuthLogOut,
};
