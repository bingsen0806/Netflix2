import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    if (res.data.isAdmin) {
      dispatch(loginSuccess(res.data));
    } else {
      dispatch(loginFailure());
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};
