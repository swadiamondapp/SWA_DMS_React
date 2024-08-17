import React from "react";
import "./FinishedProjectInner.css";
import ShareIcon from "../../../assets/shareIcon.png";

const FinishedProjectInner = (props) => {
  return (
    <div
      className="MainContainer"
      style={{ marginLeft: props?.sidebarExpanded ? "225px" : "125px" }}
    >
      <div className="parentRendercard">
        {props?.folderItem &&
          props?.folderItem[0]?.images?.map((imgObj, index) => {
            const imageUrl = Object.values(imgObj)[0];
            const createdAt = imgObj.created_at;
            {
              console.log(imageUrl, "imageUrl");
            }
            if (imageUrl) {
              return (
                <div className="finishedCardContainer" key={index}>
                  <img src={imageUrl} alt="card_image" />
                  <span className="postedOn">
                    POSTED ON:{" "}
                    <span className="postedOn_data">{createdAt}</span>
                  </span>
                  <div>
                    <button className="shareButton_finished">
                      <img src={ShareIcon} alt="Share icon" />
                      Share
                    </button>
                  </div>
                </div>
              );
            } else {
              return null; // Return null if imageUrl does not exist
            }
          })}
      </div>
    </div>
  );
};

export default FinishedProjectInner;
