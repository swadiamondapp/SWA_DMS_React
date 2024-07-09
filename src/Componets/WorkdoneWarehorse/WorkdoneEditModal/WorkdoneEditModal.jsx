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

const WorkdoneEditModal = ({ setOpenLeftbar, clickedProductId }) => {
  const [formData, setFormData] = useState({
    length: "",
    width: "",
    height: "",
    type_of_metal: [],
    diamond_type: [],
    approx_diamond_weight: "",
    findings: [],
    approx_metal_weight: "",
    tags: [],
    notes: "",
  });

  const handleClose = () => {
    setOpenLeftbar(false);
  };

  const handleInput = (valueOrEvent) => {
    if (typeof valueOrEvent === "object" && valueOrEvent.target) {
      const { name, value } = valueOrEvent.target;
      if (name === "type_of_metal" || name === "diamond_type") {
        setFormData((prevState) => ({
          ...prevState,
          [name]: [value],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        tags: valueOrEvent,
      }));
    }
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
    console.log("edit id", pId);
    try {
      await workDone_table_product_update(pId, formData, setOpenLeftbar);
    } catch (error) {
      console.error("Error updated successfully:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="edit_opcity"
        data-aos="fade-left"
        style={{ overflow: "hidden" }}
      ></div>
      <div
        className="leftbar"
        data-aos="fade-left"
        style={{ overflow: "hidden" }}
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
                            <span>{item.find_name} ,</span>
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
                  <input
                    type="text"
                    onChange={handleInput}
                    //  onChange={(newTags) => handleInput({ target: { name: 'type_of_metal', value: newTags } })}
                    value={formData.type_of_metal}
                    name="type_of_metal"
                    required
                  />
                </div>
                <div className="workdone_modal">
                  <span>Dimond Type</span>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={formData.diamond_type}
                    name="diamond_type"
                    required
                  />
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
                  <TagsInput
                    name="findings"
                    value={formData.findings}
                    onChange={(newTags) =>
                      handleInput({
                        target: { name: "findings", value: newTags },
                      })
                    }
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
                  <>
                    <div className="workdone_modal_sub">
                      <TagsInput
                        name="tag"
                        value={formData.tags}
                        onChange={(newTags) =>
                          handleInput({
                            target: { name: "tags", value: newTags },
                          })
                        }
                      />
                    </div>
                  </>
                </div>
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
              </div>
              <div className="update_btn">
                <button
                  onClick={() =>
                    handleProductUpdate(product?.basic_details?.assignment?.id)
                  }
                >
                  Update
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default WorkdoneEditModal;
