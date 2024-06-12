import React, { useState, useRef, useEffect } from "react";
import LoginBnner from "../../assets/login.png";
import OtpIcon from "../../assets/otpIcon.png";
import "./forgotPassword.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ForgotPassOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [OTP, setOTP] = useState("");
  const [email, setEmail] = useState("");


  const renderButton = (buttonProps) => {
    return (
      <button className="renderButton" {...buttonProps}>
        Resend Code
      </button>
    );
  };
  //   const renderTime = (remainingTime) => {
  //     return <span>{remainingTime} seconds remaining</span>;
  //   };

  const inputStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "4px",
    border: "1px solid #DFE5EC",
  };

  const focusStyle = {
    border: "1px solid #blue",
    outline: "none",
  };

  const handleOtpPin = () => {
    if (OTP.length !== 6) {
      alert("Please enter a 6-digit OTP code.");
      return;
    }
    localStorage.setItem("otpforgot",OTP)
    navigate(`/createnewpassword`);
  };

  console.log(email, "em");
  return (
    <div>
      <div className="Login_bg">
        <div className="Right_Section_forgot">
          <div className="forgotPasswordContainer">
            <img src={OtpIcon} alt="" />
            <p className="titleotp">OTP</p>
            <span className="forgot_subTitle">
              We send a 6 digit OTP recovery code to your email
              <br />
              Enter the code to recover your password
            </span>
            <form action="">
              <div className="input_forgot_feid">
                <div className="otp_react">
                  <OTPInput
                    value={OTP}
                    onChange={setOTP}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    inputClassName="otp-input" // Apply input class
                    focusClassName="otp-input:focus" // Apply focus class
                  />
                </div>

                {/* <Link to=""> */}
                <button onClick={() => handleOtpPin()} className="button_Send">
                  Verify
                </button>
                {/* </Link> */}
                <div className="resentOtpButton" style={{ display: "flex" }}>
                  <span className="forgotSub">if code not recived, Click</span>
                  <ResendOTP
                    renderTime={() => null} // This hides the timer
                    maxTime={0}
                    renderButton={renderButton}
                    //   renderTime={renderTime}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassOtp;
