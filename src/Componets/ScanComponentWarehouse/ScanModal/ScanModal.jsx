import React, { useEffect, useRef, useState } from "react";
import "./ScanModal.css";
import { Box, Modal, Typography } from "@mui/material";
import printer from "../../../assets/printer.png";
import close from "../../../assets/close2.png";
import { scan_table_item_products } from "../../../Pages/WareHousePageView/Api";
import ScanTablePrint from "../ScanTablePrint/ScanTablePrint";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // bgcolor: "background.paper",
  fontFamily: "Gilroy medium",
  boxShadow: 24,
};

const ScanModal = ({ setOpenModal, clickedProductId }) => {
  const [clickedProducts, setclickedProducts] = useState([]);

  useEffect(() => {
    handleGetProductList();
  }, []);

  const handleGetProductList = async () => {
    // setIsLoading(true);
    console.log("getting id", clickedProductId);
    try {
      await scan_table_item_products(clickedProductId, setclickedProducts);
    } catch (error) {
      console.error("Error updating slot list item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("slot list products", clickedProducts);
  console.log("iId",clickedProductId)

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const printRef = useRef();

const handlePrint = useReactToPrint({
  content: printRef.current
})


  return (
    <>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="MastersModal">
          <div className="modal_container">
            <button onClick={handleModalClose} className="close_btn">
              <img src={close} alt="" srcset="" />
              <span>CLOSE</span>
            </button>
            <div className="master_modal scan_head">
              <h3>Slot List</h3>
              {/* <button className="scan_list">
                {" "}
                <img src={printer} alt="" srcset="" />
                <span> Print</span>
              </button> */}
                <ReactToPrint
              trigger={() => (
                <div className="scan_list" 
                 onClick={handlePrint}
                 >
                  <LuPrinter /> Print
                </div>
              )}
              content={() => printRef.current}
            />

            </div>
            <div style={{ display: "none" }}>
    <ScanTablePrint
          ref={printRef}
              clickedProducts={clickedProducts}
            />
          </div>
            <div className="scan_table">
              <table>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Created date</th>
                    <th>Product Category</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {clickedProducts.map((product)=>(
                  <tr>
                    <td>{product.slotnumber}</td>
                    <td>{product.created_at}</td>
                    <td>Missing Feild</td>
                    <td>Missing Feild</td>  
                  </tr>
                
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ScanModal;
