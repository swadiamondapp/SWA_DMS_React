import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import close from "../../assets/close.png";
import "./AdminFilter.css";
import { DatePicker, Select, Spin } from "antd";
import { tag_table_data } from "../MastersSection/ApiMasters/ApiMasters";
import {
  filterAdminDesigns,
  list_all_designers,
  list_all_designers_get,
  list_assignment_panel,
  product_category_basicDetails,
} from "../Assignment Panel/Api";
import { list_uploaded_designs } from "../DESIGNER PANEL/Designer Dashboard/Api";
import moment from "moment";
import { CircularProgress } from "@mui/material";

const { RangePicker } = DatePicker;

const AdminFilter = ({
  filter,
  setFilter,
  setData,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filterTag,
  setFilterTag,
  filterCategory,
  setFilterCategory,
  filterDesigner,
  setFilterDesigner,
  filterMaxPrice,
  setFilterMaxPrice,
  filterMinPrice,
  setFilterMinPrice,
  setDd,
  dd,
}) => {
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [filterTag, setFilterTag] = useState("");
  // const [filterCategory, setFilterCategory] = useState("");
  // const [filterDesigner, setFilterDesigner] = useState("");
  // const [filterMaxPrice, setFilterMaxPrice] = useState("");
  // const [filterMinPrice, setFilterMinPrice] = useState("");

  const [tags, setTags] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState("")

  useEffect(() => {
    product_category_basicDetails(setProductCategory);
    tag_table_data(setTags, setIsLoading);
    list_all_designers_get(setIsLoading,setDesigners);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  // useEffect(() => {
  //   if (filter) {
  //     const { startDate, endDate, tag, category, designer } = filter;

  //     if (startDate && endDate) {
  //       setStartDate(startDate);
  //       setEndDate(endDate);
  //     } else {
  //       setStartDate("");
  //       setEndDate("");
  //     }

  //     setFilterTag(tag || "");
  //     setFilterCategory(category || "");
  //     setFilterDesigner(designer || "");
  //   }
  // }, [filter]);

  const handleFilterClose = () => {
    setFilter(false);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // const handleChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);false
  //   console.log("Selected dates: ", { start, end });
  // };

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


  const handleFilter = async () => {
    try {
      await filterAdminDesigns(
        setIsLoading,
        startDate,
        endDate,
        filterTag,
        filterCategory,
        filterDesigner,
        setData,
        filterMaxPrice,
        filterMinPrice,
        setFilter,
        setError
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleClear = async () => {
    try {
      await list_assignment_panel(setIsLoading, setData);
      setStartDate("");
      setEndDate("");
      setFilterCategory("");
      setFilterTag("");
      setFilterDesigner("");
      setFilterMaxPrice("");
      setFilterMinPrice("");
      setDd("");
      setFilter(false);
    } catch (error) {
      console.log(error);
    }
  }; 


  console.log(isLoading,"isLoading")
  console.log(designers,"designers")

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
          height: "100vh",
          alignItems: "start",
          flexDirection: "column",
          padding: "10px",
          gap: "16px",
          borderRadius: "10px 0px 0px 10px",
        }}
      >
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
              srcSet=""
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
          <span className="edit_fields_span">Select From Date & End Date</span>
          <RangePicker
            onChange={handleChange}
            style={{
              width: "70%",
              height: "40px",
            }}
            size={12}
            value={dd}
          />
        </div>

        <div className="productCategory">
          <label htmlFor="" className="edit_fields_span">
            Product Category
          </label>
          <Select
            showSearch
            placeholder="-Select-"
            optionFilterProp="children"
            value={filterCategory}
            onChange={(value) => setFilterCategory(value)}
            onSearch={onSearch}
            filterOption={filterOption}
            style={{
              width: "99%",
              height: "40px",
              zIndex: "9999999",
              background: "#006E7F1A",
            }}
            options={productCategory.map((tag) => ({
              label: tag.name,
              value: tag.id,
            }))}
            notFoundContent={ isLoading && <CircularProgress style={{width:"100px"}}/> }
          />
        </div>

        <div
          className=""
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="productCategory" style={{ width: "48%" }}>
            <label htmlFor="" className="edit_fields_span">
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
        width: '100%',
        height: '40px',
        zIndex: '9999999',
        background: '#006E7F1A',
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

          <div className="productCategory" style={{ width: "48%" }}>
            <label htmlFor="" className="edit_fields_span">
              Tags
            </label>
            <Select
              showSearch
              placeholder="-Select-"
              optionFilterProp="children"
              value={filterTag}
              onChange={(value) => setFilterTag(value)}
              onSearch={onSearch}
              filterOption={filterOption}
              style={{
                width: "100%",
                height: "40px",
                zIndex: "9999999",
                background: "#006E7F1A",
              }}
              options={tags.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </div>
        </div>

        <div
          className=""
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="productCategory" style={{ width: "48%" }}>
            <label htmlFor="" className="edit_fields_span">
              Above Price Range
            </label>
            <input
              value={filterMaxPrice}
              onChange={(e) => setFilterMaxPrice(e.target.value)}
              className="filter_input"
              type="text"
            />
          </div>

          <div
            className="productCategory"
            style={{ width: "48%", flexDirection: "column" }}
          >
            <label htmlFor="" className="edit_fields_span">
              Below Price Range
            </label>
            <input
              value={filterMinPrice}
              onChange={(e) => setFilterMinPrice(e.target.value)}
              className="filter_input"
              type="text"
            />
          </div>
        </div>
         { error && <span style={{color:"red",fontSize:"19px"}}>{error}</span>}
        <div
          className=""
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              width: "49%",
              height: "40px",
              backgroundColor: "black",
              color: "white",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              marginTop: "100px",
            }}
            onClick={handleFilter}
          >
            Filter
          </button>
          <button
            style={{
              width: "49%",
              height: "40px",
              backgroundColor: "black",
              color: "white",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              marginTop: "100px",
            }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminFilter;
