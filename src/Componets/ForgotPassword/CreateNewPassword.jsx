import React, { useState } from "react";
import LoginBnner from "../../assets/login.png";
import Lock from "../../assets/lockPass.png";
import "./forgotPassword.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import eyeIcon from "../../assets/passEyeICon.png";
import Joi from "joi";

const CreateNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const schema = Joi.object({
    newPassword: Joi.string().min(8).required().label("New Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("newPassword"))
      .required()
      .label("Confirm Password")
      .messages({ "any.only": "Passwords do not match" }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schema.validate({ newPassword, confirmPassword });
    if (error) {
      setError(error.details[0].message);
      return;
    }
    // if (newPassword !== confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }
    // if (newPassword.length < 8) {
    //   setError("Password must be at least 8 characters long");
    //   return;
    // }
    // Handle the password update logic (e.g., API call)
    // Example: updatePassword(newPassword);

    setError(""); // Clear any existing errors
    // Redirect or show a success message
  };
  return (
    <div>
      <div className="Login_bg">
        <div className="Right_Section_forgot">
          <div className="forgotPasswordContainer">
            <img src={Lock} alt="" />
            <p className="forgotTitle">Create a new password</p>
            <span className="forgotSub">
              Your new password must be different from the
              <br /> previous password you used
            </span>
            {error && <div className="error">{error}</div>}
            <form action="" onSubmit={handleSubmit}>
              <div className="input_forgot_feid">
                <div className="relativeParant">
                  <label htmlFor="">New Password</label>

                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="forgotPass_email"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <img
                    src={eyeIcon}
                    alt="Toggle visibility"
                    className="eye_icon"
                    onClick={handleNewPasswordVisibility}
                  />
                </div>
                <div className="relativeParant">
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="forgotPass_email"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <img
                    src={eyeIcon}
                    alt="Toggle visibility"
                    className="eye_icon"
                    onClick={handleConfirmPasswordVisibility}
                  />
                {error && <div className="error">{error}</div>}
                </div>
                <Link to="/resetcomplete">
                <button style={{marginTop:"25px"}} type="submit" className="button_Send">
                  Send
                </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
