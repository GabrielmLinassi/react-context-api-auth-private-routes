import { Redirect, Route } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { auth } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
