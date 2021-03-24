import { useState } from "react";
import { Redirect } from "react-router";
import { login } from "./../api/auth";
import {
  loginSuccess,
  loginFail,
  useAuthContext,
} from "./../contexts/AuthContext";

const Login = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, dispatch } = useAuthContext();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(name);
      dispatch(loginSuccess(name));
    } catch (error) {
      dispatch(loginFail(error.message));
    } finally {
      setLoading(false);
    }
  };

  if (auth.isLoggedIn) {
    <Redirect to="/todos" />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      {auth.error && <p>{auth.error}</p>}
    </div>
  );
};

export default Login;
