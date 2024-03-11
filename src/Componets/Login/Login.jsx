import React from "react";
import "./Login.css";
import LoginBnner from "../../assets/login.png";

const Login = () => {
  return (
    <div>
      <div className="Login_bg">
        <div className="Login_Parent">
          <div className="Left_Banner">
            <img src={LoginBnner} />
          </div>
          <div className="Right_Section">
            <div className="Login_Form">
              <h3>Login</h3>
              <div className="Login_Inp">
                <label htmlFor="User name">User name</label>
                <input type="text" />
              </div>
              <div className="Login_Inp">
                <label htmlFor="Password">Password</label>
                <input type="text" />
              </div>
              <div className="Forgot_password">
                <p>Forgot password?</p>
              </div>
              <div className="Submit_btn">
                <button>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
