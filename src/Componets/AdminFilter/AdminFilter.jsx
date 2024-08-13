import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import close from "../../assets/close.png";
import "./AdminFilter.css";
import { DatePicker, Select } from "antd";
import { tag_table_data } from "../MastersSection/ApiMasters/ApiMasters";
import {
  filterAdminDesigns,
  list_all_designers,
  product_category_basicDetails,
} from "../Assignment Panel/Api";
import { list_uploaded_designs } from "../DESIGNER PANEL/Designer Dashboard/Api";
import moment from "moment";

const { RangePicker } = DatePicker;

const AdminFilter = ({ filter, setFilter, setData }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDesigner, setfilterDesigner] = useState("");


  const [tags, setTags] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    product_category_basicDetails(setProductCategory);
    tag_table_data(setTags, setIsLoading);
    list_uploaded_designs(setIsLoading, setDesigners);
    list_all_designers(setDesigners);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);
  const handleFilterClose = () => {
    setFilter(false);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onDateChange = (dates) => {
    if (dates) {
      const formattedStartDate = dates[0].format("YYYY-MM-DD");
      const formattedEndDate = dates[1].format("YYYY-MM-DD");

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
    } else {
      setStartDate(null);
      setEndDate(null);
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
        setData
      );
    } catch (error) {
      console.log(error);
    }
  };



  console.log("startDate", startDate);
  console.log("designers", designers);

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
          <span className="edit_fields_span">Select From Date & End Date</span>
          <RangePicker
            style={{
              width: "70%",
              height: "40px",
            }}
            size={12}
            onChange={onDateChange}
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
              width:"99%",
              height: "40px",
              zIndex: "9999999",
              background: "#006E7F1A",
            }}
            options={productCategory.map((tag) => ({
              label: tag.name,
              value: tag.id,
            }))}
          />
          <div></div>
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
            <Select
              showSearch
              placeholder="-Select-"
              optionFilterProp="children"
              value={filterDesigner}
              onChange={(value) => setfilterDesigner(value)}
              onSearch={onSearch}
              filterOption={filterOption}
              style={{
                width: "100%",
                height: "40px",
                zIndex: "9999999",
                background: "#006E7F1A",
              }}
              options={designers.map((tag) => ({
                label: tag.name,
                value: tag.name,
              }))}
            />
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

        <div className="productCategory" style={{ width: "48%" }}>
          <label htmlFor="" className="edit_fields_span">
            Price Range
          </label>
          <Select
            showSearch
            placeholder="-Select-"
            optionFilterProp="children"
            // value={formData.productCategory}
            // onChange={(value) =>
            //   setFormData((prevState) => ({
            //     ...prevState,
            //     productCategory: [value],
            //   }))
            // }
            // onSearch={onSearch}
            // filterOption={filterOption}
            style={{
              width: "100%",
              height: "40px",
              zIndex: "9999999",
              background: "#006E7F1A",
            }}
            // options={ProudctCategory.map((tag) => ({
            //   label: tag.name,
            //   value: tag.id,
            // }))}
          />
        </div>

        <button
          style={{
            width: "100%",
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
      </div>
    </>
  );
};

export default AdminFilter;
