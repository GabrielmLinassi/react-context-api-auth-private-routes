import Todos from "./components/todos/Todos";
import Login from "./components/Login";
import { TodoProvider } from "./contexts/TodoContext";
import { AuthProvider, logout, useAuthContext } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Greeting />
        <Switch>
          <PrivateRoute path="/todos">
            <TodoProvider>
              <Todos />
            </TodoProvider>
          </PrivateRoute>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

const Greeting = () => {
  const { auth, dispatch } = useAuthContext();

  if (!auth.isLoggedIn) {
    return <p>You are not logged in</p>;
  }

  return (
    <div>
      <p>Hello, {auth.name}!</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default App;
