import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ring from "../../../assets/ring.png";
import ProductCustomisation from "../../ProductCustomisation/ProductCustomisation";
import { stock_order_gallary } from "../Api";

const Gallery = () => {
  const [value, setValue] = React.useState("1");
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [stockOrder,setStockOrder] = useState([])
  const [orderCode,setOrderCode] = useState([])

  useEffect(()=> {
    stock_order_gallary(setStockOrder)
  },[])
  const card = [
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
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleStockOrder = (id) => {
    setIsModalOpen(true)
    setOrderCode(id)

  }
  console.log(stockOrder,"stockOrder")
  return (
    <div className="ParentVotors">
      <div className="gallery__tab">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Stock Order" value="1" style={{textTransform:"capitalize"}}/>
                <Tab label="Customized Order" value="2"  style={{textTransform:"capitalize"}}/>
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
                          <h3 className="galleryId">ID : {item.items[0].paper_design.designcode}</h3>

                          <button onClick={() => handleStockOrder(item.items[0].paper_design.designcode)}>
                            Make order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
      </div>
      <ProductCustomisation
        open={IsModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderCode={orderCode}

      />
    </div>
  );
};

export default Gallery;
