import React, { useState } from "react";
import dlticon from "../../../assets/Vector.png";
import editicon from "../../../assets/Edit.png";
import searchimg from "../../../assets/search.png";
import { IoHandLeft } from "react-icons/io5";
import MastersModal from "../MastersModal/MastersModal";

const TableItems = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="masetrs_section">
        <div className="secton_header">
          <h3>Findings</h3>

          <div className="secton_search">
            <div className="Search_Admin">
              <div className="Search_User">
                <input type="text" placeholder="Search Users" />
                <img src={searchimg} alt="" />
              </div>
            </div>
            <div className="Create_user">
              <button onClick={openModal}>Create Findings</button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th className="wide-column">Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table_row">
                <td>1</td>
                <td>
                  <span className="bg_cover">John doe</span>
                </td>
                <td>01</td>
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
          modalHeading="Create Findings"
          btnName="Add Finding"
          modalPage="Findings"
          openModal={openModal}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default TableItems;
