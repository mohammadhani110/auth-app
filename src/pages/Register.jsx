import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/FirebaseContext.jsx";

const Register = () => {
  const { register, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    await register(email, password);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleRegister}
        style={{
          marginBlock: 10,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: 400,
          marginInline: "auto",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
