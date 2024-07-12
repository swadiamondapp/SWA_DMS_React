import React from "react";
import "./FinishedProjectInner.css";
import ShareIcon from "../../../assets/shareIcon.png";

const FinishedProjectInner = (props) => {
  return (
    <div className="MainContainer"  style={{ paddingLeft: props.sidebarExpanded ? "225px" : "130px" }}>
      <div className="parentRendercard">
        {props?.folderItem &&
          props?.folderItem[0]?.images?.map((imgObj, index) => {
            const imageUrl = Object.values(imgObj)[0];
            const createdAt = imgObj.created_at;
            return (
              <div className="finishedCardContainer">
                <img src={imageUrl} alt="card_image" />
                <span className="postedOn">
                  POSTED ON: <span className="postedOn_data">{createdAt}</span>
                </span>
                <div>
                  <button className="shareButton_finished">
                    <img src={ShareIcon} arlt="" />
                    Share
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FinishedProjectInner;
