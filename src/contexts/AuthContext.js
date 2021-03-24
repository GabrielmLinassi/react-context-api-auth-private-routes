import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  name: null,
  error: null,
};

// Actions
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";

// Action creators
export const loginSuccess = (name) => {
  return { type: LOGIN_SUCCESS, name };
};

export const loginFail = (error) => {
  return { type: LOGIN_FAIL, error };
};

export const logout = () => {
  return { type: LOGOUT };
};

// Reducer
const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { isLoggedIn: true, name: action.name, error: null };

    case LOGIN_FAIL:
      return { isLoggedIn: false, name: null, error: action.error };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export const AuthProvider = (props) => {
  const [auth, dispatch] = useReducer(AuthReducer, initialState);

  const authData = { auth, dispatch };

  return <AuthContext.Provider value={authData} {...props} />;
};

export const useAuthContext = () => useContext(AuthContext);
