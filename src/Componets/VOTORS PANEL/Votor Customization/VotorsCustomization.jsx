import React, { useState, useEffect } from "react";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomiseRequest from "../../CustomiseRequest/CustomiseRequiest";
import { voters_customization_list } from "../Api";

const VotorsCustomization = () => {
  const [showEditDelete, setShowEditDelete] = useState(null);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    voters_customization_list(setIsLoading, setData);
  }, []);
  console.log(Data, "voters");
  const userlist = [
    {
      date: "11/2/2023",
      id: "SWACO4535",
      outlet: "Swa diamonds valanchery",
      phone: "+ 91 9995674444",
      type: "Bangles",
    },
    {
      date: "11/2/2023",
      id: "SWACO4535",
      outlet: "Swa diamonds valanchery",
      phone: "+ 91 9995674444",
      type: "Bangles",
    },
    {
      date: "11/2/2023",
      id: "SWACO4535",
      outlet: "Swa diamonds valanchery",
      phone: "+ 91 9995674444",
      type: "Bangles",
    },
    {
      date: "11/2/2023",
      id: "SWACO4535",
      outlet: "Swa diamonds valanchery",
      phone: "+ 91 9995674444",
      type: "Bangles",
    },
    {
      date: "11/2/2023",
      id: "SWACO4535",
      outlet: "Swa diamonds valanchery",
      phone: "+ 91 9995674444",
      type: "Bangles",
    },
  ];
  return (
    <div className="ParentVotors">
      <div className="votors_btns">
        <DesignBtn />
      </div>
      <div className="VotorsCustomizationTable">
        <div className="Users_Table_List">
          <table style={{ width: "100%" }}>
            <thead>
              <tr style={{ color: "#455173" }}>
                <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                  Created Date
                </th>
                <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                  Customization ID
                </th>
                <th style={{ borderRight: "0.5px solid #E7EDF4" }}>Outlet</th>
                <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                  Mobile number
                </th>
                <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                  Product type
                </th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item, index) => (
                <tr key={index} style={{ color: "#2E364C" }}>
                  <td>{item.created_at}</td>
                  <td>{item.customizationcode}</td>
                  <td>{item.outlet}</td>
                  <td>
                    <div className="view_password">{item.mobile_number}</div>
                  </td>
                  <td>{item.product_type}</td>
                  {/* <td>
                    <div className="active_sendmail">
                      <button className="sendmail_btn">Send Mail</button>
                    </div>
                  </td> */}

                  <td style={{ position: "relative" }}>
                    <div className="status_votors">
                      {/* <button className="requested_btn">Requested</button> */}
                      <button className="updated_btn">{item.status}</button>
                      <IoEye
                        style={{
                          color: "#A7BED7",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsModalOpen(true)}
                      />
                      <BsThreeDotsVertical
                        className="Action_dots"
                        onClick={() =>
                          setShowEditDelete(
                            showEditDelete === index ? null : index
                          )
                        }
                      />
                    </div>
                    {showEditDelete === index && (
                      <div className="Edit_delete_btn_user">
                        <p className="Edit_btn_user">Edit</p>
                        <p className="Delete_btn_user">Delete</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomiseRequest
        open={IsModalOpen}
        onClose={() => setIsModalOpen(false)}
        
      />
    </div>
  );
};

export default VotorsCustomization;
