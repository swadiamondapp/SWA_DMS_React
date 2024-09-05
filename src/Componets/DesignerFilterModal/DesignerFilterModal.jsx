import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import close from "../../assets/close.png";
import "./DesignerFilterModal.css";
import { DatePicker, Select, TimePicker } from "antd";
import { tag_table_data } from "../MastersSection/ApiMasters/ApiMasters";
import {
  list_all_designers_get,
  product_category_basicDetails,
  tag_List_basicDetails,
} from "../Assignment Panel/Api";
import {
  designerAssignToFilter,
  designerDashboradFilter,
  designerFilter,
  designerFilterBasedOnCategory,
  renderFilter,
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
  page,
  sethide,
  setStartTime,
  startTime,
  endTime,
  setEndTime,
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
  const [forlderId, setFolderId] = useState(id);
  const [designers, setDesigners] = useState([]);
  const [filterDesigner, setFilterDesigner] = useState("");
  const [designCode, setDesignCode] = useState("");
  const [Time, setTime] = useState(null);


  const [formData, setFormData] = useState({
    productCategory: "",
    tag: [],
  });

  console.log(startDate, "startDate")
  console.log(endTime, "endTime")

  useEffect(() => {
    tag_table_data(setTags, setIsLoading);
    product_category_basicDetails(setListProductCategory);
    tag_List_basicDetails(setSelectedTags);
    list_all_designers_get(setIsLoading, setDesigners);
  }, []);

  const pathname = location.pathname;
  const assignSection = pathname.startsWith("/designerassignview/");

  const clearAllFilters = () => {
    setFormData({
      productCategory: "",
      tag: [],
    });
    setStartDate(null);
    setEndDate(null);
    onClearCall();
    setOpenFilterModal(false);
    setDd(null);
    sethide(false);
    setEndTime("")
    setStartTime("")
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


  const handleChangeTime = (values) => {
    if (values && values.length === 2) {
      const [start, end] = values;
      setTime(values);

      const formattedStart = start.format("HH:mm:ss");
      const formattedEnd = end.format("HH:mm:ss");
      setStartTime(formattedStart);
      setEndTime(formattedEnd);
    } else {
      setTime(null);
      setStartTime('');
      setEndTime('');
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  const handleFilterClose = () => {
    setOpenFilterModal(false);
    setFormData({
      productCategory: "",
      tag: [],
    });
    setFolderId(null);
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

  const handleFilterModal = () => {
    if (location.pathname == "/designdashboard") {
      designerDashboradFilter(
        setIsLoading,
        forlderId,
        formData,
        setFolderDetails,
        startDate,
        endDate,
        setFilteredData,
        setOpenFilterModal,
        sethide
      );
    } else if (assignSection) {
      designerFilter(
        setIsLoading,
        forlderId,
        formData,
        setFolderDetails,
        startDate,
        endDate,
        setFilteredData
      );
    } else if (location.pathname === "/unassigneddesigner") {
      designerAssignToFilter(
        setIsLoading,
        designCode,
        setFolderDetails,
        startDate,
        endDate
        // setFilteredData
      );
    }
    else if (location.pathname === "/renderCard") {
      renderFilter(
        setIsLoading,
        designCode,
        setFolderDetails,
        startDate,
        endDate,
        startTime,
        endTime
        // setFilteredData
      );
    }
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
            <span className="edit_fields">Select From Date & End Date</span>
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

          {location.pathname === "/renderCard" && (
            <>
              <div
                className="edit_fields"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <span className="label-text">Design Code</span>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    border: "1px solid lightgray",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  value={designCode.toUpperCase()}
                  onChange={(e) => setDesignCode(e.target.value.toUpperCase())}
                />
              </div>
              <div
                className="edit_fields"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <span className="edit_fields">Select From Time & End Time</span>
                <TimePicker.RangePicker
                  format="HH:mm:ss" // Specify the time format
                  value={Time} // Use null if no value is selected
                  onChange={handleChangeTime}
                />
              </div>
            </>
          )}

          {location.pathname !== "/renderCard" && (
            <>
              {page == "assignto" ? (
                <div
                  className="edit_fields"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  <span className="label-text">Design Code</span>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "6px",
                      borderRadius: "4px",
                      border: "1px solid lightgray",
                      fontSize: "14px",
                      outline: "none",
                    }}
                    value={designCode.toUpperCase()}
                    onChange={(e) => setDesignCode(e.target.value.toUpperCase())}
                  />
                </div>
              ) : (
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
                  <div className="tagsInputfeild">
                    <label htmlFor="" className="label-text">
                      Designer Wise
                    </label>
                    {/* <Select
              showSearch
              placeholder="-Select-"
              optionFilterProp="children"
              value={filterDesigner}
              onChange={(value) => setFilterDesigner(value)}
              onSearch={onSearch}
              filterOption={filterOption}
              style={{
                width: "100%",
                height: "40px",
                zIndex: "9999999",
                background: "#006E7F1A",
              }}
              options={designers.map((designer) => ({
                label: designer.name,
                value: designer.name,
              }))}
            /> */}

                    <Select
                      showSearch
                      placeholder="-Select-"
                      optionFilterProp="children"
                      value={filterDesigner}
                      onChange={(value) => setFilterDesigner(value)}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      style={{
                        width: "100%",
                        height: "40px",
                        zIndex: "9999999",
                        background: "#006E7F1A",
                      }}
                      notFoundContent={!isLoading ? "Nithin" : null}
                    >
                      {designers.map((designer) => (
                        <Option key={designer.name} value={designer.name}>
                          {designer.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              )}
            </>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr ",
              gap: "10px",
            }}
          >
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
