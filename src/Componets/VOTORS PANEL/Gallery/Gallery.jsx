/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
//import ring from "../../../assets/ring.png";
import ProductCustomisation from "../../ProductCustomisation/ProductCustomisation";
import { customized_order_gallary, stock_order_gallary } from "../Api";
import ComingSoon from "../Votors Panel/ComingSoon";

const Gallery = ({sidebarExpanded}) => {
  const [value, setValue] = React.useState("1");
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [stockOrder, setStockOrder] = useState([]);
  const [customizedOrder, setCustomizedOrder] = useState([]);
  const [orderDesignCode, setOrderDesignCode] = useState([]);
  const [orderAssignMentCode, setOrderAssignMentCode] = useState([]);
  const [CustomizedCod, setCustomizedCode] = useState([]);
  const [CustomizedId, setCustomizedId] = useState([]);
const [showModal, setShowModal] = useState(false);

useEffect(() => {
  setShowModal(true); // opens whenever component renders
}, []);
  useEffect(() => {
    stock_order_gallary(setStockOrder);
    customized_order_gallary(setCustomizedOrder);
  }, []);
  {/*const card = [
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
  ];*/}
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleStockOrder = (designCode, assignmentId) => {
    setIsModalOpen(true);
    setOrderDesignCode(designCode);
    setOrderAssignMentCode(assignmentId);
  };
  const handleCustomizedOrder = (cutomizedCode, customizedId) => {
    setIsModalOpen(true);
    setCustomizedCode(cutomizedCode);
    setCustomizedId(customizedId);
  };
  console.log(orderDesignCode, orderAssignMentCode, "clickorder");
  console.log(stockOrder, "stockOrder");
  console.log(customizedOrder, "customizedOrder");
  console.log("currentTab", value);
  console.log(sidebarExpanded,"sidebarExpanded")
  return (
    <div className={`ParentVotors ${showModal ? "page_blurred" : ""}`} style={{paddingLeft:sidebarExpanded? "225px":"130px"}}>
      <div className="gallery__tab">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Stock Order"
                  value="1"
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Customized Order"
                  value="2"
                  style={{ textTransform: "capitalize" }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="first_tab">
                <div className="Card_Design_Parent">
                  {stockOrder.map((item) => (
                    <div className="New_Design_card">
                      <div className="Card_Details">
                        <div
                          className="Card_img"
                          style={{ borderBottom: "0px" }}
                        >
                          <img src={item.items[0].paper_design.image} alt="" />
                        </div>
                        <div className="Card_Details_Inner_gallery">
                          <h3 className="galleryId">
                            ID : {item.items[0].paper_design.designcode}
                          </h3>

                          <button
                            onClick={() =>
                              handleStockOrder(
                                item.items[0].paper_design.designcode,
                                item.items[0].item_id
                              )
                            }
                          >
                            Make order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="second_tab">
                <div className="Card_Design_Parent">
                  {customizedOrder.map((item) => (
                    <div className="New_Design_card">
                      <div className="Card_Details">
                        <div
                          className="Card_img"
                          style={{ borderBottom: "0px" }}
                        >
                          <img src={item.image} alt="" />
                        </div>
                        <div className="Card_Details_Inner_gallery">
                          <h3 className="galleryId">
                            ID : {item.customizationcode}
                          </h3>

                          <button
                            onClick={() =>
                              handleCustomizedOrder(
                                item.customizationcode,
                                item.id
                              )
                            }
                          >
                            Make order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
      <ProductCustomisation
        open={IsModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderDesignCode={orderDesignCode}
        orderAssignMentCode={orderAssignMentCode}
        value={value}
        CustomizedId={CustomizedId}
        CustomizedCod={CustomizedCod}
      />
        <ComingSoon
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Photo Coming Soon 📸"
        description="High-quality product photos will be available shortly."
      />
      
    </div>
  );
};

export default Gallery;
