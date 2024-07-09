import React, { useState } from "react";
import "../../Componets/ADMIN PANEL/Design Pool/DesignPool.css";
import like from "../../assets/like.png";
import ring from "../../assets/ring.png";
// import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";

const WareHouse = (props) => {
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);

  const card = [
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
  ];

  const toggleRadioButtons = () => {
    setShowRadioButtons(!showRadioButtons);
    setSelectButtonLabel(showRadioButtons ? "Select" : "Unselect");
  };
  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };
  const toggleMoveOptions = () => {
    setShowMoveOptions(!showMoveOptions);
  };
  
  console.log(props.DesignWareHouse, "wareHouse===>");
  return (
    <div>
      <div className="Parent_DesignView">
        {/* <div className="DesignPool_btns">
          <div className="Download_ParentD">
            <button className="D_downlodBtn" onClick={toggleDownloadOptions}>
              Download <TbDownload />
            </button>
            {showDownloadOptions && (
              <div className="Download_Sub">
                <p>All</p>
                <p>Selected</p>
              </div>
            )}
          </div>
          <button className="D_selectBtn" onClick={toggleRadioButtons}>
            {selectButtonLabel}
          </button>
          <div className="Parent_MoveTo">
            <button className="D_moveBtn" onClick={toggleMoveOptions}>
              Move to <MdOutlineKeyboardArrowDown />
            </button>
            {showMoveOptions && (
              <div className="Sub_AssignmentPanel">
                <p>Assignment panel</p>
              </div>
            )}
          </div>
          <button className="D_View_Sort_Filter">
            <MdViewModule /> View
          </button>
          <button className="D_View_Sort_Filter">
            <LuArrowUpDown /> Sort
          </button>
          <button className="D_View_Sort_Filter">
            <RiFilter3Line /> Filter
          </button>
        </div> */}
        {/* Use the DesignButtons component */}

        {/* new design section */}
        {/* new design section */}
        <div className="Parent_NewDesign">
          <h3 className="HeadNewdesign">Newly added</h3>
          <div className="Card_Design_Parent">
            {props.DesignWareHouse.map((item) => (
              <div className="New_Design_card">
                <div className="Card_img">
                  <img src={item.image} alt="" />
                </div>
                <div className="Card_Details">
                  <h3>ID : {item.designcode}</h3>
                  <div className="Card_Details_Inner">
                    <div className="Inner_Left">
                      <p>{item.user_name}</p>
                      <p>{item.created_at}</p>
                    </div>
                    <div className="Inner_Right">
                      <p>{item.likes_count}</p>
                    </div>
                  </div>
                </div>
                {/* radio btn */}
                {showRadioButtons && (
                  <input
                    className="Radio_select"
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  ></input>
                )}
                {/* radio btn */}
              </div>
            ))}
          </div>
          {/* unvoted design */}
          <div className="Parent_unvoted">
            <h3 className="HeadNewdesign">Last Voted</h3>
            <div className="Card_Design_Parent">
              {props.LastVotedDesign.map((item) => (
                <div className="New_Design_card">
                  <div className="Card_img">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="Card_Details">
                    <h3>ID : {item.designcode}</h3>
                    <div className="Card_Details_Inner">
                      <div className="Inner_Left">
                        <p>{item.user_name}</p>
                        <p>{item.created_at}</p>
                      </div>
                      <div className="Inner_Right">
                        <p>0</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* unvoted design */}
        </div>
        {/* new design section */}
      </div>
    </div>
  );
};

export default WareHouse;
