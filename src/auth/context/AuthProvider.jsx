import { useReducer } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import { REACT_APP_API_URL_LOGIN } from "../../utils/constants";
import { types } from "../types/types";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const created = JSON.parse(localStorage.getItem("register"));
  const verify = JSON.parse(localStorage.getItem("verify"));
  return {
    isLogged: !!user,
    user: user,
    isCreated: !!created,
    isVerify: !!verify,
  };
};
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);
  const api = helpHttp();
  let url = REACT_APP_API_URL_LOGIN;

  const signUp = async (data = {}) => {
    const options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    try {
      const res = await api.post(url + "user/signup", options);
      localStorage.setItem("register", JSON.stringify(res));
      const action = { type: types.signUp, payload: res };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (loginUser = {}) => {
    const options = {
      body: loginUser,
      headers: { "content-type": "application/json" },
    };
    try {
      const res = await api.post(url + "user/signin", options);
      localStorage.setItem("user", JSON.stringify(res));
      localStorage.setItem("token-auth", JSON.stringify(res.token));
      const action = { type: types.login, payload: res };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token-auth");
    localStorage.removeItem("register");
    localStorage.removeItem("verify");
    const action = { type: types.logout };
    dispatch(action);
  };
  const verify = async (data = {}) => {
    const options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    try {
      const res = await api.post(url + "user/verify", options);
      localStorage.setItem("verify", JSON.stringify(res));
      const action = { type: types.verify, payload: res };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ ...authState, signUp, login, logout, verify }}
    >
      {children}
    </AuthContext.Provider>
  );
};
