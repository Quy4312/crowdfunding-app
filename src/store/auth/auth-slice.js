import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    accessToken: null,
  },
  reducers: {
    authLogin: (state, action) => ({
      ...state,
      // ...action.payload,
      // accessToken: action.payload.accessToken,
      // refreshToken: action.payload.refreshToken,
    }),
    authRegister: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    authUserUpdate: (state, action) => {
      return {
        // ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    },
    authFetchMe: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    authRefreshToken: (state, action) => ({}),
    authLogOut: (state, action) => ({}),
  },
});
export const {
  authLogin,
  authRegister,
  authUserUpdate,
  authFetchMe,
  authRefreshToken,
  authLogOut,
} = authSlice.actions;
export default authSlice.reducer;
