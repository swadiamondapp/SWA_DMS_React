import React from "react";
import "./Header.css";
import searchimg from "../../assets/search.png";
import profileimg from "../../assets/profile.png";
import { IoChevronDown } from "react-icons/io5";

const Header = () => {
  return (
    <div>
      <div className="Parent_Section">
        <div className="Header_Section">
          <div className="Left_User_Section">
            <h3>Users</h3>
          </div>
          <div className="Right_User_Section">
            <div className="Search_Admin">
              <div className="Search_User">
                <input type="text" placeholder="Search Users" />
                <img src={searchimg} alt="" />
              </div>
            </div>
            <div className="Profile_Admin">
              <img src={profileimg} alt="" />
              <div className="Name_Sub">
                <p>Nidhin PR</p>
                <p>Admin</p>
              </div>
              <IoChevronDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
