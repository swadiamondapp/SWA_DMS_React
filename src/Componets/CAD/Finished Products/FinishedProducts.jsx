import React, { useEffect, useState } from "react";
import ring from "../../../assets/ring.png";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";
import { finished_product_list_cad } from "../Api";

const FinishedProducts = () => {
  const [isLoading,setIsLoading] = useState(false)
  const [finishedProduct,setFinishedProduct] = useState([])
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
  ];

  useEffect(()=> {
    finished_product_list_cad( setIsLoading,setFinishedProduct )
  },[])
  console.log(finishedProduct,"finishedProduct")
  return (
    <div className="ParentCad">
      <div className="CadAssignmentCard">
        <div className="Card_Design_Parent">
          {finishedProduct.map((item) => (
            <div className="New_Design_card">
              <div className="Card_Details">
                <div className="Card_img" style={{ borderBottom: "0px" }}>
                  <img src={item.file1} alt="" />
                </div>
                <div className="Card_Details_Inner_cad_Hub">
                  <p>
                    POSTED ON:{item.created_at}
                    <span style={{ color: "#455173", fontWeight: "600" }}>
                      {item.date}
                    </span>
                  </p>

                  <button className="Download_btn_hub">
                    DOWNLOAD
                    <GoDownload />
                  </button>
                  {/* <button className="Prinit_btn_hub">
                    Print
                    <IoPrintOutline />
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinishedProducts;
