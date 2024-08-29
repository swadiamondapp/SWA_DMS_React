import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import close from "../../../assets/close.png";
import "./WokrDoneModal.css";
import { workDone_table_product_detail } from "../../../Pages/WareHousePageView/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  fontFamily: "Gilroy medium",
  boxShadow: 24,
  p: 1.5,
};

const WorkDoneModal = ({ setOpen, clickedProductId }) => {
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

  const handleClose = () => {
    setOpen(false);
  };

  console.log("products", clickedProducts);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="MastersModal wr_padding">
          <>
            <div className="master_modal">
              <h3>Basic Detail</h3>
              <button onClick={handleClose}>
                <img className="btn_close" src={close} alt="" srcset="" />
              </button>
            </div>
            {clickedProducts.map((product) => (
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
                    {product?.basic_details?.assignment.length} 
                  </span>
                </div>
                <div className="workdone_modal">
                  <span className="workdone_modal_span1">Width</span>
                  <span className="workdone_modal_span2">
                    {product?.basic_details?.assignment.width} 
                  </span>
                </div>
                <div className="workdone_modal">
                  <span className="workdone_modal_span1">Height</span>
                  <span className="workdone_modal_span2">
                    {product?.basic_details?.assignment.height} 
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
                    {product?.basic_details?.assignment?.diamond_type[0]?.name}{" "}
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
                          <span
                            style={{
                              background: "lightgray",
                              padding: "3px 5px",
                              borderRadius: "10px",
                            }}
                          >
                            {item.find_name}
                          </span>
                            )
                      )}
                    </div>
                  </>
                </div>
                <div className="workdone_modal">
                  <span className="workdone_modal_span1">Approx weight</span>
                  <span className="workdone_modal_span2">
                    {product?.basic_details?.assignment.approx_metal_weight} ct
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
            ))}
          </>
        </Box>
      </Modal>
    </div>
  );
};

export default WorkDoneModal;
