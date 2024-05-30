import React, { useEffect ,useState} from "react";
import "./centraldashboard.css";
import ring from "../../../assets/ring.png";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";
import { list_all_designs_from_cad } from "../../../Pages/CENTRAL HUB/Api";

const CentralDashboard = () => {
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const card = [
    {
      product: "ID : SWAD3456",
    },
    {
      product: "ID : SWAD3456",
    },
  ];
  
 
useEffect(()=> {
  list_all_designs_from_cad(setIsLoading, setData)
},[])
console.log(Data,"listaksjdfks====>")
  return (
    <div className="parentCentral">
      <div className="CadAssignmentCard">
        <div className="Card_Design_Parent">
          {Data.map((item) => (
            <div className="New_Design_card">
              <div className="Card_Details">
                <div className="Card_img" style={{ borderBottom: "0px" }}>
                  <img src={item.file1} alt="" />
                </div>
                <div className="Card_Details_Inner_cad_Hub">
                  <p className="Hub_head">ID : {item.designcode}</p>

                  <button className="Download_btn_hub">
                    DOWNLOAD
                    <GoDownload />
                  </button>
                  {/* <button className="Prinit_btn_hub">
                    Print
                    <IoPrintOutline />
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CentralDashboard;
