import React from "react";
import "./OtherLogin.css";
import login from "../../assets/log.png";

const OtherLogin = ({sidebarExpanded}) => {
  return (
    <div>
      
      <div className="Parent_OtherLogin" style={{paddingLeft:sidebarExpanded? "225px":"130px"}}>
        <div className="other_logins">
          <a href="https://swaorderlive.zinfog.com/login/" target="_blank"  style={{color:"black"}}>
          <div className="login_card">
            <p className="LogeLabel">SWA Order</p>
            <p className="LogedDtae">Last logged in : 5:34 AM</p>
            <p className="LoginWithImg">
              Login <img src={login} alt="" />
            </p>
          </div>
          </a>
          <a href="https://swarepairtest.zinfog.com/" target="_blank"  style={{color:"black"}}>
          <div className="login_card">
            <p className="LogeLabel">SWA repair</p>
            <p className="LogedDtae">Last logged in : 5:34 AM</p>
            <p className="LoginWithImg">
              Login <img src={login} alt="" />
            </p>
          </div>
          </a>
          <a href="https://onixorder.zinfog.in/" target="_blank" style={{color:"black"}}>
          <div className="login_card">
            <p className="LogeLabel">OMS Onyks</p>
            <p className="LogedDtae">Last logged in : 5:34 AM</p>
            <p className="LoginWithImg">
              Login <img src={login} alt="" />
            </p>
          </div>
          </a>
          <a href="https://oms.mirrordiamonds.com/" target="_blank" style={{color:"black"}}>
          <div className="login_card">
            <p className="LogeLabel">OMS mirror</p>
            <p className="LogedDtae">Last logged in : 5:34 AM</p>
            <p className="LoginWithImg">
              Login <img src={login} alt="" />
            </p>
          </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtherLogin;
