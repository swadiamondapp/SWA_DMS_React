import React, { useState } from "react";
import "./FinishedProjectInner.css";
import ShareIcon from "../../../assets/shareIcon.png";
import RingFin from "../../../assets/ring_fin.png";
import RingSilver from "../../../assets/ring_fin1.png";

const FinishedProjectInner = (props) => {
  const card = [
    {
      product: RingFin,
      date: "12TH JAN 2024",
    },
    {
      product: RingSilver,
      date: "12TH JAN 2024",
    },
    {
      product: RingSilver,
      date: "12TH JAN 2024",
    },
    {
      product: RingSilver,
      date: "12TH JAN 2024",
    },
  ];

  console.log(props?.folderItem);

  return (
    <div className="MainContainer">
      <div className="parentRendercard">
        {card.map((item, index) => {
          return (
            <div className="finishedCardContainer">
              <img src={item.product} alt="card_image" />
              <span className="postedOn">
                POSTED ON: <span className="postedOn_data">{item.date}</span>
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
