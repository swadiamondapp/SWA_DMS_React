import React from "react";
import LoginBnner from "../../assets/login.png";
import SuccessIcon from "../../assets/otpSuccess.png";
import "./forgotPassword.css";
import { useLocation, Link, useNavigate } from "react-router-dom";

const PasswordResetComplete = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="Login_bg">
        <div className="Right_Section_forgot">
          <div className="resetPass">
            <div style={{margin:'10px 0px'}} >
              <img src={SuccessIcon} alt="" />
            </div>
            <p className="forgotTitle" style={{ textAlign: "center", margin:'10px 0px'}}>
              Password reset completed
            </p>
            <span className="forgotSub">
              Your password reset was successful. you can now
            </span>
            <br />
            <span className="forgotSub">
              proceed to login in to your account
            </span>
            <Link to="/" style={{ margin: "15px 0px" ,width:"100%"}}>
              <button  className="button_Send">
                Go to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetComplete;
