import React, { useState, useEffect } from "react";
import "./Login.css";
import LoginBnner from "../../assets/login.png";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import { userLogin } from "./Api";
import EyeIcons from  "../../assets/eyeIcon.png"

const Login = () => {
  const usertype = localStorage.getItem("Usertype");
  const schema = Joi.object({
    email: Joi.string().email({ tlds: false }).messages({
      'string.empty': `Email cannot be empty`,
      'string.email': `Please enter a valid email address`,
      'any.required': `Email is required`,
    }),
    password: Joi.string().required().messages({
      'string.empty': `Password cannot be empty`,
      'any.required': `Password is required`,
    }),
  });
  // validation
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const validateForm = () => {
    const validation = schema.validate(userCredentials, { abortEarly: false });

    if (validation.error) {
      const errors = {};
      validation.error.details.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      setValidationErrors(errors);
      return false;
    }

    setValidationErrors({});
    return true;
  };
  // validation

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState([])
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      userLogin(userCredentials, setData, setIsLoading,setErrorMessage);
    }
  };
  console.log(usertype,"userType")
  useEffect(() => {
    if (usertype === "ADMIN") {
      navigate("/");
    } else if (usertype === "DESIGNER") {
      navigate("/designdashboard");
    } else if (usertype === "VOTERS") {
      navigate("/votorspanal");
    } else if (usertype === "CAD") {
      navigate("/CadAssignment");
    } else if (usertype === "CENTRAL HUB") {
      navigate("/centralDashboard");
    } else if (usertype === "RENDERS") {
      navigate("/renderCard");
    } else if (usertype === "WAREHOUSE") {
      navigate("/wareHouse");
    }
  }, [navigate, usertype]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  console.log("userCredentials../", userCredentials);
  console.log("data../", data);
  console.log("usertype", usertype);
  return (
    <div>
      <div className="Login_bg">
        <div className="Login_Parent">
          <div className="Left_Banner">
            <img src={LoginBnner} />
          </div>
          <div className="Right_Section">
            <form action="" onSubmit={handleSubmit}>
              <div className="Login_Form">
                <h3>Login</h3>
                <div className="Login_Inp">
                  <label htmlFor="User name">User name</label>
                  <input
                    type="text"
                    placeholder="User name"
                    className="loginCred"
                    required
                    value={userCredentials.email}
                    onChange={(e) =>
                      setUserCredentials({
                        ...userCredentials,
                        email: e.target.value.trim(),
                      })
                    }
                  />
                </div>
                {validationErrors.email && (
                  <p className="errorlogins" style={{color:'red',marginLeft:"8px"}}>{validationErrors.email}</p>
                )}
                <div className="Login_Inp">
                  <label htmlFor="Password">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="loginCred"
                    placeholder="Password"
                    required
                    value={userCredentials.password}
                    onChange={(e) =>
                      setUserCredentials({
                        ...userCredentials,
                        password: e.target.value.trim(),
                      })
                    }
                  />
                <div className="login_eyeIcon" onClick={()=> handleTogglePassword()}><img src={EyeIcons} alt="" /></div>
                </div>

                {errorMessage && <p style={{marginLeft:"8px",color:'red'}}>{errorMessage}</p>}
                {validationErrors.password && (
                  <p className="errorlogins" style={{color:'red'}}>{validationErrors.password}</p>
                )}
                <div className="Forgot_password">
                  <Link to="/forgotpassword">
                  <p>Forgot password?</p>
                  </Link>
                </div>
                <div className="Submit_btn">
                  <button>Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
