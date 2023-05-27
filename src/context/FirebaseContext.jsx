import React, { createContext, useContext } from "react";
import { useFirebaseAuth } from "../hook/useFirebaseAuth";

// Create Auth Context
export const AuthContext = createContext({
  user: null,
  error: null,
  loading: false,
  setUser: async () => Promise.resolve(),
  login: async () => Promise.resolve(),
  register: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
});

export const FirebaseAuthProvider = ({ children }) => {
  const auth = useFirebaseAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthContext);
