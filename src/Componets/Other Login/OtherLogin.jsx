import React from "react";
import "./OtherLogin.css";
import login from "../../assets/log.png";

const OtherLogin = ({sidebarExpanded}) => {
  return (
    <div>
      <div className="Parent_OtherLogin" style={{paddingLeft:sidebarExpanded? "225px":"130px"}}>
        <div className="other_logins">
          <div className="login_card">
            <p className="LogeLabel">SWA Order</p>
            <p className="LogedDtae">Last logged in : 5:34 AM</p>
            <p className="LoginWithImg">
              Login <img src={login} alt="" />
            </p>
          </div>
          <div className="login_card">
            <p className="LogeLabel">SWA repair</p>
            <p className="LogedDtae">Last logged in : 5:34 AM</p>
            <p className="LoginWithImg">
              Login <img src={login} alt="" />
            </p>
          </div>
          <div className="login_card">
            <p className="LogeLabel">OMS Onyks</p>
            <p className="LogedDtae">Last logged in : 5:34 AM</p>
            <p className="LoginWithImg">
              Login <img src={login} alt="" />
            </p>
          </div>
          <div className="login_card">
            <p className="LogeLabel">OMS mirror</p>
            <p className="LogedDtae">Last logged in : 5:34 AM</p>
            <p className="LoginWithImg">
              Login <img src={login} alt="" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherLogin;
