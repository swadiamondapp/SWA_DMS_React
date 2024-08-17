import React, { useState } from "react";
import LoginBnner from "../../assets/login.png";
import LockIcons from "../../assets/lockForgot.png";
import "./forgotPassword.css";
import Joi from "joi";
import { forgot_password } from "./Api";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import SuccessModal from "../SuccessModal/SuccessModal";
import { useLocation, Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [emailId, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isStatus, setIsStatus] = useState([]);

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Please enter a valid email address.",
        "string.empty": "Email cannot be empty.",
        "any.required": "Email is required.",
      }),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schema.validate({ emailId }); // Validate email against schema
    if (error) {
      setError(error.details[0].message); // Set error message if validation fails
      return;
    }
    setError("");
    handleforgotPass();
  };
  const handleforgotPass = async () => {
    await forgot_password(
      setIsLoading,
      emailId,
      setSuccessModalOpen,
      setSuccessMessage,
      setIsStatus,
      navigate
    );

  };
  
  const handleOpen = () => {
    setSuccessModalOpen(true);
  };

  const handleClose = () => {
    setSuccessModalOpen(false);
  };

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
            <form action="" onSubmit={handleSubmit}>
              <div className="input_forgot_feid">
                <label htmlFor="">Email</label>
                {error && <p className="forgotPassError">{error}</p>}
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={emailId}
                  className="forgotPass_email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  onClick={() => handleforgotPass()}
                  className="button_Send"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      {" "}
                      <CircularProgress
                        size={16} // Set the desired size
                        sx={{ color: "#fff" }}
                      />
                    </>
                  ) : (
                    <>Send</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SuccessModal
        successModalOpen={successModalOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        successMessage={successMessage}
      />
    </div>
  );
};

export default ForgotPassword;
