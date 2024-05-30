import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import product from "../../assets/p1.png";
import "./AssignmentView.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { list_assignment_folder, } from "../ADMIN PANEL/Design Pool/Api";
import { FOLDER_DETAIL_API } from "../../Pages/Services/EndPoints";
import axios from "axios";
import { list_folderDetails } from "../Assignment Panel/Api";



const AssignmentView = () => {
  const { id } = useParams();
  const [folderDetails, setFolderDetails] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const [selectedId,setSelectedId] = useState([])


  useEffect(() => {
    list_folderDetails(setIsLoading,setFolderDetails,id)
  }, []);
  console.log(folderDetails.SKU,'folderDetails====>')
  
  return (
    <div>
      <div className="Parent_AssignmentView">
        <div className="AssignmentView">
         
          <div className="Left_img_View">
            <img src={product} alt="" />
          </div>
          <div className="right_Assignment_View">
          
              
        
            <div className="Assignment_contents">
              <h3>Basic details</h3>
              <div className="Assignment_Details">
           
                <div className="A1_text">
                  <p>SKU</p>
                  <p>{folderDetails.SKU}</p>
                </div>
                <div className="A1_text">
                  <p>Length</p>
                  <p>{folderDetails.length}</p>
                </div>
                <div className="A1_text">
                  <p>Width</p>
                  <p>{folderDetails.width}</p>
                </div>
                <div className="A1_text">
                  <p>Height</p>
                  <p>{folderDetails.height}</p>
                </div>
                <div className="A1_text">
                  <p>Type of metal</p>
                  <p>{folderDetails.type_of_metal}</p>
                </div>
                <div className="A1_text">
                  <p>Dimond Type</p>
                  <p>{folderDetails.diamond_type}</p>
                </div>
                <div className="A1_text">
                  <p>APPROX DIAMOND WEIGHT</p>
                  <p>{folderDetails.approx_diamond_weight}</p>
                </div>
                <div className="A1_text">
                  <p>Findings</p>
                  <p>{folderDetails.findings}</p>
                </div>
                <div className="A1_text">
                  <p>Approx weight</p>
                  <p>{folderDetails.approx_weight}</p>
                </div>
                <div className="A1_text">
                  <p>Approx Price</p>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <LiaRupeeSignSolid />
                    {folderDetails.approx_price}
                  </p>
                </div>
                <div className="A1_text">
                  <p>Tags</p>
                  <p>
                    <span>{folderDetails.tags}</span>
                  </p>
                </div>
                <div className="A1_text" style={{ borderBottom: "0px" }}>
                  <p>Note</p>
                  <p>
                   {folderDetails.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentView;
