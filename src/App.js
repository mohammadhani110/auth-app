import React from "react";
import { useAuth } from "./context/FirebaseContext.jsx";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const App = () => {
  const { loading, user } = useAuth();

  const PrivateRoute = () => {
    if (user) {
      return <Outlet />;
    }
    return <Navigate to="/login" />;
  };
  const UnAuthenticatedRoute = ({ user, component: Component }) => {
    if (user) {
      return <Navigate to="/" />;
    }
    return <Component />;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={<UnAuthenticatedRoute component={Login} user={user} />}
        />
        <Route
          exact
          path="/register"
          element={<UnAuthenticatedRoute component={Register} user={user} />}
        />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
