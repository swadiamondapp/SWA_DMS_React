/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import  { useEffect, useState } from "react";
import "./Chat.css";
import searchicon from "../../assets/searchicon.png";
import chatuser from "../../assets/chatuser.png";
import chatimg1 from "../../assets/c1.png";
//import chatimg2 from "../../assets/c2.png";
import ComingSoon from "../VOTORS PANEL/Votors Panel/ComingSoon";

const Chat = ({sidebarExpanded}) => {
  const users = [
    {
      username: "Vipin vinod",
      desc: "Designer",
    },
    {
      username: "Vipin vinod",
      desc: "Votors",
    },
    {
      username: "Vipin vinod",
      desc: "Designer",
    },
    {
      username: "Vipin vinod",
      desc: "Votors",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    setShowModal(true); // opens whenever component renders
  }, []);
  return (
    <div className={`Parent_DesignView  ${showModal ? "page_blurred" : ""}`} style={{paddingLeft:sidebarExpanded? "225px":"130px"}}>
      <div className="ParentChatSection">
        <div className="Left_Chat_Section">
          <div className="Chat__list">
            <div className="Chat_search">
              <input type="text" placeholder="Search" />
              <img src={searchicon} alt="" />
            </div>
            {users.map((item) => (
              <div className="Chat_Users_list">
                <div className="Chat_user_Card">
                  <div className="User___img">
                    <img src={chatuser} alt="" />
                  </div>
                  <div className="User___details">
                    <p>{item.username}</p>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="Right_Chat_Section">
          <div className="Cahat_section">
            <div className="C1_chat">
              <div className="c1_left_sec">
                <img src={chatimg1} alt="" />
              </div>
              <div className="c1_right_sec">
                <div className="name___date">
                  <p>Vipin vinod</p>
                  <p className="DATE___SEC">Friday : 11:30 am</p>
                </div>
                <div className="chat___message">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Massa massa bibendum
                    eu aliquet turpis suscipit. Sit congue viverra imperdiet
                    praesent quis viverra in. Gravida vitae neque lacus.
                  </p>
                </div>
              </div>
            </div>
            <div className="C2_chat">
              <div className="c1_right_sec">
                <div className="name___date">
                  <p className="DATE___SEC">Friday : 11:30 am</p>{" "}
                  <p>Vipin vinod</p>
                </div>
                <div className="chat___message2">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Massa massa bibendum
                    eu aliquet turpis suscipit. Sit congue viverra imperdiet
                    praesent quis viverra in. Gravida vitae neque lacus.
                  </p>
                </div>
              </div>
              <div className="c1_left_sec">
                <img src={chatimg1} alt="" />
              </div>
            </div>
            {/* send btn */}
            <div className="Send_Btn_Parent">
              <input type="text" placeholder="Type Your Message..." />
              <button>Send</button>
            </div>
          </div>
        </div>
      </div>
        <ComingSoon
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Photo Coming Soon 📸"
        description="High-quality product photos will be available shortly."
      />
    </div>
  );
};

export default Chat;
