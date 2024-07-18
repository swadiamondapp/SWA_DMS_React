import React, { useEffect, useState } from "react";
import ring from "../../../assets/ring.png";
import "./UnAssignedDesigner.css";
import {
  listUnAssignedLists,
  list_all_cutomization_paper_design,
  unassignDesigner,
} from "../Designer Detail View/Api";
import avatar from "../../../assets/avataprofile.png";
import SuccessModal from "../../SuccessModal/SuccessModal";

const CustomizedOrder = ({ sidebarExpanded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [UnAssignedLists, setUnAssignedLists] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    listUnAssignedLists(setIsLoading, setUnAssignedLists);
  }, []);
  const handleUnassign = (id, userId) => {
    unassignDesigner(
      setIsLoading,
      id,
      userId,
      setSuccessMessage,
      setSuccessModalOpen,
      setUnAssignedLists
    );
  };
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
  console.log(UnAssignedLists, "customizattion");
  return (
    <div
      className="DesignerAssignmentPanel"
      style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
      <div className="CustomizedOrderParent">
        <div className="Parent_NewDesign">
          <div className="Card_Design_Parent">
            {UnAssignedLists.map((item) => (
              <div className="New_Design_card">
                <div className="Card_img" style={{ minHeight: "190px" }}>
                  <img src={item.design_image} alt="" />
                </div>
                <div className="Card_Details">
                  <div className="parent_UnAssignedD">
                    <div>
                      <h3 style={{ marginBottom: "0px" }}>
                        ID : {item.design_code}
                      </h3>
                    </div>
                    <div className="Card_Details_Inner">
                      <div className="unassign_name">
                        <h3 style={{ color: "#455173" }}>{item.user_name}</h3>
                        <h5 style={{ color: "#455173" }}>{item.created_at}</h5>
                      </div>
                    </div>

                    {/* <p className="OrderHigh">High</p> */}
                    {/* <p className="OrderMedium">Medium</p> */}
                    {/* <p className="OrderLow">Low</p> */}
                  </div>
                  <div className="unasignCardDetails">
                    <div className="unassignbuttondetails">
                      <div className="unassign_avatar">
                        <img src={avatar} alt="" />
                      </div>{" "}
                      <div>Vipin yadav</div>
                    </div>
                    <div className="UnassignDesigner">
                      <button
                        onClick={() => handleUnassign(item.id, item.user)}
                      >
                        Unassign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SuccessModal
        successModalOpen={successModalOpen}
        successMessage={successMessage}
      />
    </div>
  );
};

export default CustomizedOrder;
