import React from "react";
import { useAuth } from "../context/FirebaseContext.jsx";

const Home = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h2>Home</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
