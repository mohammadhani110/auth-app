import { useState, useEffect } from "react";

import {
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
      setLoading(null);
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);
  // async function setupRecaptcha() {
  //   const widgetId = window.recaptchaWidgetId;
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       "sign-in-button",
  //       {
  //         size: "invisible",
  //         callback: (response) => {
  //           // reCAPTCHA solved, allow signInWithPhoneNumber.
  //           onSigninWithPhone();
  //         },
  //         "expired-callback": () => {
  //           // Response expired. Ask user to solve reCAPTCHA again.
  //           // ...
  //         },
  //         widgetId,
  //       },
  //       auth
  //     );
  //   }
  // }

  // const onSigninWithPhone = async (phoneNumber) => {
  //   try {
  //     const appVerifier = window.recaptchaVerifier;
  //     const phoneNumber = "+92347388430"; // Replace with the user's phone number

  //     const confirmationResult = await signInWithPhoneNumber(
  //       auth,
  //       phoneNumber,
  //       appVerifier
  //     );
  //     window.confirmationResult = confirmationResult;
  //     // Proceed with OTP verification
  //     const verificationCode = window.prompt(
  //       "Enter the OTP sent to your phone number:"
  //     );
  //     if (verificationCode) {
  //       const response = await confirmationResult.confirm(verificationCode);
  //       // OTP verification successful
  //       console.log("User successfully logged in", response);
  //       var user = response.user;
  //       user.getIdToken().then((idToken) => {
  //         window.localStorage.setItem("idToken", idToken);

  //         console.log("idToken", idToken);
  //       });
  //       setUser(user);
  //     } else {
  //       // OTP verification cancelled
  //       console.error("OTP verification cancelled");
  //       window.alert("Error while checking the verification code:\n\n");
  //       setUser(null);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setUser(null);
  //   }

  //   // try {
  //   //   const confirmationResult = await signInWithPhoneNumber(
  //   //     auth,
  //   //     phoneNumber,
  //   //     appVerifier
  //   //   );
  //   //   console.log("confirmationResult: " + confirmationResult);
  //   //   const verificationCode = window.prompt(
  //   //     "Enter the OTP sent to your phone number:"
  //   //   );
  //   //   if (verificationCode) {
  //   //     const response = await confirmationResult.confirm(verificationCode);
  //   //     // OTP verification successful
  //   //     console.log("User successfully logged in", response);
  //   //     var user = response.user;
  //   //     user.getIdToken().then((idToken) => {
  //   //       window.localStorage.setItem("idToken", idToken);

  //   //       console.log("idToken", idToken);
  //   //     });
  //   //   } else {
  //   //     // OTP verification cancelled
  //   //     console.error("OTP verification cancelled");
  //   //     window.alert("Error while checking the verification code:\n\n");
  //   //   }
  //   // } catch (error) {
  //   //   // OTP verification failed
  //   //   console.error(" OTP verification failed", error);
  //   //   setError(error.message);
  //   // }
  // };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("response login", response);
      setUser(response.user);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("res register", response);
      setUser(response.user);
      setError(null);
    } catch (error) {
      console.log("reg", error);
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    setUser,
    error,
    loading,
    login,
    register,
    logout,
  };
};
