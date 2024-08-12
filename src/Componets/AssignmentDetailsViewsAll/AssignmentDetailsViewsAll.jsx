import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import product from "../../assets/p1.png";
// import "./assignmentviewsAll.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { list_assignment_folder } from "../ADMIN PANEL/Design Pool/Api";
import { FOLDER_DETAIL_API } from "../../Pages/Services/EndPoints";
import axios from "axios";
import {
  diamond_type_dropdown_basicDetails,
  findings_List_basicDetails,
  listFolderDetailVeiwAssignmentPanel,
  list_folderDetails,
  metal_type_dropdown_basicDetails,
  product_category_basicDetails,
  tag_List_basicDetails,
} from "../Assignment Panel/Api";
import BasicDetailModal from "../BasicDetails/BasicDetailModal";
import BasicDetialsEditModal from "../BasicDetails/BasicDetialsEditModal";
import EdiIcon from "../../assets/EditBasic.png";
import {
  choose_outlet_drop_down,
  metal_type_drop_down,
  product_type_drop_down,
} from "../ADMIN PANEL/Api_dropDown";
import { detailsViewOfItems } from "./Api";

const AssignmentDetailsViewsAll = ({ sidebarExpanded }) => {
  const location = useLocation();
  const { id } = useParams();
  const [folderDetails, setFolderDetails] = useState([]);
  const [folderDetailView, setFolderDetailsView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [open, setIsOpen] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  //   const designId = queryParams.get("design_id");
  const { designId } = location.state || {};
  const [MetalTypeDropDown, setMetalTypeDropDown] = useState([]);
  const [outLetDropDown, setOutLetDropDown] = useState([]);
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [ProductTypeDropDown, setProductTypeDropDown] = useState([]);
  const [diamonType, setDiamondType] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [FindingsList, setFindingsList] = useState([]);
  const [DetailsData, setDetailsData] = useState([]);

  useEffect(() => {
    // list_folderDetails(setIsLoading,setFolderDetails,id)
    detailsViewOfItems(setIsLoading, setFolderDetailsView, id);
  }, [id]);

  console.log(folderDetailView, "DetailsData");

  console.log(designId, "designId");

  useEffect(() => {
    if (folderDetailView) {
      setFolderDetails({
        assignment_details: folderDetailView["assignment_details"],
        itemDetails: folderDetailView["item_details"],
      });
      //   setHeaderDetials(folderDetailView["item_details"]);
    }
  }, [folderDetailView]);
  const { assignment_details, itemDetails } = folderDetails;

  const handleEditBasicDetails = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    metal_type_drop_down(setMetalTypeDropDown);
    product_type_drop_down(setProductTypeDropDown);
    choose_outlet_drop_down(setOutLetDropDown);
    // diamond_colours(setSelectDiamondColor);
    // diamond_clarity_choice(setSelectDiamondClarity);
    metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    diamond_type_dropdown_basicDetails(setDiamondType);
    product_category_basicDetails(setListProductCategory);

    tag_List_basicDetails(setSelectedTags);
    findings_List_basicDetails(setFindingsList);
  }, []);

  const findMetalNameById = (id) => {
    const item = MetalTypeDropDown.find((entry) => entry.id === id);
    return item ? item.metal_name : "Not found";
  };

  const findOutLetNameByID = (id) => {
    const item = outLetDropDown.find((entry) => entry.id === id);
    return item ? item.name : "Note Found";
  };
  // const productCategoryByID = (id) => {
  //   const item = ProudctCategory.find((entry) => entry.id === id);
  //   return item ? item.name : "Note Found";
  // };
  const findDiamondNameById = (id) => {
    const item = diamonType.find((entry) => entry.id === id);
    return item ? item.name : "Not found";
  };

  const findFindingsNameById = (id) => {
    const item = FindingsList.find((entry) => entry.id === id);
    return item ? item.find_name : "Not found";
  };

  const findNamesByIds = (ids) => {
    return ids.map((id) => findFindingsNameById(id));
  };

  const findTagsNameById = (id) => {
    const item = selectedTags.find((entry) => entry.id === id);
    return item ? item.name : "Not found";
  };

  useEffect(() => {
    product_category_basicDetails(setListProductCategory);
  }, []);

  const productCategoryByID = (id) => {
    const item = ProudctCategory.find((entry) => entry.id === id);
    console.log("kkkkkk", item);
    return item ? item.name : "Note Found";
  };

  //   console.log(selectedTags, "fghjkl");
  //   console.log(itemDetails, "itemDetails");
  // console.log(FindingsList,"finsdfasfd")
  return (
    <div>
      <div
        className="Parent_AssignmentView"
        style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="AssignmentView">
          <div className="Left_img_View">
            <img src={itemDetails?.paper_design?.image} alt="" />
          </div>
          <div className="right_Assignment_View">
            {/* <div
              className="editContainer"
              onClick={() => handleEditBasicDetails()}
            >
              <img src={EdiIcon} alt="" />
              <p>Edit</p>
            </div> */}
            <div className="Assignment_contents">
              <h3>Basic details</h3>
              <div className="Assignment_Details">
                <div className="A1_text">
                  <p>Product Id</p>
                  <p>{itemDetails?.paper_design?.designcode}</p>
                </div>
                <div className="A1_text">
                  <p>Category</p>
                  <p>
                    {productCategoryByID(
                      Number(assignment_details?.product_category)
                    )}
                  </p>
                </div>
                <div className="A1_text">
                  <p>Length</p>
                  <p>{assignment_details?.length} mm </p>
                </div>
                <div className="A1_text">
                  <p>Width</p>
                  <p>{assignment_details?.width} mm</p>
                </div>
                <div className="A1_text">
                  <p>Height</p>
                  <p>{assignment_details?.height} mm</p>
                </div>
                <div className="A1_text">
                  <p>Type of metal</p>
                  <p>
                    {findMetalNameById(
                      Number(assignment_details?.type_of_metal)
                    )}
                  </p>
                </div>
                <div className="A1_text">
                  <p>Dimond Type</p>
                  <p>
                    {findDiamondNameById(
                      Number(assignment_details?.diamond_type)
                    )}
                  </p>
                </div>
                <div className="A1_text">
                  <p>APPROX DIAMOND WEIGHT</p>
                  <p>{assignment_details?.approx_diamond_weight} ct</p>
                </div>
                <div className="A1_text">
                  <p>Findings</p>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {assignment_details?.findings?.map((findingId, index) => (
                        <p
                          className="tagsInBasicDetals"
                          key={index}
                          style={{ zIndex: "" }}
                        >
                          {/* {findFindingsNameById(Number(findingId))} */}
                          {findFindingsNameById(Number(findingId))}
                          {index < assignment_details.findings.length - 1
                            ? ", "
                            : ""}
                        </p>
                      ))}
                      {/* {findFindingsNameById(Number(basicDetails?.findings))} */}
                    </div>
                  </div>
                </div>
                <div className="A1_text">
                  <p>Approx Metal Weight</p>
                  <p>{assignment_details?.approx_metal_weight} g</p>
                </div>
                <div className="A1_text">
                  <p>Approx Price</p>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <LiaRupeeSignSolid />
                    {assignment_details?.approx_price}
                  </p>
                </div>
                <div className="A1_text">
                  <p>Tags</p>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {assignment_details?.tag?.map((findingId, index) => (
                        <p className="tagsInBasicDetals" key={index}>
                          {/* {findFindingsNameById(Number(findingId))} */}
                          {findTagsNameById(Number(findingId))}
                          {index < assignment_details.tag.length - 1
                            ? ", "
                            : ""}
                        </p>
                      ))}
                    </div>
                  </div>
                  {/* <span>{basicDetails?.tag}</span> */}
                </div>
                <div className="A1_text" style={{ borderBottom: "0px" }}>
                  <p>Note</p>
                  <p>{assignment_details?.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <BasicDetailModal
        name={"editbasicDetails"}
        open={open}
        onClose={() => setIsOpen(false)}
        folderIdA={id}
        designId={designId}
        DetailsProductId={itemDetails?.paper_design?.designcode}
        basicDetails={basicDetails}
        updateEditFunction={() =>
          listFolderDetailVeiwAssignmentPanel(
            setIsLoading,
            setFolderDetailsView,
            id,
            designId
          )
        }
      /> */}
    </div>
  );
};

export default AssignmentDetailsViewsAll;
