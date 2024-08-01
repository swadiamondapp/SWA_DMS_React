import React, { useEffect, useState } from "react";
import "./WorkdoneEditModal.css";
import close from "../../../assets/close.png";
import {
  workDone_table_product_detail,
  workDone_table_product_update,
} from "../../../Pages/WareHousePageView/Api";
import AOS from "aos";
import "aos/dist/aos.css";
import { TagsInput } from "react-tag-input-component";
import {
  diamond_type_dropdown_basicDetails,
  metal_type_dropdown_basicDetails,
} from "../../Assignment Panel/Api";
import { Select } from "antd";
import {
  finding_table_data,
  tag_table_data,
} from "../../MastersSection/ApiMasters/ApiMasters";
import SuccessModal from "../../SuccessModal/SuccessModal";

const WorkdoneEditModal = ({
  setOpenLeftbar,
  clickedProductId,
  setSuccessModalOpen,
  setSuccessMessage,
}) => {
  const [formData, setFormData] = useState({
    length: "",
    width: "",
    height: "",
    type_of_metal: [],
    diamond_type: [],
    approx_diamond_weight: "",
    findings: [],
    approx_metal_weight: "",
    tag: [],
    notes: "",
  });
  const [MetalTypeDropDown, setMetalTypeDropDown] = useState([]);
  const [diamonType, setDiamondType] = useState([]);
  const [findings, setFindings] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const [successModalOpen, setSuccessModalOpen] = useState(false);
  // const [successMessage, setSuccessMessage] = useState("");

  const handleClose = () => {
    setOpenLeftbar(false);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: [value],
    }));
  };

  const handleSelectChange2 = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log("formdata", formData);
  console.log("iiid", clickedProductId);

  const [clickedProducts, setclickedProducts] = useState([]);

  useEffect(() => {
    handleGetProductList();
  }, []);

  const handleGetProductList = async () => {
    console.log("product id", clickedProductId);
    try {
      await workDone_table_product_detail(clickedProductId, setclickedProducts);
    } catch (error) {
      console.error("Error getting products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  const handleProductUpdate = async (pId) => {
    if (
      formData.length ||
      formData.width ||
      formData.height ||
      formData.type_of_metal ||
      formData.diamond_type ||
      formData.approx_diamond_weight ||
      formData.findings ||
      formData.approx_metal_weight ||
      formData.tag ||
      formData.notes === ""
    ) {
      setError("Please Fill all fields");
    }
    setTimeout(()=>{
      setError("")
    },1500)

    console.log("edit id", pId);
    try {
      await workDone_table_product_update(
        pId,
        formData,
        setOpenLeftbar,
        setSuccessModalOpen,
        setSuccessMessage
      );
    } catch (error) {
      console.error("Error updated successfully:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    diamond_type_dropdown_basicDetails(setDiamondType);
    finding_table_data(setFindings);
    tag_table_data(setTags);
  }, []);

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  console.log("findings", tags);

  return (
    <>
      <div
        className="edit_opcity"
        data-aos="fade-left"
        style={{ overflow: "hidden" , position:"fixed",height:"100vh"}}
      ></div>
      <div
        className="leftbar"
        data-aos="fade-left"
        style={{ overflow: "hidden" ,position:"fixed",height:"100vh" }}
      >
        {clickedProducts.map((product) => (
          <>
            <div className="Basic_detail">
              <>
                <div className="master_modal">
                  <h3>Basic Detail</h3>
                  {/* <button onClick={handleClose}>
                <img className="btn_close" src={close} alt="" srcset="" />
              </button> */}
                </div>
                <>
                  <div className="workdone_modal" style={{ marginTop: "15px" }}>
                    <span className="workdone_modal_span1">Product ID</span>
                    <span className="workdone_modal_span2">
                      {product.productID}
                    </span>
                  </div>
                  <div className="workdone_modal">
                    <span className="workdone_modal_span1">Length</span>
                    <span className="workdone_modal_span2">
                      {product?.basic_details?.assignment.length} mm
                    </span>
                  </div>
                  <div className="workdone_modal">
                    <span className="workdone_modal_span1">Width</span>
                    <span className="workdone_modal_span2">
                      {product?.basic_details?.assignment.width} mm
                    </span>
                  </div>
                  <div className="workdone_modal">
                    <span className="workdone_modal_span1">Height</span>
                    <span className="workdone_modal_span2">
                      {product?.basic_details?.assignment.height} mm
                    </span>
                  </div>
                  <div className="workdone_modal">
                    <span className="workdone_modal_span1">Type of metal</span>
                    <span className="workdone_modal_span2">
                      {
                        product?.basic_details?.assignment?.type_of_metal[0]
                          ?.metal_name
                      }{" "}
                    </span>
                  </div>
                  <div className="workdone_modal">
                    <span className="workdone_modal_span1">Dimond Type</span>
                    <span className="workdone_modal_span2">
                      {
                        product?.basic_details?.assignment?.diamond_type[0]
                          ?.name
                      }{" "}
                    </span>
                  </div>
                  <div className="workdone_modal">
                    <span className="workdone_modal_span1">
                      APPROX DIAMOND WEIGHT
                    </span>
                    <span className="workdone_modal_span2">
                      {product?.basic_details?.assignment.approx_diamond_weight}{" "}
                      ct
                    </span>
                  </div>
                  <div className="workdone_modal">
                    <>
                      <span className="workdone_modal_span1">Findings</span>
                      <div className="workdone_modal_sub">
                        {product?.basic_details?.assignment?.findings.map(
                          (item) => (
                            <span className="tag_covering">
                              {item.find_name} ,
                            </span>
                          )
                        )}
                      </div>
                    </>
                  </div>
                  <div className="workdone_modal">
                    <span className="workdone_modal_span1">Approx weight</span>
                    <span className="workdone_modal_span2">
                      {product?.basic_details?.assignment.approx_metal_weight}{" "}
                      ct
                    </span>
                  </div>
                  <div className="workdone_modal">
                    <>
                      <span className="workdone_modal_span1">Tags</span>
                      <div className="workdone_modal_sub">
                        {product?.basic_details?.assignment?.tag.map((item) => (
                          <span className="tag_covering">{item.name}</span>
                        ))}
                      </div>
                    </>
                  </div>
                  <div
                    className="workdone_modal"
                    style={{ borderBottom: "none" }}
                  >
                    <span className="workdone_modal_span1">Note</span>
                    <p className="workdone_modal_span2">
                      {product?.basic_details?.assignment.notes}
                    </p>
                  </div>
                </>
              </>
            </div>

            <div className="Edit_detail">
              <div className="edit_height">
                <div className="master_modal ">
                  <h3>Actual details</h3>
                  <button
                    onClick={handleClose}
                    style={{ backgroundColor: "#F5F5F5" }}
                  >
                    <img className="btn_close" src={close} alt="" srcset="" />
                  </button>
                </div>

                <div className="workdone_modal" style={{ marginTop: "15px" }}>
                  <span>Product ID</span>
                  <input type="text" value={product.productID} readOnly />
                </div>
                <div className="workdone_modal">
                  <span>Length</span>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={formData.length}
                    name="length"
                    required
                  />
                </div>
                <div className="workdone_modal">
                  <span>Width</span>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={formData.width}
                    name="width"
                    required
                  />
                </div>
                <div className="workdone_modal">
                  <span>Height</span>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={formData.height}
                    name="height"
                    required
                  />
                </div>
                <div className="workdone_modal">
                  <span>Type of metal</span>
                  <Select
                    showSearch
                    placeholder="-Select-"
                    optionFilterProp="children"
                    onChange={(value) =>
                      handleSelectChange(value, "type_of_metal")
                    }
                    style={{ width: "50%" }}
                    options={MetalTypeDropDown.map((item) => ({
                      value: item.id,
                      label: item.metal_name,
                    }))}
                    value={formData.type_of_metal}
                  />
                </div>
                <div className="workdone_modal">
                  <span>Diamond Type</span>
                  <Select
                    showSearch
                    placeholder="-Select-"
                    optionFilterProp="children"
                    onChange={(value) =>
                      handleSelectChange(value, "diamond_type")
                    }
                    onSearch={onSearch}
                    filterOption={filterOption}
                    style={{ width: "50%" }}
                    options={diamonType.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    value={formData.diamond_type}
                  />
                  {/* <input
                    type="text"
                    onChange={handleInput}
                    value={formData.diamond_type}
                    name="diamond_type"
                    required
                  /> */}
                </div>
                <div className="workdone_modal">
                  <span>APPROX DIAMOND WEIGHT</span>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={formData.approx_diamond_weight}
                    name="approx_diamond_weight"
                    required
                  />
                </div>
                <div className="workdone_modal">
                  <span>Findings</span>
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="-Select-"
                    optionFilterProp="children"
                    onChange={(value) => handleSelectChange2(value, "findings")}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    style={{ width: "50%" }}
                    options={findings.map((item) => ({
                      value: item.id,
                      label: item.find_name,
                    }))}
                    value={formData.findings}
                  />
                </div>
                <div className="workdone_modal">
                  <span>Approx weight</span>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={formData.approx_metal_weight}
                    name="approx_metal_weight"
                    required
                  />
                </div>
                <div className="workdone_modal">
                  <span>Tags</span>

                  <div className="workdone_modal_sub">
                    <Select
                      mode="multiple"
                      showSearch
                      placeholder="-Select-"
                      optionFilterProp="children"
                      onChange={(value) => handleSelectChange2(value, "tag")}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      style={{ width: "100%", background: "none" }}
                      options={tags.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      value={formData.tag}
                    />
                  </div>
                </div>
                {/* <div className="workdone_modal">
                  <span>Actual Price</span>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={formData.actual_price}
                    name="actual_price"
                    required
                  />
                </div> */}
                <div
                  className="workdone_modal"
                  style={{ borderBottom: "none" }}
                >
                  <span>Note</span>
                  <textarea
                    name="notes"
                    onChange={handleInput}
                    value={formData.notes}
                    required
                  />
                </div>
                <div className="update_btn">
                  {error && (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "red",
                        marginBottom: "12px",
                      }}
                    >
                      {error}
                    </p>
                  )}
                  <button
                    onClick={() =>
                      handleProductUpdate(
                        product?.basic_details?.assignment?.id
                      )
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      {/* <SuccessModal
          successModalOpen={successModalOpen}
          successMessage={successMessage}
        /> */}
    </>
  );
};

export default WorkdoneEditModal;
