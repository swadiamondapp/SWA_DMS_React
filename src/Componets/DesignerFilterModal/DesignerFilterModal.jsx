import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import close from "../../assets/close.png";
import "./DesignerFilterModal.css";
import { DatePicker, Select } from "antd";
import { tag_table_data } from "../MastersSection/ApiMasters/ApiMasters";
import { product_category_basicDetails, tag_List_basicDetails } from "../Assignment Panel/Api";
import {
  designerFilter,
  designerFilterBasedOnCategory,
} from "../DESIGNER PANEL/Designer Dashboard/Api";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

const { RangePicker } = DatePicker;

const DesignerFilterModal = ({
  setOpenFilterModal,
  openFilterModal,
  setFolderDetails,
  onClearCall,
  folderDetails,
  setFilteredData,
  setDd,
  dd,
}) => {
  const { id } = useParams();
  const [filterTag, setFilterTag] = useState("");
  const [CategoryFilter, setCategoryFilter] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFechedTags, setSelectedFechedTags] = useState([]);
  const [forlderId,setFolderId] = useState(id)


  const [formData, setFormData] = useState({
    productCategory: "",
    tag:[]
  });

  useEffect(() => {
    tag_table_data(setTags, setIsLoading);
    product_category_basicDetails(setListProductCategory);
    tag_List_basicDetails(setSelectedTags);
  }, []);

  const clearAllFilters = () => {
    setFormData({
      productCategory: "",
      tag:[]
    })
    setStartDate(null)
    setEndDate(null)
    onClearCall()
    setOpenFilterModal(false)
    setDd(null)
  };


  const handleChange = (values) => {
    if (values) {
      const [start, end] = values;
      setDd(values);
      const formattedStart = start.format("YYYY-MM-DD");
      const formattedEnd = end.format("YYYY-MM-DD");
      setStartDate(formattedStart);
      setEndDate(formattedEnd);
    }
  };
  

  console.log(startDate, "sartssdfsd");
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  const handleFilterClose = () => {
    setOpenFilterModal(false);
    setFormData({
      productCategory: "",
      tag:[],
    });
    setFolderId(null)
  
  };
  useEffect(() => {
    if (selectedTags.length > 0) {
      const tags = selectedTags.map((tag) => ({ id: tag.id, name: tag.name }));
      setSelectedFechedTags(tags);
      console.log("Fetched tags set:", tags);
    }
  }, [selectedTags]);
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  filterTag;
  //   console.log("filter", filter);

  const handleFilterModal = () => {
    designerFilter(
      setIsLoading,
      forlderId,
      formData,
      setFolderDetails,
      startDate,
      endDate,
      setFilteredData
    );
  };  

  return (
    <>
      <div
        className="edit_opcity"
        data-aos="fade-left"
        style={{ overflow: "hidden", position: "fixed", height: "100vh" }}
        onClick={handleFilterClose}
      ></div>
      <div
        className="leftbar"
        data-aos="fade-left"
        style={{
          width: "30%",
          overflow: "hidden",
          position: "fixed",
          height: "100%",
          alignItems: "start",
          flexDirection: "column",
          padding: "15px",
          gap: "10px",
          borderRadius: "10px 0px 0px 10px",
        }}
      >
        <div style={{ width: "100%" }}>
          <div className="master_modal ">
            <h2>Actual details</h2>
            <button
              onClick={handleFilterClose}
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <img
                style={{ width: "20px", height: "20px" }}
                className="btn_close"
                src={close}
                alt=""
                srcset=""
              />
            </button>
          </div>

          <div
            className="edit_fields"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <span className="edit_fields_span">
              Select From Date & End Date
            </span>
            <RangePicker
              style={{
                width: "70%",
                height: "40px",
              }}
              size={12}
              value={dd}
              onChange={handleChange}
            />
          </div>

          <div>
            {" "}
            <div className="productCategory">
              <label
                htmlFor=""
                className="label-text"
                style={{ marginBottom: "10px" }}
              >
                Product Category
              </label>
              <Select
                showSearch
                placeholder="-Select-"
                optionFilterProp="children"
                value={formData.productCategory}
                onChange={(value) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    productCategory: [value],
                  }))
                }
                onSearch={onSearch}
                filterOption={filterOption}
                style={{
                  width: "100%",
                  zIndex: "9999999",
                  background: "#006E7F1A",
                }}
                options={ProudctCategory.map((tag) => ({
                  label: tag.name,
                  value: tag.id,
                }))}
              />
            </div>
            <div className="tagsInputfeild">
              <label htmlFor="" className="label-text">
                Tags
              </label>
              {/* <TagsInput
                          value={selectedFechedTags}
                          onChange={(value) => {
                            console.log("Tag changed to:", value); // Log the tag value to the console
                            setFormData((prevState) => ({
                              ...prevState,
                              tag: value,
                            }));
                          }}
                          name="tags"
                          // placeHolder="Tags"
                          classNames="inputTag"
                        /> */}
           
                <Select
                  mode="multiple"
                  style={{
                    width: "100%",
                    zIndex: "9999999",
                    background: "#006E7F1A",
                  }}
                  placeholder="Select tags"
                  onChange={(value) => {
                    console.log("Tag changed to:", value);
                    setFormData((prevState) => ({
                      ...prevState,
                      tag: value,
                    }));
                  }}
                  options={selectedFechedTags.map((tag) => ({
                    label: tag.name,
                    value: tag.id,
                  }))}
                />
             
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:"1fr 1fr ",gap:"10px"}}>
            <div style={{ marginTop: "10px" }}>
              <button
                className="next-button"
                type="submit"
                onClick={() => handleFilterModal()}
              >
                Apply Filter
              </button>
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                className="next-button"
                type="submit"
                onClick={() => clearAllFilters()}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignerFilterModal;
