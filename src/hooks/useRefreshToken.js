import axios from "api/axios";
import { useDispatch, useSelector } from "react-redux";
import { authUserUpdate } from "store/auth/auth-slice";
import { getToken, saveToken } from "utils/auth";

export default function useRefreshToken() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  async function refresh() {
    const { refresh_token } = getToken();
    if (!refresh_token) return null;
    const response = await axios.post("/token", {
      "Content-Type": "Application/json",
      refreshToken: refresh_token,
    });
    if (!response.data) return null;
    console.log(
      "🚀 ~ refresh ~ response.data.refreshToken:",
      response.data.refreshToken
    );
    saveToken(response.data.accessToken, response.data.refreshToken);

    dispatch(
      authUserUpdate({
        user: { ...auth.user, refreshToken: response.data.refreshToken },
        accessToken: response.data.accessToken,
      })
    );
    return response.data.accessToken || "";
  }

  return refresh;
}
