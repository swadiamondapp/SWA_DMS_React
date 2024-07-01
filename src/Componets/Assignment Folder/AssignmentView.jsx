import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import product from "../../assets/p1.png";
import "./AssignmentView.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { list_assignment_folder } from "../ADMIN PANEL/Design Pool/Api";
import { FOLDER_DETAIL_API } from "../../Pages/Services/EndPoints";
import axios from "axios";
import {
  listFolderDetailVeiwAssignmentPanel,
  list_folderDetails,
} from "../Assignment Panel/Api";
import BasicDetailModal from "../BasicDetails/BasicDetailModal";
import BasicDetialsEditModal from "../BasicDetails/BasicDetialsEditModal";

const AssignmentView = () => {
  const { id } = useParams();
  const [folderDetails, setFolderDetails] = useState([]);
  const [folderDetailView, setFolderDetailsView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [open, setIsOpen] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const designId = queryParams.get("design_id");

  useEffect(() => {
    // list_folderDetails(setIsLoading,setFolderDetails,id)
    listFolderDetailVeiwAssignmentPanel(
      setIsLoading,
      setFolderDetailsView,
      id,
      designId
    );
  }, [id, designId]);
  console.log(folderDetails.SKU, "folderDetails====>");
  console.log(folderDetailView, "folderDetailView");
  console.log(id, "folderId");
  console.log(designId, "designId");

  useEffect(() => {
    if (folderDetailView) {
      setFolderDetails({
        basicDetails: folderDetailView["basic details"],
        itemDetails: folderDetailView["item_details"],
      });
    }
  }, [folderDetailView]);
  const { basicDetails, itemDetails } = folderDetails;

  const handleEditBasicDetails = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="Parent_AssignmentView">
        <div className="AssignmentView">
          <div className="Left_img_View">
            <img src={itemDetails?.paper_design?.image} alt="" />
          </div>
          <div className="right_Assignment_View">
            <div
              className="editContainer"
              onClick={() => handleEditBasicDetails()}
            >
              <img src="" alt="" />
              <p>Edit</p>
            </div>
            <div className="Assignment_contents">
              <h3>Basic details</h3>
              <div className="Assignment_Details">
                <div className="A1_text">
                  <p>SKU</p>
                  <p>{itemDetails?.paper_design?.designcode}</p>
                </div>
                <div className="A1_text">
                  <p>Length</p>
                  <p>{basicDetails?.length}</p>
                </div>
                <div className="A1_text">
                  <p>Width</p>
                  <p>{basicDetails?.width}</p>
                </div>
                <div className="A1_text">
                  <p>Height</p>
                  <p>{basicDetails?.height}</p>
                </div>
                <div className="A1_text">
                  <p>Type of metal</p>
                  <p>{basicDetails?.type_of_metal}</p>
                </div>
                <div className="A1_text">
                  <p>Dimond Type</p>
                  <p>{basicDetails?.diamond_type}</p>
                </div>
                <div className="A1_text">
                  <p>APPROX DIAMOND WEIGHT</p>
                  <p>{basicDetails?.approx_diamond_weight}</p>
                </div>
                <div className="A1_text">
                  <p>Findings</p>
                  <p>{basicDetails?.findings}</p>
                </div>
                <div className="A1_text">
                  <p>Approx weight</p>
                  <p>{basicDetails?.approx_metal_weight}</p>
                </div>
                <div className="A1_text">
                  <p>Approx Price</p>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <LiaRupeeSignSolid />
                    {basicDetails?.approx_price}
                  </p>
                </div>
                <div className="A1_text">
                  <p>Tags</p>
                  <p>
                    <span>{basicDetails?.tag}</span>
                  </p>
                </div>
                <div className="A1_text" style={{ borderBottom: "0px" }}>
                  <p>Note</p>
                  <p>{basicDetails?.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    <BasicDetailModal
      name={"editbasicDetails"}
       open={open}
       onClose={() => setIsOpen(false)}
       folderIdA={id}
       designId={designId}
    />
    </div>

  );
};

export default AssignmentView;
