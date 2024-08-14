import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import close from "../../assets/close.png";
import "./DesignerFilterModal.css";
import { DatePicker, Select } from "antd";
import { tag_table_data } from "../MastersSection/ApiMasters/ApiMasters";

const { RangePicker } = DatePicker;

const DesignerFilterModal = ({setOpenFilterModal, openFilterModal }) => {
  const [filterTag, setFilterTag] = useState("");

  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    tag_table_data(setTags, setIsLoading);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  const handleFilterClose = () => {
    setOpenFilterModal(false);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  filterTag;
  //   console.log("filter", filter);

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
          padding: "10px",
          gap: "10px",
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
              width: "99%",
              height: "40px",
              zIndex: "9999999",
              background: "#006E7F1A",
            }}
            // options={ProudctCategory.map((tag) => ({
            //   label: tag.name,
            //   value: tag.id,
            // }))}
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
              //   value: tag.id, style={{width:"48%"}}
              // }))}
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
              // onChange={(value) =>

              // }
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

        <div style={{ marginTop: "10px" }}>
          <button
            className="next-button"
            type="submit"
            onClick={() => handleNextClick()}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default DesignerFilterModal;
