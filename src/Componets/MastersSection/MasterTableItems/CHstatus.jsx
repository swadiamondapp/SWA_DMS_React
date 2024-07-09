import React, { useState } from "react";
import dlticon from "../../../assets/Vector.png";
import editicon from "../../../assets/Edit.png";
import searchimg from "../../../assets/search.png";
import MastersModal from "../MastersModal/MastersModal";

const CHstatus = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="masetrs_section">
        <div className="secton_header">
          <h3>Central Hub Status</h3>

          <div className="secton_search">
            <div className="Search_Admin">
              <div className="Search_User">
                <input type="text" placeholder="Search Users" />
                <img src={searchimg} alt="" />
              </div>
            </div>
            <div className="Create_user">
              <button onClick={openModal}>Create CH Status</button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th className="wide-column">Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table_row">
                <td>1</td>
                <td>Approved</td>
                <td>3</td>
                <td>
                  <div className="btn_td">
                    <button className="btn_section">
                      <img
                        className="btn_section_img"
                        src={editicon}
                        alt=""
                        srcset=""
                      />
                    </button>
                    <button className="btn_section2">
                      <img
                        className="btn_section_img"
                        src={dlticon}
                        alt=""
                        srcset=""
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <MastersModal
          modalHeading="Create Central Hub Status"
          btnName="Create"
          openModal={openModal}
          setOpen={setOpen}
          modalPage="CHstatus"
        />
      )}
    </>
  );
};

export default CHstatus;
