import React, { useState } from "react";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomiseRequest from "../../CustomiseRequest/CustomiseRequiest";

const VotorsCustomization = () => {
  const [showEditDelete, setShowEditDelete] = useState(null);
  const [IsModalOpen, setIsModalOpen] = useState(false);
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
              </tr>
            </thead>
            <tbody>
              {userlist.map((item, index) => (
                <tr key={index} style={{ color: "#2E364C" }}>
                  <td>{item.date}</td>
                  <td>{item.id}</td>
                  <td>{item.outlet}</td>
                  <td>
                    <div className="view_password">{item.phone}</div>
                  </td>
                  <td>{item.type}</td>
                  {/* <td>
                    <div className="active_sendmail">
                      <button className="sendmail_btn">Send Mail</button>
                    </div>
                  </td> */}

                  <td style={{ position: "relative" }}>
                    <div className="status_votors">
                      {/* <button className="requested_btn">Requested</button> */}
                      <button className="updated_btn">Updated</button>
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
