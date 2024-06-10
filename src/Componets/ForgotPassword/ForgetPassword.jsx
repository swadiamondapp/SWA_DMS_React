import React from "react";
import LoginBnner from "../../assets/login.png";
import LockIcons from "../../assets/lockForgot.png";
import "./forgotPassword.css";
import { useLocation, Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault()

  }
  return (
    <div>
      <div className="Login_bg">
        <div className="Right_Section_forgot">
          <div className="forgotPasswordContainer">
            <img src={LockIcons} alt="" />
            <p className="forgotTitle">Forgot password</p>
            <span className="forgotSub">
              Enter the registered email address and we’ll send an <br /> OTP to
              recover your password
            </span>
            <form action="" onSubmit={()=> handleSubmit(e)}>
              <div className="input_forgot_feid">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="forgotPass_email"
                />
                <Link to="/verifyotp">
                  <button className="button_Send">Send</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
