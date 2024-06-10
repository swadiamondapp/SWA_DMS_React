import React, { useState, useRef } from "react";
import LoginBnner from "../../assets/login.png";
import OtpIcon from "../../assets/otpIcon.png";
import "./forgotPassword.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Link } from "react-router-dom";

const ForgotPassOtp = () => {
  const [OTP, setOTP] = useState("");

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
    width: "50px",
    height: "50px",
    borderRadius: "4px",
    border: '1px solid #DFE5EC'
  };

  const focusStyle = {
    border: "1px solid #blue",
    outline: "none",
  };

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
                    OTPLength={4}
                    otpType="number"
                    disabled={false}
                    inputClassName="otp-input" // Apply input class
                    focusClassName="otp-input:focus" // Apply focus class
                  />
                </div>
                <Link to="/createnewpassword">
                <button className="button_Send">Verify</button>
                </Link>
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
