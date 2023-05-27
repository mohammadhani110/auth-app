import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { useAuth } from "../context/FirebaseContext";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [isValidOTP, setIsValidOTP] = useState(true);
  const [otp, setOTP] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const auth = getAuth();
  const { setUser } = useAuth();

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    setPhoneNumber(inputPhoneNumber);

    // Validate the input using regex
    const regex = /^\+92\d{10}$/; // Regex pattern for "+92xxxxxxxxxx"
    const isValidPhoneNumber = regex.test(inputPhoneNumber);
    setIsValid(isValidPhoneNumber);
  };

  const handleOTPChange = (e) => {
    const otp = e.target.value;
    setOTP(otp);

    // Validate the input using regex
    const regex = /^\d{1,6}$/; // Regex pattern for "+92xxxxxxxxxx"
    const isValidOTP = regex.test(otp);
    setIsValidOTP(isValidOTP);
  };

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            this.handleSignIn();
          },
        },
        auth
      );
    }

    return () => {};
  }, []);

  const handleSignIn = async () => {
    if (!isValid) {
      console.log("Invalid phone number:", phoneNumber);
      setIsValid(false);
      return;
    }
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      console.log("OTP sent confirmation", confirmation);
      setConfirmationResult(confirmation);
      setCurrentStep(2);
      // const otp = +window.prompt("Enter confirmation code");
      // console.log("OTP sent", otp);
      // const otpVerified = await confirmation.confirm(otp);
      // console.log("OTP verified", otpVerified);
      // setUser(otpVerified.user);
    } catch (error) {
      console.error(error);
      setUser(null);
      alert(error.message);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    if (!isValidOTP) {
      console.log("Invalid OTP:", otp);
      setIsValidOTP(false);
      return;
    }
    try {
      const otpVerified = await confirmationResult.confirm(+otp);
      console.log("User successfully logged in", otpVerified);
      setUser(otpVerified.user);
    } catch (error) {
      setUser(null);
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      {currentStep === 1 && (
        <div>
          <h2>Phone Number Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="+92xxxxxxxxxx"
              maxLength={13}
            />
            {!isValid && (
              <p style={{ color: "red" }}>Invalid phone number format.</p>
            )}
            <br />
            <button type="submit">Send OTP</button>
          </form>
        </div>
      )}
      <br />
      {currentStep === 2 && (
        <div>
          <h2>OTP Verification</h2>
          <form onSubmit={handleOTPVerification}>
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOTPChange}
              maxLength={6}
            />
            {!isValidOTP && <p style={{ color: "red" }}>Invalid OTP format.</p>}
            <br />
            <button type="submit">Verify OTP</button>
          </form>
        </div>
      )}
      <div id="recaptcha-container"></div>{" "}
      {/* Container for the reCAPTCHA widget */}
    </div>
  );
};

export default PhoneLogin;
